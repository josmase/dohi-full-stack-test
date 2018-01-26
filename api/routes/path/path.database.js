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

const {query, deleteRowInTable} = require('../../database');


/**
 * Create a path and math it to the bundleID
 * @param path The path to create
 * @param bundleId The id of the bundle the path belongs to.
 * @returns {Promise<number>} The id of the created path
 */
async function createPath(path, bundleId) {
    const sql = "INSERT INTO path (name, info, length, duration, image, bundleID) VALUES (?, ?, ?, ?, ?, ?)";
    return (await query(sql, [path.name, path.info, path.length, path.duration, path.image, bundleId])).insertId;
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
 * Gets all the paths of a bundle.
 * @param bundleID The id of the bundle to get paths for.
 * @returns {*} All the paths for the bundle as a promise.
 */
async function getPaths(bundleID) {
    const sql = "SELECT id, name, info, length, duration, image FROM path WHERE bundleID=?";
    const paths = await query(sql, [bundleID]);
    return addPlacesToPaths(paths);
}

module.exports = {
    deletePath,
    createPath,
    updatePath,
    getPaths
};