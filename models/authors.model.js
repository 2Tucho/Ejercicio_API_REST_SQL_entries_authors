const { Pool } = require("pg");
const queries = require("../queries/authors.queries"); // Queries SQL

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    database: "postgres",
    password: "123456",
});

// GET by Name+Surname
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// GET all
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// CREATE
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor, [
            name,
            surname,
            email,
            image,
        ]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// UPDATE
const updateAuthor = async (author) => {
    const { name, surname, email, image, old_email } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor, [
            name,
            surname,
            email,
            image,
            old_email
        ]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE
;const deleteAuthor = async (author) => {
    const { email } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteAuthor, [ email ]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


const authors = {
    getAuthorByEmail,
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};

module.exports = authors;

//PRUEBAS

//getAuthorByNameSurname("Alvaru", "Riveru").then(data=>console.log(data))

/* getAllAuthors()
.then(data=>console.log(data)) */