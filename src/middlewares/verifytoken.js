import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: token manquant ou mal formé' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // 🔥 on ajoute l’ID dans la requête
    next();
  } catch (error) {
    console.error('Erreur de vérification du token :', error);
    return res.status(401).json({ message: 'Unauthorized: token invalide' });
  }
};

export default verifyToken;
