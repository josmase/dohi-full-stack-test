const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'dohi',
    password: 'dohi',
    database: 'dohi'
});

/**
 * Performs a query to the database and formats the query if needed.
 * @param sql The sql string to use.
 * @param inserts The values that should be escaped and used in the query.
 */
function query(sql, inserts) {
    return new Promise((resolve, reject) => {
        if (inserts != null) {
            sql = mysql.format(sql, inserts)
        }
        pool.getConnection((err, connection) => {
            if (err !== null) {
                return reject(err)
            }
            connection.query(sql, (err, results) => {
                connection.release();
                if (err !== null) {
                    return reject(err)
                }
                return resolve(results)
            })
        })
    })
}

/**
 * Delete a row in  a table matching the id.
 * @param id The id of the row
 * @param table The table to delete from.
 * @return {Promise<boolean>} True if a row or more was deleted. False if there are no path with the given id.
 */
async function deleteRowInTable(id, table) {
    const sql = "DELETE FROM ?? WHERE id = ?";
    return (await query(sql, [table, id])).affectedRows > 0;
}

module.exports = {
    query,
    deleteRowInTable
};

