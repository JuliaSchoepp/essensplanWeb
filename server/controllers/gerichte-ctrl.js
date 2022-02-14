
const Gericht = require('../models/gericht-model')

createGericht = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Gericht',
        })
    }

    const gericht = new Gericht(body)

    if (!gericht) {
        return res.status(400).json({ success: false, error: err })
    }

    gericht
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: gericht._id,
                message: 'Gericht created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Gericht not created!',
            })
        })
}

updateGericht = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Gericht.findOne({ _id: req.params.id }, (err, gericht) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Gericht not found!',
            })
        }
        gericht.name = body.name
        gericht.saison = body.saison
        gericht.komplex = body.komplex
        gericht.typ = body.typ
        gericht.zutaten = body.zutaten

        gericht
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: gericht._id,
                    message: 'Gericht updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Gericht not updated!',
                })
            })
    })
}

deleteGericht = async (req, res) => {
    await Gericht.findOneAndDelete({ _id: req.params.id }, (err, gericht) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!gericht) {
            return res
                .status(404)
                .json({ success: false, error: `Gericht not found` })
        }

        return res.status(200).json({ success: true, data: gericht })
    }).catch(err => console.log(err))
}

getGerichtById = async (req, res) => {
    await Gericht.findOne({ _id: req.params.id }, (err, gericht) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!gericht) {
            return res
                .status(404)
                .json({ success: false, error: `Gericht not found` })
        }
        return res.status(200).json({ success: true, data: gericht })
    }).catch(err => console.log(err))
}

getGerichte = async (req, res) => {
    await Gericht.find({}, (err, gerichte) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!gerichte.length) {
            return res
                .status(404)
                .json({ success: false, error: `Gericht not found` })
        }
        return res.status(200).json({ success: true, data: gerichte })
    }).catch(err => console.log(err))
}

module.exports = {
    createGericht,
    updateGericht,
    deleteGericht,
    getGerichte,
    getGerichtById,
}
