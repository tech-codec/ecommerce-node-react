const express = require("express")
const bodyParser = require('body-parser');


const {createCheckoutSession, webHook} = require("../controllers/stripe.controller")


const router = express.Router()


router.post("/create-checkout-session", createCheckoutSession)
router.post("/webhook", webHook)

module.exports = router