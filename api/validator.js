/**
 * Validates that a object does not miss required properties and that every property is of the correct type.
 * @param schema The schema to follow for validation.
 * @param object The object to validate.
 * @returns Boolean True if the object is valid.
 * @throws Error on invalid object.
 */
function isObjectValid(schema, object) {
    Object.keys(schema.properties).every(prop => {
        let property = schema.properties[prop];
        if (!object.hasOwnProperty(prop) && property.required) {
            throw new Error(`${prop}: Is required`);
        } else if (object.hasOwnProperty(prop) && property.type === "array" && !Array.isArray(object[prop])) {
            throw new Error(`${prop}: Must be an array`);
        } else if (object.hasOwnProperty(prop) && !Array.isArray(object[prop]) && typeof object[prop] !== property.type) {
            throw new Error(`${prop}: Must be of type ${property.type}`);
        }
    });
    return true;
}

/**
 * Validates that the bundle and its paths and places are properly formatted.
 * @param bundle The bundle to validate
 * @returns {Promise<Error>} Resolves on success
 * @throws Error on invalid bundle format.
 */
function validate(bundle) {
    return new Promise(resolve => {
        const bundleSchema = {
            "$schema": "http://json-schema.org/draft-06/schema#",
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    required: 'true,'
                },
                info: {
                    type: 'string',
                    required: 'true,'
                },
                image: {
                    type: 'string',
                    required: 'true,'
                },
                paths: {
                    type: 'array',
                    required: 'false,'
                }
            }
        };
        isObjectValid(bundleSchema, bundle);
        validatePaths(bundle.paths);
        resolve()
    })
}

/**
 * Validates an array of paths and the places for each path.
 * @param paths The paths to validate.
 * @returns nothing
 * @throws Error On invalid format
 */
function validatePaths(paths) {
    const pathSchema = {
        "$schema": "http://json-schema.org/draft-06/schema#",
        type: 'object',
        properties: {
            name: {
                type: 'string',
                required: 'true,'
            },
            info: {
                type: 'string',
                required: 'true,'
            },
            image: {
                type: 'string',
                required: 'true,'
            },
            duration: {
                type: 'string',
                required: 'true,'
            },
            length: {
                type: 'string',
                required: 'true,'
            },
            places: {
                type: 'array',
                required: 'false,'
            }
        }
    };
    if (paths) {
        paths.every(path => {
            isObjectValid(pathSchema, path);
            if (path.hasOwnProperty("places")) {
                validatePlaces(path.places);
            }
        });
    }
}

/**
 * Validates an array of places.
 * @param places The places to validate.
 * @returns nothing
 * @throws Error On invalid format
 */
function validatePlaces(places) {
    const placesSchema = {
        "$schema": "http://json-schema.org/draft-06/schema#",
        type: 'object',
        properties: {
            name: {
                type: 'string',
                required: 'true,'
            },
            info: {
                type: 'string',
                required: 'true,'
            },
            image: {
                type: 'string',
                required: 'true,'
            },
            radius: {
                type: 'number',
                required: 'true,'
            }
        }
    };
    places.every(place => isObjectValid(placesSchema, place));
}

exports.validate = validate;
