import Account from "../../schema/account.js"

export const getAccount = async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
}

export const getAccountById = async (req, res) => {
  const accounts = await Account.findOne();
  res.json(accounts);
}

export const postAccount = async (req, res) => {
  const accounts = await Account.insertOne();
  res.json(accounts);
}

export const updateAccount = async (req, res) => {
  const accounts = await Account.findOneAndUpdate();
  res.json(accounts);
}

export const deleteAccount = async (req, res) => {
  const accounts = await Account.deleteOne();
  res.json(accounts);
}