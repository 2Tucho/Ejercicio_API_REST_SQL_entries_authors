const { Pool } = require("pg");
const queries = require("../queries/entries.queries"); // Queries SQL

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    database: "postgres",
    password: "123456",
});

// GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries);
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
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry, [
            title,
            content,
            email,
            category,
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

// EDIT
const updateEntry = async (entry) => {
    const { title, content, date, category, email, old_title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateEntry, [
            title,
            content,
            date,
            category,
            email,
            old_title
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
;const deleteEntry = async (entry) => {
    const { title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteEntry, [ title ]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry,
    deleteEntry
};

module.exports = entries;

//PRUEBAS

//getEntriesByEmail("birja@thebridgeschool.es").then(data=>console.log(data))