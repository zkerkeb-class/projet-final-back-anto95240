import fs from 'fs';
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import transactionRoutes from './routes/transactionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const uploadDir = 'uploads';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//     REQUETE API POUR LES TRANSACTIONS  
app.use('/api/transaction', transactionRoutes);


//     REQUETE API EN LIEN AVEC L'UTILISATEUR
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoutes);

//     REQUETE API POUR LES CATEGORY
app.use('/api/account', accountRoutes);

//     REQUETE API POUR LES COMPTES
app.use('/api/category', categoryRoutes);


app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion budgétaire");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
