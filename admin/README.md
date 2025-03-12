# Admin - E-commerce Application `shop-store`

Ce dossier contient le code du panneau d'administration de l'application e-commerce `shop-store`. L'interface admin est construite avec React.js et utilise Redux pour la gestion de l'état.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)

## Installation

1. Installez les dépendances :

```bash
cd admin
npm install --legacy-peer-deps
```

2. Créez un fichier `.env` à la racine du dossier admin et ajoutez les variables d'environnement suivantes :

```env
VITE_API_URL = http://localhost:3000/api
VITE_API_SOCKET_URL = http://localhost:3000
```

## Démarrage

Pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:your_port`.

## Structure du projet

- `components` : Contient les composants React réutilisables.
- `pages` : Contient les différentes pages de l'application.
- `reducers` : Contient les fichiers relatifs à Redux qui sont des reducers.
- `actions` : Contient les fichiers relatifs à Redux qui sont des actions.
- `store` : Contient les fichiers relatifs à Redux qui est le store.
- `utils` : Contient les fonctions utilitaires.
- `context` : contient les différents context de l'application

## Démo

- **Démo en ligne** : [lien du site en ligne](https://admin-shop-store.vercel.app/)
    - exemple de compte (email:useralain99@gmail.com , password: 1234567)
    - ou vous pouvez créer simplement votre compte en vous s'inscrivant avec un mail valide
- **Démo de la video en ligne sur ma chaine youtube**: [lien de la vidéo en ligne](https://www.youtube.com/watch?v=-skrT-X8nPs)


## aperçu

### dashboad sur ordinateur

![dashboad sur ordinateur](./demo_image_admin/ordi_image/ordi_dashboad.png)

### dashboad sur téléphone

![dashboad sur téléphone](./demo_image_admin/phone_image/phone_dashboad.png)

### analyse activités clients

![analyse activités clients](./demo_image_admin/ordi_image/analyse_activ_client.png)

### analyse des ventes

![analyse des ventes](./demo_image_admin/ordi_image/analyse_ventes.png)

### analyse du trafic

![analyse du trafic](./demo_image_admin/ordi_image/analyse_trafic.png)

### analyse product

![analyse product](./demo_image_admin/ordi_image/analyse_product.png)

### l'édition d'un produit sur ordinateur

![l'édition d'un produit sur ordinateur](./demo_image_admin/ordi_image/ordi_add_product.png)

### l'édition d'un produit sur téléphone

![l'édition d'un produit sur téléphone](./demo_image_admin/phone_image/phone_add_product.png)

### l'édition d'un utilisateur sur ordinateur

![l'édition d'un utilisateur sur ordinateur](./demo_image_admin/ordi_image/ordi_edit_user.png)

### l'édition d'un utilisateur sur ordinateur

![l'édition d'un utilisateur sur ordinateur](./demo_image_admin/phone_image/phone_edite_user.png)

### l'édition d'une catégorie sur ordinateur

![l'édition d'une catégorie sur ordinateur](./demo_image_admin/ordi_image/ordi_edit_cat.png)

### l'édition d'une catégorie sur téléphone

![l'édition d'une catégorie sur téléphone](./demo_image_admin/phone_image/phone_edit_cat.png)


### paramètre compte user sur ordinateur

![paramètre compte user sur ordinateur](./demo_image_admin/ordi_image/ordi_parameter.png)

### paramètre compte user sur téléphone

![paramètre compte user sur téléphone](./demo_image_admin/phone_image/phone_parameter.png)

### affichage commade sur ordinateur

![affichage commade sur ordinateur](./demo_image_admin/ordi_image/ordi_commande.png)

### affichage commade sur téléphone

![affichage commade sur téléphone](./demo_image_admin/phone_image/phone_commande.png)

### affichage des détailles d'une commade 

![affichage des détailles d'une commade](./demo_image_admin/ordi_image/ordi_detail_commande.png)