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
    let sql = "SELECT id, name, image, info FROM bundle";

    if (bundleID != null) {
        sql += " WHERE id=?";
    }

    const bundles = await query(sql, [bundleID]);

    return Promise.all(bundles.map(async (bundle) => {
        bundle.paths = await getPaths(bundle.id);
        return bundle;
    }));
}

/**
 * Gets all the paths of a bundle.
 * @param bundleID The id of the bundle to get paths for.
 * @returns {*} All the paths for the bundle as a promise.
 */
async function getPaths(bundleID) {
    const sql = "SELECT id, name, info, length, duration, image FROM path WHERE bundleID=?";
    const paths = await query(sql, [bundleID]);
    return addPlacesToPaths(paths);
}

/**
 * Iterates all the paths and adds its places.
 * @param paths All the paths to add to.
 * @returns {Promise<void>}
 */
async function addPlacesToPaths(paths) {
    return Promise.all(paths.map(async (path) => {
        path.places = await getPlaces(path.id);
        return path;
    }));
}

/**
 * Gets all the places of a path.
 * @param pathID The path id to find places from.
 * @returns {*} Promise with array of places on success.
 */
function getPlaces(pathID) {
    const sql = "SELECT id, name, info, image, radius FROM place WHERE pathID=?";
    return query(sql, [pathID]);
}

/**
 * Delete the bundle and its paths and places
 * @param bundleId The id of the bundle to delete.
 * @return {*} True if a row or more was deleted. False if there are no path with the given id.
 */
function deleteBundle(bundleId) {
    return deleteRowInTable(bundleId, 'bundle');
}

/**
 * Deletes a path from the database.
 * @param pathId The id of the path to delete.
 * @return {*} True if a row or more was deleted. False if there are no path with the given id.
 */
function deletePath(pathId) {
    return deleteRowInTable(pathId, 'path');
}

/**
 * Deletes a place from the database.
 * @param placeId The id of the place to delete.
 * @return {*} True if a row or more was deleted. False if there are no path with the given id.
 */
function deletePlace(placeId) {
    return deleteRowInTable(placeId, 'place');
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


/**
 * Create a bundle and all of its paths and places.
 * @param bundle The bundle to create.
 * @returns {Promise<*|number>} The id of the newly created bundle.
 */
async function createBundle(bundle) {
    const sql = "INSERT INTO bundle (name, image, info) VALUES (?, ?, ?)";
    const bundleId = (await query(sql, [bundle.name, bundle.image, bundle.info])).insertId;
    await createPaths(bundle.paths, bundleId);
    return bundleId;
}

/**
 * Create paths and the places for each path.
 * @param paths The paths to create
 * @param bundleId The id of the bundle the path belongs to.
 * @returns {Promise<void>}
 */
async function createPaths(paths, bundleId) {
    if (!paths) {
        return;
    }

    const sql = "INSERT INTO path (name, info, length, duration, image, bundleID) VALUES (?, ?, ?, ?, ?, ?)";
    await Promise.all(paths.map(async (path) => {
        const pathId = (await query(sql, [path.name, path.info, path.length, path.duration, path.image, bundleId])).insertId;
        return createPlaces(path.places, pathId);
    }))
}

/**
 * Create akk teh given places.
 * @param places Places to create.
 * @param pathId The id of the bundle that the place belongs to.
 * @returns {Promise<void>}
 */
async function createPlaces(places, pathId) {
    if (!places) {
        return;
    }

    const sql = "INSERT INTO place (name, info, image, radius, pathID) VALUES (?, ?, ?, ?, ? )";
    await Promise.all(places.map(place => {
        return query(sql, [place.name, place.info, place.image, place.radius, pathId]);
    }))
}

/**
 * Updates a bundle mashing the id.
 * @param bundle The bundle to use for updating
 * @param id The id of the bundle to update.
 * @returns {Promise<void>} Promise that resolves after every bundle is updated.
 */
function updateBundle(bundle, id) {
    const {name, info, image} = bundle;
    const sql = "UPDATE bundle SET name=?, info=?, image=? WHERE id=?;";
    const inserts = [name, info, image, id];
    return query(sql, inserts);
}

/**
 * Updates a given path with the given path-data.
 * @param path The path-data to use for updating.
 * @param id The id of the path to update.
 * @return {Promise<void>} Promise that resolves after every path is updated.
 */
function updatePath(path, id) {
    const {name, info, length, duration, image} = path;
    const sql = "UPDATE path SET  name=?, info=?, length=?, duration=?, image=? WHERE id=?;";
    const inserts = [name, info, length, duration, image, id];
    return query(sql, inserts)
}

/**
 * Create the statement for updating an array of places.
 * @param place The place-data to update.
 * @param id The id of the place to update.
 * @return {Promise<void>} Promise that resolves after the place is updated.
 */
function updatePlace(place, id) {
    const {name, info, image, radius} = place;
    const sql = "UPDATE place SET  name=?, info=?, image=?, radius=? WHERE id=?;";
    const inserts = [name, info, image, radius, id];
    return query(sql, inserts)
}

module.exports = {
    deleteBundle,
    getBundles,
    createBundle,
    updateBundle,
    deletePath,
    deletePlace,
    updatePath,
    updatePlace
};

