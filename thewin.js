


{
  "name": "okwin-app",
  "version": "1.0.0",
  "main": "backend/app.js",
  "scripts": {
    "start": "node backend/app.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^7.2.2"
  }
}



PORT=5000
MONGO_URI=mongodb://localhost:27017/okwin

> Update MONGO_URI if you're using a different DB host.




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static('public'));

// Routes
app.use('/api/games', gameRoutes);

// Start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(Server running on port ${PORT}));
  })
  .catch((err) => console.error('MongoDB error:', err));



const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Game', gameSchema);




const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const express = require('express');
const router = express.Router();
const { getGames } = require('../controllers/gameController');

router.get('/', getGames);

module.exports = router;







fetch("/api/games")
  .then(response => response.json())
  .then(data => {
    const gamesDiv = document.getElementById("games");
    data.forEach(game => {
      const div = document.createElement("div");
      div.innerHTML = <h3>${game.name}</h3><p>${game.description}</p>;
      gamesDiv.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Failed to load games:", err);
  });




const mongoose = require('mongoose');
const Game = require('./backend/models/Game');

mongoose.connect('mongodb://localhost:27017/okwin').then(async () => {
  await Game.insertMany([
    { name: "Win Go", description: "Guess number Red/Green/Violet" },
    { name: "MotoRace", description: "Bet on top 3" },
    { name: "5D", description: "Guess 5 digit number" }
  ]);
  console.log("Games added");
  process.exit();
});





npm start




http://localhost:5000

