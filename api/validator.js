/**
 * Validates that a object does not miss required properties and that every property is of the correct type.
 * @param schema The schema to follow for validation.
 * @param object The object to validate.
 * @returns void
 * @throws Error on invalid object.
 */
function checkObjectValidity(schema, object) {
    Object.keys(schema.properties).forEach(prop => {
        let property = schema.properties[prop];
        if (!object.hasOwnProperty(prop) && property.required) {
            throw new Error(`${prop}: Is required`);
        } else if (object.hasOwnProperty(prop) && property.type === "array" && !Array.isArray(object[prop])) {
            throw new Error(`${prop}: Must be an array`);
        } else if (object.hasOwnProperty(prop) && !Array.isArray(object[prop]) && typeof object[prop] !== property.type) {
            throw new Error(`${prop}: Must be of type ${property.type}`);
        }
    });
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
        checkObjectValidity(bundleSchema, bundle);
        validatePaths(bundle.paths);
        resolve()
    })
}

/**
 * Validates an array of paths and the places for each path.
 * @param paths The paths to validate.
 * @returns void
 * @throws Error On invalid format
 */
function validatePaths(paths) {
    if (!paths) {
        return;
    }

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
    paths.forEach(path => {
        checkObjectValidity(pathSchema, path);
        validatePlaces(path.places);
    });
}

/**
 * Validates an array of places.
 * @param places The places to validate.
 * @returns void
 * @throws Error On invalid format
 */
function validatePlaces(places) {
    if (!places) {
        return;
    }

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
    places.forEach(place => checkObjectValidity(placesSchema, place));
}

exports.validate = validate;
