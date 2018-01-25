const {query, deleteRowInTable} = require('../../database');

/**
 * Deletes a place from the database.
 * @param placeId The id of the place to delete.
 * @return {*} True if a row or more was deleted. False if there are no path with the given id.
 */
function deletePlace(placeId) {
    return deleteRowInTable(placeId, 'place');
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


/**
 * Gets all the places of a path.
 * @param pathID The path id to find places from.
 * @returns {*} Promise with array of places on success.
 */
function getPlaces(pathID) {
    const sql = "SELECT id, name, info, image, radius FROM place WHERE pathID=?";
    return query(sql, [pathID]);
}

module.exports = {
    deletePlace,
    createPlaces,
    updatePlace,
    getPlaces
};
