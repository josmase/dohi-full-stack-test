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
        duration: {
            type: 'string',
        },
        length: {
            type: 'string',
        }
    },
    required: ['name', 'info', 'image', 'duration', 'length']
};
