module.exports = {
    bundle: {
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
