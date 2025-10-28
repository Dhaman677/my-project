const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// Sample in-memory card collection
let cards = [
    { id: 1, suit: "Hearts", value: "Ace" },
    { id: 2, suit: "Spades", value: "King" }
];

// GET all cards
app.get("/cards", (req, res) => {
    res.json(cards);
});

// POST add a new card
app.post("/cards", (req, res) => {
    const newCard = {
        id: cards.length + 1,
        suit: req.body.suit,
        value: req.body.value
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// PUT update a card by id
app.put("/cards/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);

    if (!card) {
        return res.status(404).json({ message: "Card not found" });
    }

    card.suit = req.body.suit || card.suit;
    card.value = req.body.value || card.value;

    res.json(card);
});

// DELETE a card by id
app.delete("/cards/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Card not found" });
    }

    const deletedCard = cards.splice(index, 1);
    res.json(deletedCard);
});

// Start server
app.listen(PORT, () => {
    console.log(`🎴 Server running at http://localhost:${PORT}`);
});