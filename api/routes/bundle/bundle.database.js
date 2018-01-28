const {query, deleteRowInTable} = require('../../database');

/**
 * Updates a bundle mashing the id.
 * @param bundle The bundle to use for updating
 * @param id The id of the bundle to update.
 * @returns {Promise<void>} Promise that resolves after every bundle is updated.
 */
function update(bundle, id) {
    const {name, info, image} = bundle;
    const sql = "UPDATE bundle SET name=?, info=?, image=? WHERE id=?;";
    const inserts = [name, info, image, id];
    return query(sql, inserts);
}

/**
 * Create a bundle and all of its paths and places.
 * @param bundle The bundle to create.
 * @returns {Promise<number>} The id of the created bundle
 */
async function create(bundle) {
    const sql = "INSERT INTO bundle (name, image, info) VALUES (?, ?, ?)";
    return (await query(sql, [bundle.name, bundle.image, bundle.info])).insertId;
}

/**
 * Delete the bundle and its paths and places
 * @param bundleId The id of the bundle to delete.
 * @return {*} True if a row or more was deleted. False if there are no path with the given id.
 */
function remove(bundleId) {
    return deleteRowInTable(bundleId, 'bundle');
}


/**
 * Gets the bundle matching the bundle id. If no id is given all bundles will be returned.
 * @param bundleID Optional. The id of the bundle to get.
 * @returns {Promise<*>} An array of bundles.
 */
function gets(bundleID = null) {
    let sql = `SELECT id, name, image, info FROM bundle ${bundleID === null ? "" : "WHERE id=?"}`;
    return query(sql, [bundleID]);
}

module.exports = {
    remove,
    create,
    update,
    gets
};
