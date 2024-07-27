const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTransaction = async (req, res) => {
  const { amount, source_account_id, destination_account_id } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        source_account_id: parseInt(source_account_id),
        destination_account_id: parseInt(destination_account_id),
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { fromAccount: true, toAccount: true },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
