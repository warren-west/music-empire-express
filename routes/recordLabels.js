const express = require('express')
const router = express.Router()
const pool = require('../db/dbConfig')

router.get('/', (req, res) => {
    res.render('addRecordLabel')
})

router.post('/', (req, res) => {
    const { recordLabelName } = req.body
    console.log(recordLabelName) // correct

    pool.query('CALL addRecordLabel(?)', [recordLabelName], (err, result) => {
        if (err) console.log(err)

        console.log(result)
    })

    res.send()
})

module.exports = router