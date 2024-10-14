import chemise_droite from "./images/chemise-droit.webp";
import chemise_semi_slim from "./images/semi-slim.jpg";
import chemise_slim_fit from "./images/slim-fit.jpeg";
import tricot_simple from "./images/tricot-simple.jpg";
import tricot_double from "./images/trico-double.webp";
import tricot_cotele from "./images/Tricot-côtelé.jpg";
import pantalon_cargo from "./images/pantalon-cargo.webp";
import pantalon_chino from "./images/pantalon-chino.jpg";
import pantalon_jean from "./images/pantalon-jean.jpeg";
import pantalon_court from "./images/pantalon-court.webp";
import chaussure_basket from "./images/chaussure-basket.jpg";
import chaussure_basket_lumineuse  from "./images/chaussure-basket-lumineuse.jpg";
import chaussure_compense from "./images/chaussure-compense.jpg";
import chaussure_compense_de_luxe from "./images/chaussure-compense-de-luxe.jpg";
import television_LG_28TQ515S from "./images/télévision-LG 28TQ515S-PZ.jpg";
import television_Hisense_43A6K from "./images/télévision-Hisense 43A6K.jpg";
import television_LG_32LQ631C   from "./images/télévision-LG 32LQ631C.webp";
import television_LG_28TQ525S_PZ from "./images/télévision-LG 28TQ525S-PZ.jpg";
import television_TCL_55C743 from "./images/télévision-TCL 55C743.jpg";
import ordinateur_de_bureau_pc_fixe from "./images/Ordinateur de bureau pc-fixe.jpg";
import ordinateur_de_bureau_simple from "./images/ordinateur de bureau simple.jpg";
import ordinateur_portable_HP_255_G8 from "./images/Ordinateur portable.jpg";
import mini_pc_Mac_Mini from "./images/mini-pc-57 Mac Mini Pc Stock Photos, High-Res Pictures.jpg";
import mini_pc_mac_58 from "./images/mini-pc-58.jpg"
import netbook_2023 from "./images/Netbook-2023.jpg";
import apple_iphone_x from "./images/téléphone-apple-iphone-x.webp";
import apple_iphone_SE from "./images/téléphone-appla-iphone SE.webp";
import apple_iphone_13_pro from "./images/iphone-13-pro.jpeg";
import apple_iphone_15_pro from "./images/iphone-15-pro.jpeg";
import apple_iphone_14_pro_max from "./images/iphone-14-pro-max.jpg";
import apple_iphone_15_pro_max from "./images/iphone-15-pro-max.jpeg";

let all_product = [
    {
        id:1,
        name:"Chemise coupe regular ou droite",
        category:"Vêtement",
        image:chemise_droite,
        new_price:500,
        old_price:6500,
        description:"Parmi les coupes de chemises classiques figurent l’indispensable chemise regular. Sa coupe basique et intemporelle séduit tous les hommes. Les flancs de la chemise regular tombent droits et sont parallèles.",
        stock:20
    },
    {
        id:2,
        name:"Chemise coupe ajustée ou semi-slim",
        category:"Vêtement",
        image:chemise_semi_slim,
        new_price:4500,
        old_price:6000,
        description:"La chemise coupe ajustée, comme son nom l’indique, suit les courbes de la silhouette. Elle est légèrement plus resserrée au niveau du buste, sans toutefois le compresser. C’est le bon compromis entre une chemise droite et une chemise cintrée.",
        stock:30
    },
    {
        id:3,
        name:"Chemise coupe cintrée ou slim fit",
        category:"Vêtement",
        image:chemise_slim_fit,
        new_price:5500,
        old_price:6500,
        description:"La chemise coupe cintrée est très près du corps, resserrée au niveau de la taille ainsi que dans la ligne du dos.",
        stock:25
    },
    {
        id:4,
        name:"Tricot simple",
        category:"Vêtement",
        image:tricot_simple,
        new_price:15500,
        old_price:17500,
        description:"Ce tricot utilise un fil unique, contient des mailles simples et une seule couche de tissu. C’est le tricot le plus simple et le moins cher à produire.",
        stock:15
    },
    {
        id:5,
        name:"Tricot double",
        category:"Vêtement",
        image:tricot_double,
        new_price:16500,
        old_price:18500,
        description:"Ce tricot utilise deux fils et a des mailles doubles. Un des deux fils parcourt tout le tissu dans la longueur. Ce tricot est plus structuré et résistant que le simple tricot.",
        stock:10
    },
    {
        id:6,
        name:"Tricot côtelé",
        category:"Vêtement",
        image:tricot_cotele,
        new_price:16500,
        old_price:18500,
        description:"Ce tricot utilise deux fils et a des mailles doubles. Un des deux fils parcourt tout le tissu dans la longueur. Ce tricot est plus structuré et résistant que le simple tricot.",
        stock:10
    },
    {
        id:7,
        name:"Pantalon cargo",
        category:"Vêtement",
        image:pantalon_cargo,
        new_price:15500,
        old_price:17500,
        description:"Un pantalon cargo est un type de pantalon de travail, généralement fabriqué en coton ou en mélange de coton, qui possède plusieurs poches sur les jambes, appelées 'poches cargo'.",
        stock:16
    },
    {
        id:8,
        name:"Pantalon chino",
        category:"Vêtement",
        image:pantalon_chino,
        new_price:14500,
        old_price:16500,
        description:"Les pantalons chino sont un type de pantalon fabriqué à partir de tissu chino. Ils sont particulièrement légers, respirants et durables et ont donc trouvé leur place dans de nombreuses professions en tant que vêtements de travail.",
        stock:19
    },
    {
        id:9,
        name:"Pantalon jean",
        category:"Vêtement",
        image:pantalon_jean,
        new_price:15500,
        old_price:18000,
        description:"Les jeans ne doivent pas non plus être absents des vêtements professionnels et de travail. Les jeans sont fabriqués dans un tissu denim robuste et durable. Ils sont particulièrement confortables et polyvalents et ont donc trouvé leur place dans de nombreuses professions en tant que vêtements de travail. ",
        stock:17
    },
    {
        id:10,
        name:"Pantalon court",
        category:"Vêtement",
        image:pantalon_court,
        new_price:11300,
        old_price:13000,
        description:"Un pantalon de travail court, également connu sous le nom de short ou de short de travail, est plus court qu'un pantalon de travail long et s'arrête généralement au-dessus du genou.",
        stock:13
    },
    {
        id:11,
        name:"Chaussure basket",
        category:"Vêtement",
        image:chaussure_basket,
        new_price:18300,
        old_price:21000,
        description:"chaussure de sport couvrant les chevilles. Elle est caractérisée par une semelle plate ou compensée. Elle est à l’origine destinée à la pratique de ce sport. L'appellation a ensuite été généralisée à tout type de chaussures de sport.",
        stock:23
    },
    {
        id:12,
        name:"Chaussure basket lumineuse",
        category:"Vêtement",
        image:chaussure_basket_lumineuse,
        new_price:19000,
        old_price:22000,
        description:"chaussure de sport couvrant les chevilles. Elle est caractérisée par une semelle plate ou compensée. Elle est à l’origine destinée à la pratique de ce sport. L'appellation a ensuite été généralisée à tout type de chaussures de sport.",
        stock:29
    },
    {
        id:13,
        name:"Chaussure compensé",
        category:"Vêtement",
        image:chaussure_compense,
        new_price:11000,
        old_price:14000,
        description:"chaussure dont le talon rejoint la semelle. Cela a pour effet de former un plein sous la cambrure. Il existe des versions fantaisie évidées ou perforées.",
        stock:27
    },
    {
        id:14,
        name:"Chaussure compensé de luxe",
        category:"Vêtement",
        image:chaussure_compense_de_luxe,
        new_price:12000,
        old_price:14000,
        description:"chaussure dont le talon rejoint la semelle. Cela a pour effet de former un plein sous la cambrure. Il existe des versions fantaisie évidées ou perforées.",
        stock:26
    },
    {
        id:15,
        name:"Télévision LG 28TQ515S",
        category:"Télévision",
        image:television_LG_28TQ515S,
        new_price:100000,
        old_price:140000,
        description:"A la fois TV LED et moniteur PC, la LG 28TQ515S-PZ s'adapte aux besoins de chacun en combinant le meilleur des deux technologies. En proposant des images nettes et des angles de vision larges, vous pouvez profiter du meilleur du cinéma et du divertissement.",
        stock:14
    },
    {
        id:16,
        name:"Télévision Hisense 43A6K",
        category:"Télévision",
        image:television_Hisense_43A6K,
        new_price:110000,
        old_price:145000,
        description:"Profitez d'un spectacle saisissant avec une qualité d'image supérieure en installant le téléviseur 4K UHD Hisense 43A6K dans votre salon. Cette Smart TV propose une expérience visuelle des plus agréables avec sa technologie Direct Full Array qui diffuse la lumière uniformément sur l'écran.",
        stock:14
    },
    {
        id:17,
        name:"Télévision LG 32LQ631C",
        category:"Télévision",
        image:television_LG_32LQ631C,
        new_price:111000,
        old_price:145000,
        description:"mage de qualité, simplicité d'utilisation et fonctionnalités connectées, le téléviseur LG 32LQ631C se montre à la hauteur de vos besoins et envies au quotidien. Vous retrouverez de nombreux connecteurs (HDMI, USB, Ethernet), un système audio stéréo 10 Watts ou bien encore webOS embarqué.",
        stock:18
    },
    {
        id:18,
        name:"Télévision LG 28TQ525S PZ",
        category:"Télévision",
        image:television_LG_28TQ525S_PZ,
        new_price:118000,
        old_price:149000,
        description:" A la fois TV LED et moniteur PC, la LG 28TQ525S-PZ s'adapte aux besoins de chacun en combinant le meilleur des deux technologies. En proposant des images nettes et des angles de vision larges, vous pouvez profiter du meilleur du cinéma et du divertissement.",
        stock:10
    },
    {
        id:19,
        name:"Télévision TCL 55C743",
        category:"Télévision",
        image:television_TCL_55C743,
        new_price:140000,
        old_price:165000,
        description:" Parfait pour le divertissement et idéal pour le gaming, la TV 55C743 signée TCL possède toutes les qualités pour accompagner toutes vos envies. Profitez d'une fluidité exceptionnelle de 144 Hz, d'une résolution 4K avec prise en charge HDR étendue et d'une connectique complète.",
        stock:14
    },
    {
        id:20,
        name:"Ordinateur de bureau PC fixe",
        category:"Ordinateur",
        image:ordinateur_de_bureau_pc_fixe,
        new_price:100000,
        old_price:115000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:67
    },
    {
        id:21,
        name:"Ordinateur de bureau simple",
        category:"Ordinateur",
        image:ordinateur_de_bureau_simple,
        new_price:110000,
        old_price:135000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:17
    },

    {
        id:22,
        name:"Ordinateur portable HP 255 G8",
        category:"Ordinateur",
        image:ordinateur_portable_HP_255_G8,
        new_price:110000,
        old_price:135000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:17
    },

    {
        id:23,
        name:"Ordinateur portable HP Pavilion 15-eg3013nf",
        category:"Ordinateur",
        image:ordinateur_portable_HP_255_G8,
        new_price:110000,
        old_price:135000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:17
    },

    {
        id:24,
        name:"Mini PC Mac Mini",
        category:"Ordinateur",
        image:mini_pc_Mac_Mini,
        new_price:111000,
        old_price:125000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:17
    },

    {
        id:25,
        name:"Mini PC Mac 58",
        category:"Ordinateur",
        image:mini_pc_mac_58,
        new_price:114000,
        old_price:145000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:12
    },

    {
        id:26,
        name:"Netbook 2023",
        category:"Ordinateur",
        image:netbook_2023,
        new_price:114000,
        old_price:145000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:12
    },

    {
        id:27,
        name:"Apple iphone X",
        category:"Téléphone",
        image:apple_iphone_x,
        new_price:112000,
        old_price:135000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:14
    },

    {
        id:28,
        name:"Apple iphone SE",
        category:"Téléphone",
        image:apple_iphone_SE,
        new_price:137000,
        old_price:185000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:18
    },
    {
        id:29,
        name:"Apple iphone 13 pro",
        category:"Téléphone",
        image:apple_iphone_13_pro,
        new_price:147000,
        old_price:195000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:18
    },

    {
        id:30,
        name:"Apple iphone 15 pro",
        category:"Téléphone",
        image:apple_iphone_15_pro,
        new_price:167000,
        old_price:199000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:18
    },

    {
        id:31,
        name:"Apple iphone 14 pro max",
        category:"Téléphone",
        image:apple_iphone_14_pro_max,
        new_price:187000,
        old_price:200000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:18
    },

    {
        id:32,
        name:"Apple iphone 15 pro max",
        category:"Téléphone",
        image:apple_iphone_15_pro_max,
        new_price:200000,
        old_price:230000,
        description:" Ecran 27 FHD (1920x1080) IPS 250nits Anti-reflets Intel® Core™ i7-13620H, 10 Cœurs (jusqu'à 4.9 Ghz) - Puce Intel UHD Graphics Mémoire vive 16Go DDR4-3200 - Stockage 512Go SSD M.2 Windows 11 - Wi-Fi® 6, 11ax - Bluetooth 5.1",
        stock:18
    },


    
]


export default all_product