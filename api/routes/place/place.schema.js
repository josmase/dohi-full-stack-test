exports.schema = {
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
};
