const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MONGOOSE step 1 - CONNECT to mongodb
mongoose.connect('mongodb://localhost/pokemon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// MONGOOSE Step 2 - console.log if connected
const db = mongoose.connection;
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// MONGOOSE Step 3 - make schema and model
const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    origin: String,
    level: Number,
});
const Pokemon_Model = mongoose.model('Pokemon2', pokemonSchema);

app.listen(3000, function() {
    console.log("listening on port 3000")
});

app.get('/pokemon_add/:name/:type/:origin/:lvl', function(req,res) {
    // res.send("you want to add "+ req.params.name + ", type:" + req.params.type)

    let user_pokemon = new Pokemon_Model({
        name: req.params.name,
        type: req.params.type,
        origin: req.params.origin,
        level: req.params.lvl,
    })
    user_pokemon.save(function (err) {
        Pokemon_Model.find({}, function(err, results) {
            res.send("Ok now your db looks like this:" + results)
        })
    });
})

app.get('/pokemon/type/:element', function(req,res) {
    Pokemon_Model.find({type: req.params.element}, function (err, poke_results) {
        res.send(poke_results)
    })
})

app.get('/pokemon', function(req,res) {
    Pokemon_Model.find({}, function(err, results) {
        res.send(results)
    })
})