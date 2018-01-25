exports.schema = {
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
};
