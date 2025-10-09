const express = require('express');
const app = express();


const loggerMiddleware = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
};


app.use(loggerMiddleware);


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  
  if (authHeader.trim() !== 'mysecrettoken') {
    return res.status(403).json({ error: 'Invalid or missing token' });
  }

  next(); 
};


app.get('/public', (req, res) => {
  res.json({
    message: 'This is a public route. No authentication required.'
  });
});


app.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Access granted! You are authorized.'
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
