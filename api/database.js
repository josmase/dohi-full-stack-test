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
            if (err) {
                reject(err)
            }
            connection.query(sql, (err, results) => {
                connection.release();
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    })
}

/**
 * Gets the bundle matching the bundle id. If no id is given all bundles will be returned. Every bundle contains paths and places.
 * @param bundleID Optional. The id of the bundle to get.
 * @returns {Promise<*>} An array of bundles.
 */
async function getBundles(bundleID) {
    let sql = "SELECT id, name, image info FROM bundle";

    if (bundleID != null) {
        sql += " WHERE id=?";
    }

    const bundles = await query(sql, bundleID);
    for (let i = 0; i < bundles.length; i++) {
        bundles[i].paths = await getBundleExtras(bundles[i].id);
    }
    return bundles;
}

/**
 * Gets tha paths and the places for each path. WHere the paths are part of the bundle.
 * @param bundleID The id of the bundle to get paths from.
 * @returns {Promise<*>} All the paths and places.
 */
async function getBundleExtras(bundleID) {
    const paths = await getPaths(bundleID);
    await addPlacesToPaths(paths);
    return paths;
}

/**
 * Gets all the paths of a bundle.
 * @param bundleID The id of the bundle to get paths for.
 * @returns {*} All the paths for the bundle as a promise.
 */
function getPaths(bundleID) {
    const sql = "SELECT id, name, info, length, duration, image FROM path WHERE bundleID=?";
    return query(sql, [bundleID])
}

/**
 * Iterates all the paths and adds its places.
 * @param paths All the paths to add to.
 * @returns {Promise<void>}
 */
async function addPlacesToPaths(paths) {
    for (let i = 0; i < paths.length; i++) {
        paths[i].places = await getPlaces(paths[i].id)
    }
}

function getPlaces(pathID) {
    const sql = "SELECT id, name, info, image, radius FROM place WHERE pathID=?";
    return query(sql, [pathID]);
}


exports.getBundles = getBundles;
