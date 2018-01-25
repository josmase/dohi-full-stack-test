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
    createPaths,
    updatePath,
    getPaths
};
