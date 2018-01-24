module.exports = {
    bundleSchema: {
        id: 'bundle',
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            info: {
                type: 'string'
            },
            image: {
                type: 'string'
            },
            paths: {
                type: 'array',
                items: {
                    $ref: 'path'
                }
            }
        },
        required: ['name', 'info', 'image']
    },
    pathSchema: {
        id: 'path',
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            info: {
                type: 'string',
            },
            image: {
                type: 'string',
            },
            duration: {
                type: 'string',
            },
            length: {
                type: 'string',
            },
            places: {
                type: 'array',
                items: {
                    $ref: 'place'
                }
            }
        },
        required: ['name', 'info', 'image', 'duration', 'length']
    },
    placeSchema: {
        id: 'place',
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            info: {
                type: 'string',
            },
            image: {
                type: 'string',
            },
            radius: {
                type: 'number',
            }
        },
        required: ['name', 'info', 'image', 'radius']
    }
};
