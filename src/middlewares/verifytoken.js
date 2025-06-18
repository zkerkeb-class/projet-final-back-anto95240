import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token:", decoded);

    req.userId = decoded.uid; // 🔥 on ajoute l’ID dans la requête
    
    if (!req.userId) {
      return res.status(401).json({ message: "Utilisateur non identifié dans le token" });
    }

    next();
  } catch (error) {
    console.error('Erreur de vérification du token :', error);
    return res.status(401).json({ message: 'Unauthorized: token invalide' });
  }
};

export default verifyToken;
