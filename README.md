# E-commerce Application `shop-store`

Bienvenue dans le dépôt de l'application e-commerce `shop-store`. Ce projet est une application complète de commerce électronique construite avec Node.js pour le backend et React.js pour le frontend. Le dépôt est organisé en trois parties principales :
- Backend : Gère les API et la logique côté serveur.
- Frontend : L'interface utilisateur pour les clients.
- Admin : Le panneau d'administration pour gérer les produits, les commandes, analysise des visites etc.

## Fonctionalités de l'application

- Système de gestion des (utilisateurs, produits, catégories, rôles, visites, commandes, notifications)
- Système d'authentification complet (envoie de mail sur Gmail, récupération de mot de passe, etc.)
- Système de payement avec stripe et utilisation des webhook pour la validation des évènements d'achat sur le site
- Utilisation des websockets pour la notification d'un achat en ligne en temps réel
- `Dashboad` Pour l'analyse sur les (commandes, gains, produits, visites du site, clients, etc.)
- Système de gestion de panier

## Structure du dépôt

- `backend` : Contient le code serveur Node.js.
- `frontend` : Contient le code client React.js.
- `admin` : Contient le panneau d'administration React.js.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)
- MongoDB (si vous utilisez une base de données locale)

## Installation

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/tech-codec/ecommerce-node-react.git
cd ecommerce-node-react
```

### Démo
- **Démo en ligne du frontend (pour la partie client)** : [lien du site en ligne](https://shop-store-one.vercel.app/)
    - exemple de compte (email: userpablo@9gmail.com, password: 1234567)
    - ou vous pouvez créer simplement votre compte en vous s'inscrivant avec un mail valide
- **Démo de la video en ligne de cette partie sur ma chaine youtube**: [lien de la vidéo en ligne]()

- **Démo en ligne de l'administration** : [lien du site en ligne](https://admin-shop-store.vercel.app/)
    - exemple de compte (email:useralain99@gmail.com , password: 1234567)
    - ou vous pouvez créer simplement votre compte en vous s'inscrivant avec un mail valide
- **Démo de la video en ligne de cette partie sur ma chaine youtube**: [lien de la vidéo en ligne]()

### Backend

Consultez le [README du backend](backend/README.md) pour les instructions d'installation et de configuration du serveur.

### Frontend

Consultez le [README du frontend](frontend/README.md) pour les instructions d'installation et de configuration de l'interface utilisateur avec une démo et une vidéo.

### Admin

Consultez le [README du panneau d'administration](admin/README.md) pour les instructions d'installation et de configuration du panneau d'administration avec une démo et une vidéo.
