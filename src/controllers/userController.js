const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  const { name, email, password, identity_type, identity_number, address } = req.body;

  // console.log(req.body); // checkin bug


// POST USER
  try {
    // inisialisasi hash password dengan import bcrypt diatas
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user with profile
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {
            identity_type,
            identity_number,
            address,
          }
        }
      },
      include: { profile: true }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER
exports.getUsers = async (req, res) => {
  try {
    // get all user not in detail, i put the user detail at get by Id
    const users = await prisma.user.findMany()
      res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    // get user by Id and showing profile and bankAccount
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { profile: true, bankAccounts: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
