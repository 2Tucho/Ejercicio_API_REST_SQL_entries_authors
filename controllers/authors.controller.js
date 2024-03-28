const entry = require('../models/authors.model.js');

// GET http://localhost:3000/api/authors --> ALL
// GET http://localhost:3000/api/authors?email=birja@thebridgeschool.es
const getAuthors = async (req, res) => {
    let author;
    if (req.query.email) {
        author = await entry.getAuthorByEmail(req.query.email);
    }
    else {
        author = await entry.getAllAuthors();
    }
    res.status(200).json(author); // [] con las entries encontradas
}

// POST http://localhost:3000/api/authors
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {name,surname,email,image}
    const response = await entry.createAuthor(newAuthor);
    res.status(201).json({
        "author_created": response,
        data: newAuthor
    });
}

// UPDATE http://localhost:3000/api/authors
const updateAuthor = async (req, res) => {
    const modifiedAuthor = req.body; // {name,surname,email,image,old_email}
    const response = await entry.updateAuthor(modifiedAuthor);
    res.status(200).json({
        "author_updated": response,
        data: modifiedAuthor
    });
}

// DELETE http://localhost:3000/authors
const deleteAuthor = async (req, res) => {
    const deletedAuthor = req.body; // {email}
    const response = await entry.deleteAuthor(deletedAuthor);
    res.status(200).json({
        "author_deleted": response,
        data: deletedAuthor
    });
}

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

/* getAuthors() */