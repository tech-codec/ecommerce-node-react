
import ordinateur from "./images/banniere-vente-ordinateur.avif";
import telephone from "./images/banniere-vente-telephone.avif";
import vetement from "./images/bannier-vente-vetement-2.avif";
import television from "./images/banniere-vente-television.webp"
const all_categories = [
    {
        id:1,
        name:"Ordinateur",
        image:ordinateur,
        listMotCle:[
            "Ordinateur de bureau",
            "Ordinateur portable",
            "Mini PC",
            "Netbook",
        ]
    },
    {
        id:2,
        name:"Téléphone",
        image:telephone,
        listMotCle:[
            "Apple iphone SE",
            "Apple iphone 13",
            "Apple iphone 15",
            "Apple iphone 14",
        ]
    },
    {
        id:3,
        name:"Vêtement",
        image:vetement,
        listMotCle:[
            "Tricot",
            "Chemise",
            "Pantalon",
            "Chaussure",
        ]
    },
    {
        id:4,
        name:"Télévision",
        image:television,
        listMotCle:[
            "Télévision LG",
            "Télévision Hisense",
            "Télévision TCL 55C743",
        ]
    },
      
]


export default all_categories