import Transaction from "../schema/transaction.js";
import Category from "../schema/category.js";
import { transactionSchema } from "../validators/transaction.js";

// Récupérer toutes les transactions
export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate({ path: "categoryId", select: "name" })
      .populate({ path: "accountId", select: "type" });

    const results = transactions.map(t => ({
      _id: t._id,
      date: t.date,
      paiement: t.paiement,
      beneficiare: t.beneficiare,
      categoryId: t.categoryId?._id || null,
      categoryName: t.categoryId?.name || null,
      description: t.description,
      transactionType: t.type,
      amount: t.amount,
      accountId: t.accountId?._id || null,
      accountType: t.accountId?.type || null,
    }));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une transaction par son ID
export const getTransactionsByAccountId = async (req, res) => {
  const { accountId } = req.params;
  try {
    const transactions = await Transaction.find({ accountId })
      .populate({ path: "categoryId", select: "name" })
      .populate({ path: "accountId", select: "type" });

    if (!transactions.length) {
      return res.status(404).json({ message: "Aucune transaction trouvée" });
    }

    const results = transactions.map(t => ({
      _id: t._id,
      date: t.date,
      paiement: t.paiement,
      beneficiare: t.beneficiare,
      categoryId: t.categoryId?._id || null,
      categoryName: t.categoryId?.name || null,
      description: t.description,
      transactionType: t.type,
      amount: t.amount,
      accountId: t.accountId?._id || null,
      accountType: t.accountId?.type || null,
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une nouvelle transaction
export const postTransaction = async (req, res) => {
  const { date, paiement, beneficiare, categoryId, description, type, amount, accountId } = req.body;
  console.log("Requête reçue :", req.body);
  if (!accountId) {
    return res.status(400).json({ message: "L'ID du compte est obligatoire." });
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Catégorie invalide ou introuvable." });
    }

    const newTransaction = new Transaction({
      date,
      paiement,
      beneficiare,
      categoryId,
      description,
      type,
      amount,
      accountId,
    });

    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erreur lors de la création de la transaction" });
  }
};

// Mettre à jour une transaction par son ID
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { categoryId, categoryName, ...rest } = req.body;

  try {
    const updateData = { ...rest };

    if (categoryId) {
      updateData.categoryId = categoryId;
    } else if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).json({ message: "Catégorie introuvable." });
      }
      updateData.categoryId = category._id;
    }

    const updated = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erreur lors de la mise à jour de la transaction" });
  }
};

// Supprimer une transaction par son ID
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted ) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }
    res.status(200).json({ message: "Transaction supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la transaction" });
  }
};
