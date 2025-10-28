const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users.js');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bankDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.post('/seed', async (req, res) => {
  try {
    await User.deleteMany({});
    const users = await User.insertMany([
      { name: 'Alice', balance: 1000 },
      { name: 'Bob', balance: 500 }
    ]);
    res.status(201).json({ message: 'Sample users created', users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount)
    return res.status(400).json({ error: 'Missing required fields' });

  if (amount <= 0)
    return res.status(400).json({ error: 'Transfer amount must be positive' });

  try {
    const sender = await User.findOne({ name: from });
    const receiver = await User.findOne({ name: to });

    if (!sender) return res.status(404).json({ error: 'Sender not found' });
    if (!receiver) return res.status(404).json({ error: 'Receiver not found' });

    // Validate sender’s balance
    if (sender.balance < amount) {
      return res.status(400).json({
        error: 'Insufficient balance',
        senderBalance: sender.balance
      });
    }


    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.status(200).json({
      message: '✅ Transfer successful',
      from: sender.name,
      to: receiver.name,
      amount,
      newBalances: {
        [sender.name]: sender.balance,
        [receiver.name]: receiver.balance
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
