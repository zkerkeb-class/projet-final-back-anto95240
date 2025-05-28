import Transaction from "../schema/transaction.js";

// Récupérer toutes les transactions
export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une transaction par son ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une nouvelle transaction
export const postTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    const newTransaction = new Transaction(transactionData);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la transaction" });
  }
};

// Mettre à jour une transaction par son ID
export const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la transaction" });
  }
};

// Supprimer une transaction par son ID
export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }
    res.json({ message: "Transaction supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la transaction" });
  }
};
