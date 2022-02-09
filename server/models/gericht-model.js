const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Gericht = new Schema(
    {
        name: { type: String, required: true },
        saison: { type: String, required: true },
        komplex: { type: String, required: true },
        typ: { type: String, required: true },
        zutaten: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('gerichte', Gericht)