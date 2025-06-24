# Budgee

Application web de gestion de budget personnel avec utilisateurs, comptes, transactions, catégories, statistiques, et traductions.

## Fonctionnalités principales

-  Authentification sécurisée (JWT, bcrypt)
- Gestion des utilisateurs (CRUD + reset mot de passe)
- Gestion des comptes bancaires (type, budget de départ)
- Gestion des transactions (ajout, édition, suppression)
- Gestion des catégories (globales par défaut + personnalisées)
- Duplication automatique des catégories par défaut à l'inscription
- Architecture RESTful claire (user, account, category, transaction)

---

## Stack technique

### Backend

- **Node.js + Express**
- **MongoDB + Mongoose**
- **jsonwebtoken** (authentification)
- **bcrypt** (hash mot de passe)
- **CORS**

---

## Installation

### Prérequis

- [Node.js ≥ 18](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Cloner le projet

```bash
git clone https://github.com/zkerkeb-class/projet-final-back-anto95240.git
```

Backend
```bash
npm install
```
Créer un fichier .env :

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/project-db
JWT_SECRET=ton_secret_jwt
```

Démarrer le backend :
```bash
npm run dev
```

# Licence
Projet personnel open-source. Utilisation libre pour apprentissage et développement personnel.

# Auteur
Développé avec par Antoine RICHARD
