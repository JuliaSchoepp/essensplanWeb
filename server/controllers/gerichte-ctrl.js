
const Gericht = require('../models/gericht-model')
const fs = require('fs')

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

getGerichtbyName = function (gerichtName) {
    return Gericht.findOne({name: gerichtName}).exec();
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

savePlan = async (req, res) => {
    const planCompl = req.body;
    const plan = planCompl.filter(el => el.inKochbuch);
    let einkaufsliste = {};
    let promises = [];
    plan.forEach(function(plan){
            promises.push(
            getGerichtbyName(plan.gericht).then(
                (res) => {
                    const zutaten = res.zutaten;
                    zutaten.forEach(function(zutat){
                        if (zutat in einkaufsliste){
                            return einkaufsliste[zutat] += 1;
                        }
                        else {
                            return einkaufsliste[zutat] = 1;
                        }
                    })
                }
            ).catch ((error) => {
                console.log(error);
            })
        );
    });
    Promise.all(promises).then(() => fs.writeFileSync('../downloads/einkaufsliste.txt', JSON.stringify(einkaufsliste, null, 2), 'utf-8'));

}

downloadListe = async (req, res) => {
    const file = "../downloads/einkaufsliste.txt";
    res.download(file, 'einkaufsliste.txt');
}

downloadPlan = async (req, res) => {
    const file = "../downloads/wochenplan.pdf";
    res.download(file, 'plan.pdf');
}

module.exports = {
    createGericht,
    updateGericht,
    deleteGericht,
    getGerichte,
    getGerichtById,
    savePlan,
    downloadListe,
    downloadPlan,
}
