var express = require('express')
var router = express.Router()
const pool = require('../db/dbConfig')

// DRY: Don't repeat yourself

/* GET all artists */
router.get('/', function (req, res) {
  const sql = `CALL getAllArtistsWithRecordLabelName`
  pool.query(sql, (err, result) => {
    if (err) console.log(err)

    console.log(result[0])
    res.render('artists', { artists: result[0] })
  })
})

router.get('/:id', (req, res) => {
  const artistId = req.params.id
  console.log(`artistId: ${artistId}`)
  pool.query("CALL getArtistDetailsByIdWithRecordLabelName(?)",
    [artistId],
      (err, result) => {
    if (err) console.log(err)

    console.log(result)

    const resultsFromSP = result[0]

    res.render('artistDetails', { artist: resultsFromSP })
  })
})

module.exports = router
