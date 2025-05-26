import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../../schema/user.js"

export const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cherche l'utilisateur par email ou username
    const user = await User.findOne({ username, email });
    if (!user) return res.status(401).json({ message: "Email ou mot de passe invalide" });

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe invalide" });

    // Génère un token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        theme: user.theme,
        image: user.image,
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const signUp =  (req, res) => {
  const users =  User.find();
  res.json(users);
}

export const signOut = (req, res) => {
  const users = User.find();
  res.json(users);
}

export const getUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

export const updateUser = async (req, res) => {
  const users = await User.findOneAndUpdate();
  res.json(users);
}

export const deleteUser = async (req, res) => {
  const users = await User.deleteOne();
  res.json(users);
}