const express = require('express')

const GerichtCtrl = require('../controllers/gerichte-ctrl')

const router = express.Router()

router.post('/gericht', GerichtCtrl.createGericht)
router.put('/gericht/:id', GerichtCtrl.updateGericht)
router.delete('/gericht/:id', GerichtCtrl.deleteGericht)
router.get('/gericht/:id', GerichtCtrl.getGerichtById)
router.get('/gerichte', GerichtCtrl.getGerichte)

module.exports = router