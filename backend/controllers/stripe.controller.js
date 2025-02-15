require("dotenv").config();
const Stripe = require('stripe');
const { COUNTRIES } = require("../utils/helper");
const Order = require("../models/Order");
const Notification = require('../models/Notification');
const Product = require("../models/Product");
const { promises } = require("nodemailer/lib/xoauth2");
const User = require("../models/User");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Utiliser votre clé secrète Stripe
const endpointSecret = process.env.END_POINT_SECRET;

exports.createCheckoutSession = async (req, res) => {

    try {
        //creation de l'utilisateur actuellement connecté qui passe la commande
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.userId,
                // Stocker uniquement les IDs des articles et la quantité dans les métadonnées
                cart: JSON.stringify(req.body.cartItems.map(item => ({
                    id: item._id,
                    quantity: item.quantity
                }))),
                totalItems: req.body.totalItems
            }
        })

        // Préparer les items de la commande
        const line_items = req.body.cartItems.map((item) => {
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.name,
                        images: [process.env.API_URL + item.images[0].split('/shared')[1]],
                        description: item.description,
                        metadata: {
                            id: item._id,
                        },
                    },
                    unit_amount: item.new_price * 100, // Convertir en cents
                },
                quantity: item.quantity,
            };
        });

        // Créer une session de paiement
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: COUNTRIES,
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "eur",
                        },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "eur",
                        },
                        display_name: "Next day air",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: "payment",
            customer: customer.id,
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });

        // Retourner l'URL de la session de paiement
        res.send({ url: session.url });
    } catch (error) {
        res.status(500).send({ error: error.message });
        console.log(error)
    }
}


const createOrder = async (customer, data, req, res) => {
    try {
        const items = JSON.parse(customer.metadata.cart);

        // Préparation des produits pour la commande
        const products = items.map((item) => ({
            product: item.id,
            quantity: item.quantity,
        }));

        // Mise à jour des stocks des produits
        await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.id); // Utilisez `findById` pour récupérer un produit spécifique
                if (product) {
                    product.stock -= item.quantity;
                    await product.save();
                }
            })
        );


        // Création de la commande
        const order = await Order.create({
            user: customer.metadata.userId,
            products,
            totalProduct: customer.metadata.totalItems,
            subtotalPrice: data.amount_subtotal,
            totalPrice: data.amount_total,
            shipping: data.customer_details,
            customerId: data.customer,
            total_details: data.total_details,
            payment_status: data.payment_status,
        });

        // Mise à jour de liste des commandes de l'utilisateur
        const user = await User.findById(customer.metadata.userId)
        user.orders.push(order._id)
        await user.save()

        // Création de la notification
        const notification = await Notification.create({
            user: customer.metadata.userId,
            order: order._id,
            totalProduct: customer.metadata.totalItems,
            subtotalPrice: data.amount_subtotal,
            totalPrice: data.amount_total,
        });

        // Emission de l'événement via WebSocket
        req.app.get('io').emit('newOrder', notification);

        res.status(200).json({ received: true });
        console.log("Notification saved:", notification);
        console.log("Order saved:", order);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};



exports.webHook = async (req, res) => {

    let event;
    let data;
    const payload = req.body;
    let signature = req.headers["stripe-signature"];


    if (endpointSecret) {
        try {
            event = await stripe.webhooks.constructEvent(payload, signature, endpointSecret);
            data = event.data.object
            console.log(`Webhook Verified: `, event);
        } catch (err) {
            console.log(`Webhook Error: ${(err).message}`);
            res.status(400).send(`Webhook Error: ${(err).message}`);
            return;
        }
    }

    //Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            try {
                const customer = await stripe.customers.retrieve(data.customer);
                await createOrder(customer, data, req, res);
                console.log(`the customer is: `, customer);
                console.log(`data event is: `, data);
            } catch (err) {
                console.log(`checkout.session.completed err: `, err);
            }
            break;
        default:
            //Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }

    //Return a 200 response to acknowledge receipt of the event
    res.status(200).end();
}