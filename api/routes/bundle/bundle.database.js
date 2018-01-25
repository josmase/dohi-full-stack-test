const {query, deleteRowInTable} = require('../../database');

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
 * Delete the bundle and its paths and places
 * @param bundleId The id of the bundle to delete.
 * @return {*} True if a row or more was deleted. False if there are no path with the given id.
 */
function deleteBundle(bundleId) {
    return deleteRowInTable(bundleId, 'bundle');
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

module.exports = {
    deleteBundle,
    createBundle,
    updateBundle,
    getBundles
};
