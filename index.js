const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokemon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// mongoose pokemon db setup
const db = mongoose.connection;
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
  });
const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    health: Number,
});
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.listen(3000, function() {
    console.log("listening on port 3000")
});

app.get('/pokemon', function(req,res) {
    let pikachu = new Pokemon({
        name: "pikachu",
        type: "lightning",
        health: 100
    });
    pikachu.save()
    Pokemon.find({},function(err, pokemon) {
        res.send(pokemon)
    })
})