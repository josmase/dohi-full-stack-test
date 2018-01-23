function validateObject(schema, object) {
    let err = null;
    Object.keys(schema.properties).every(prop => {
        let property = schema.properties[prop];
        if (!object.hasOwnProperty(prop) && property.required) {
            err = new Error(prop + ": Is required");
        } else if (object.hasOwnProperty(prop) && property.type === "array" && !Array.isArray(object[prop])) {
            err = new Error(prop + ": Must be an array");
        } else if (object.hasOwnProperty(prop) && !Array.isArray(object[prop]) && typeof object[prop] !== property.type) {
            err = new Error(prop + ": Must be of type " + property.type);
        }
        return err === null;
    });
    return err;
}

function validate(bundle) {
    return new Promise((resolve, reject) => {
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
        let err = validateObject(bundleSchema, bundle);
        if (err === null) {
            err = validatePaths(bundle.paths);
        }
        if (err === null) {
            resolve()
        } else {
            reject(err);
        }
    })
}

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
    let err = null;
    if (paths) {
        paths.every(path => {
            err = validateObject(pathSchema, path);
            if (err === null && path.hasOwnProperty("places")) {
                err = validatePlaces(path.places);
            }
            return err === null;
        });
    }
    return err

}

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
    let err = null;
    places.every(place => {
        err = validateObject(placesSchema, place);
        return err === null;
    });
    return err;
}

exports.validate = validate;
