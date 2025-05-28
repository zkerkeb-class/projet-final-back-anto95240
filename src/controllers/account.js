import Account from "../schema/account.js"

export const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des comptes" });
  }
}

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    if (!account) return res.status(404).json({ message: "Compte non trouvé" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export const postAccount = async (req, res) => {
  try {
    const { userId, type, budgetStart, taux } = req.body;

    if (!userId || !type || budgetStart == null || taux == null) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const formattedType = accountType.charAt(0).toUpperCase() + accountType.slice(1).toLowerCase();
    const name = `Compte ${formattedType}`;
    
    const accountTypesWithoutTaux = ['Courant', 'Bancaire'];
    let finalTaux = taux;

    if (accountTypesWithoutTaux.includes(accountType)) {
      finalTaux = 0;
    } else {
      if (finalTaux == null) {
        return res.status(400).json({ message: "Le taux est obligatoire pour ce type de compte." });
      }
    }

    const newAccount = new Account({
      userId,
      name,
      type,
      balance: budgetStart, // initial balance = budgetStart
      budgetStart,
      taux: finalTaux,
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);

  } catch (error) {
    console.error("Erreur lors de la création du compte :", error);
    res.status(500).json({ message: "Erreur lors de la création du compte", error: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedAccount = await Account.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAccount) return res.status(404).json({ message: "Compte non trouvé" });

    res.json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du compte" });
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) return res.status(404).json({ message: "Compte non trouvé" });

    res.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du compte" });
  }
}