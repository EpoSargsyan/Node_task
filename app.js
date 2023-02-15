const express = require('express')
const mongoose = require('mongoose')

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/books")
.then(() => console.log("Connected to Books"))
.catch(err => console.log(err));

var countGlob = 0;

const BooksScheme = {
    name: String,
    description: String,
    author: String
}; 

const LibScheme = {
    count: Number
};

const BooksColl = mongoose.model('bookscoll', BooksScheme);
const libColl = mongoose.model('libcolls', LibScheme);

app.get('/book', (req, res) => {
    BooksColl.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.post('/insert', (req, res) => {
    ++countGlob;
    const {name, description, author} = req.body;
    const {userName, surname, books} = req.body;

    const db = new BooksColl({name, description, author});
    const count_save = new libColl({countGlob});

    db.save()
    .then(() => res.json("Success!"))
    .catch(err => res.json(err));
})

app.patch('/update', (req, res) => {
    libColl.findOneAndUpdate()
    .then((result) => {
        ++result.count;
        result.save()
        .then(() => res.json("Count updated successfully"))
        .catch((err) => res.json(err));
    }).catch(err => res.json(err));
})

app.delete('/delete', (req, res) => {
    BooksColl.findOneAndDelete(req.body.name)
    .then(() => res.json("object deleted"))
    .catch((err) => console.log(err));

    libColl.findOneAndUpdate()
    .then((result) => {
        result.count = --countGlob;
        result.save();
    })
})

app.listen(PORT);