const express = require('express')
const router = express.Router()
const pool = require('../db/dbConfig')

// make an endpoint for getting all record labels
router.get('/', (req, res) => {
    pool.query('SELECT * FROM recordlabel', (err, result) => {
        if (err) console.log(err)

        res.render('recordLabels', { recordLabels: result })
    })
})

// change endpoint name to /add
router.get('/add', (req, res) => {
    res.render('addRecordLabel')
})

router.post('/', (req, res) => {
    const { recordLabelName } = req.body
    console.log(recordLabelName) // correct

    pool.query('CALL addRecordLabel(?)', [recordLabelName], (err, result) => {
        if (err) console.log(err)

        console.log(result)
        res.redirect('/recordLabels/')
    })
})

// make endpoints for update & deletes

router.post('/update', (req, res) => {
    console.log(req.body) // correct    
    pool.query(`
        UPDATE recordlabel
        SET recordLabelName = ?
        WHERE recordLabelId = ?
    `, [req.body.newRecordLabelName, req.body.id], (err, result) => {
        if (err) console.log(err)
        // if (Boolean(Number(result.affectedRows))) {
        //     console.log(result)
        //     res.redirect('/recordLabels/')
        // }
        res.status(201).redirect('/recordLabels/')
    })
})

router.post('/:id/delete', (req, res) => {
    const id = req.params.id
    console.log(req.body) // => {}

    pool.query(`
        DELETE FROM recordlabel
        WHERE recordLabelId = ?
`, [id], (err, result) => {
        if (err) console.log(err)

        res
        res.status(204).redirect('/recordLabels/')
        // if (Boolean(Number(result.affectedRows))) {
        //     console.log("Successful delete.")
        // } else {
        //     // alert("Something went wrong. Record not deleted.")
        // }
    })
})

module.exports = router