import Transaction from "../schema/transaction.js";
import Category from "../schema/category.js";

// Récupérer toutes les transactions
export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate({
      path: 'categoryId',
      select: 'name'
    });

    // Map pour ne retourner que le nom de la catégorie (categoryName) au lieu de categoryId complet
    const results = transactions.map(t => ({
      _id: t._id,
      date: t.date,
      paiement: t.paiement,
      beneficiare: t.beneficiare,
      categoryName: t.categoryId ? t.categoryId.name : null,
      description: t.description,
      type: t.type,
      amount: t.amount,
    }));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une transaction par son ID
export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id).populate({
      path: 'categoryId',
      select: 'name'
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json({
      _id: transaction._id,
      date: transaction.date,
      paiement: transaction.paiement,
      beneficiare: transaction.beneficiare,
      categoryName: transaction.categoryId ? transaction.categoryId.name : null,
      description: transaction.description,
      type: transaction.type,
      amount: transaction.amount,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une nouvelle transaction
export const postTransaction = async (req, res) => {
  const { date, paiement, beneficiare, categoryName, description, type, amount } = req.body;
  try {
    // Trouver la catégorie par nom
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({ message: "Catégorie invalide ou introuvable." });
    }

    const newTransaction = new Transaction({
      date,
      paiement,
      beneficiare,
      categoryId: category._id,
      description,
      type,
      amount,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la transaction" });
  }
};

// Mettre à jour une transaction par son ID
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { date, paiement, beneficiare, categoryName, description, type, amount } = req.body;
  try {
    let categoryId = undefined;
    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).json({ message: "Catégorie invalide ou introuvable." });
      }
      categoryId = category._id;
    }

    // Construction de l'objet update, on remplace categoryId si on a trouvé la catégorie
    const updateData = {
      ...(date && { date }),
      ...(paiement && { paiement }),
      ...(beneficiare && { beneficiare }),
      ...(categoryId && { categoryId }),
      ...(description && { description }),
      ...(type && { type }),
      ...(amount != null && { amount }),
    };

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la transaction" });
  }
};

// Supprimer une transaction par son ID
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }
    res.status(200).json({ message: "Transaction supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la transaction" });
  }
};
