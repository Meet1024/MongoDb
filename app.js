const express = require('express')

const app = express()

const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')




let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app is listeninig')
        })
        db = getDb()
    }
})


app.use(express.json())

app.get('/book', (req, res) => {

    let books = []

    db.collection('book')
        .find()
        .sort({ author: 1 })
        .foreach(book => book.push(books))
        .then(() => {
            res.status(200).json(books)
        })

})


app.get('/book/:id', (req, res) => {

    console.log("get method is success")

    db.collection('book')
        .findOne({ _id: ObjectId(req.params.id) })
        .then(docs => {
            res.status(200).json(docs)
        })

})


app.post('/book', (req, res) => {
    const booke = req.body

    db.collection('book')
        .insertOne(booke)
        .then(result => {
            res.status(201).json(result)
        })
})


app.delete('/booke/:id', (req, res) => {
    db.collection('book')
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(conse => {
            res.json(conse)
        })

})

app.patch('/booke/:id', (req, res) => {
    const updates = req.body;
    db.collection('book')
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
        .then(result => {
            res.status(201).json(result)
        })
})

