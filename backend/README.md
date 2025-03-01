# Backend - E-commerce Application

Ce dossier contient le code serveur de l'application e-commerce `shop-store`. Le backend est construit avec Node.js et Express.js et utilise MongoDB pour la base de données.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)
- MongoDB (si vous utilisez une base de données locale)

## Installation

1. Installez les dépendances avec ces commandes :

```bash
cd backend
npm install
```

2. Créez un fichier `.env` à la racine du dossier backend et ajoutez les variables d'environnement suivantes :

```env
PORT = 3000
API_URL = https://ici_le_nom_de_domaine_générer_avec_ngrock/api
DB_USER_PASS = your_mogodb_user_name_and_password exemple: <your_user_name>:your_password
JWT_SECRET = your_jwt_secret
MONGODB_URI = your_mongodb_connection_string
EMAIL_USER= your_email_for_receve_the_mail_on_gmail
NAME_USER = your_name_user_gmail
EMAIL_PASS= your_password_gmail
STRIPE_SECRET_KEY = your_stripe_secret_key
END_POINT_SECRET = your_webhook_end_point_secret
CLIENT_URL= http://localhost:your_port_client_react_app
ADMIN_URL=http://localhost:your_port_admin_react_app
CLIENT_ID = your_client_id_google_cloud
CLIENT_SECRET = your_client_secret_google_cloud
REDIRECT_URL = https://developers.google.com/oauthplayground
REFRESH_TOKEN = your_refresh_token_google_service_mail
```

## Démarrage

Pour démarrer le serveur en mode développement vous pouvez utiliser l'une des commande suivantes :

```bash
npm start 
npm run dev_start
```

Le serveur sera accessible sur `http://localhost:3000`.


## Structure du projet

- `controllers` : Contient les contrôleurs pour les différentes routes.
- `models` : Contient les modèles de base de données.
- `routes` : Contient les définitions de routes.
- `middlewares` : Contient les middlewares.
- `config` : Contient les fichiers de configuration.
- `share` : le dossier de partager
- `utils` : les différents utilités de l'api
- `views` : le dossier des templates pour l'envoir de mail sur gmail

