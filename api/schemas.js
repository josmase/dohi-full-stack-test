module.exports = {
    bundle: {
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
            }
        },
        required: ['name', 'info', 'image']
    },
    path: {
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
            }
        },
        required: ['name', 'info', 'image', 'duration', 'length']
    },
    place: {
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
