const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());


const USER = { username: 'user1', password: 'pass123' };
let accountBalance = 1000;


const JWT_SECRET = 'mybanksecretkey';


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(400).json({ error: 'Invalid Authorization format' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }


  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({
    message: 'Login successful!',
    token,
  });
});

app.get('/balance', verifyToken, (req, res) => {
  res.json({
    username: req.user.username,
    balance: accountBalance,
  });
});


app.post('/deposit', verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid deposit amount' });
  }

  accountBalance += amount;
  res.json({
    message: `Deposited ₹${amount} successfully.`,
    newBalance: accountBalance,
  });
});


app.post('/withdraw', verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid withdrawal amount' });
  }

  if (amount > accountBalance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  accountBalance -= amount;
  res.json({
    message: `Withdrawn ₹${amount} successfully.`,
    newBalance: accountBalance,
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🏦 Banking API running on http://localhost:${PORT}`);
});
