const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createAccount = async (req, res) => {
  const { userId, bank_name, bank_account_number, balance } = req.body;

  try {
    const account = await prisma.bankAccount.create({
      data: {
        bank_name,
        bank_account_number,
        balance,
        userId: parseInt(userId),
      },
    });

    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bankAccount.findMany();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await prisma.bankAccount.findUnique({
      where: { id: parseInt(accountId) },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
