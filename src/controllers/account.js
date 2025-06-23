import Account from "../schema/account.js"

// Récupère tous les comptes
export const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des comptes" });
  }
}

// Récupère le compte du user connecté
export const getMyAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.userId });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des comptes de l'utilisateur." });
  }
};

// Met a jour le compte
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedAccount = await Account.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAccount) return res.status(404).json({ message: "Compte non trouvé" });

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du compte" });
  }
}
