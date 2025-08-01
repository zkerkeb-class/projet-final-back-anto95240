import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

import User from "../schema/user.js"
import Account from '../schema/account.js';
import Transaction from '../schema/transaction.js';
import Category from '../schema/category.js';

// Login
export const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    
    const user = await User.findOne({
      $or: [
        { email: login }, 
        { username: login }
      ]
    });
    if (!user) return res.status(401).json({ message: "Email ou mot de passe invalide" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe invalide" });

    const sessionToken = jwt.sign(
      {
        uid: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    res.status(200).json({
      token: sessionToken ,
      user: {
        uid: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        image: user.image,
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Register
export const signUp = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    passwordConfirm,
    budgetStart,
    accountName
  } = req.body;
    console.log("Reçu côté backend :", req.body);

  try {

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Les mots de passes ne correspondent pas." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    if (!budgetStart || !accountName ) {
      return res.status(400).json({ message: "Les champs 'accountName ' et 'budgetStart' sont requis." });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      passwordHash,
    });

    await newUser.save();

    const newAccount = new Account({
      userId: newUser._id,
      name: accountName,
      type: "Courant",
      balance: budgetStart,  // le solde initial = budget de départ
      budgetStart,
    });

    await newAccount.save();

    // Dupliquer les catégories par défaut
    const defaultCategories = await Category.find({ isDefault: true });
    const personalizedCategories = defaultCategories.map(cat => ({
      name: cat.name,
      theme: cat.theme,
      color: cat.color,
      userId: newUser._id,
      isDefault: false
    }));
    await Category.insertMany(personalizedCategories);

    const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: {
        uid: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
      },
      account: {
        uid: newAccount._id,
        name: newAccount.name,
        type: newAccount.type,
        balance: newAccount.balance,
        budgetStart: newAccount.budgetStart
      }
    });

  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupère les informations du user connecter
export const getMe = async (req, res) => {
  const userId = req.userId;   

  try {
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur dans getMe :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupère tous les user
export const getUser = async (req, res) => {
  try {
    const user = await User.find().select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// mets a jour le user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { password, passwordConfirm, ...updateData } = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Gestion du mot de passe
    if (password || passwordConfirm) {
      if (password !== passwordConfirm) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Le mot de passe et sa confirmation ne correspondent pas." });
      }
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    // Gestion de l'image avatar
    if (req.file) {
      if (existingUser.image && existingUser.image.startsWith('uploads/')) {
        const oldPath = path.join(process.cwd(), existingUser.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.image = `uploads/${req.file.filename}`;
    }

    delete updateData._id;
    delete updateData.__v;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-passwordHash');

    res.status(200).json(updatedUser);

  } catch (error) {
    console.error(error);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// supprime le user ainsi que tous ce qui appartient au user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {

    await Account.deleteMany({ userId });

    await Transaction.deleteMany({ userId });

    await Category.deleteMany({ userId });

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};