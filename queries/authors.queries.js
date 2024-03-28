const queries = {
    getAuthorByEmail: `
        SELECT a.name,a.surname,a.email,a.image,COALESCE(e.number_articles, 0) AS number_articles
        FROM authors AS a
        LEFT JOIN (SELECT 
        id_author,
        COUNT(id_author) AS number_articles
        FROM entries
        GROUP BY id_author) AS e
        ON a.id_author=e.id_author
        WHERE email=$1;
        `,
    getAllAuthors: `
        SELECT a.name,a.surname,a.email,a.image,COALESCE(e.number_articles, 0) AS number_articles
        FROM authors AS a
        LEFT JOIN (SELECT 
        id_author,
        COUNT(id_author) AS number_articles
        FROM entries
        GROUP BY id_author) AS e
        ON a.id_author=e.id_author
        `,
    createAuthor: `INSERT INTO authors(name,surname,email,image) 
    VALUES ($1,$2,$3,$4)`,
    updateAuthor: `UPDATE authors
        SET
        name=$1, 
        surname=$2, 
        email=$3, 
        image=$4,
        WHERE 
        email=$5
        `,
    deleteAuthor: `DELETE FROM authors
    WHERE email=$1
        `
};
module.exports = queries;