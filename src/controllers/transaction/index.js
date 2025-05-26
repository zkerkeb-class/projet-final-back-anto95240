import Transaction from "../../schema/transaction.js"

export const getTransaction = async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
}

export const getTransactionById = async (req, res) => {
  const transactions = await Transaction.findOne();
  res.json(transactions);
}

export const postTransaction = async (req, res) => {
  const transactions = await Transaction.insertOne();
  res.json(transactions);
}

export const updateTransaction = async (req, res) => {
  const transactions = await Transaction.findOneAndUpdate();
  res.json(transactions);
}

export const deleteTransaction = async (req, res) => {
  const transactions = await Transaction.deleteOne();
  res.json(transactions);
}