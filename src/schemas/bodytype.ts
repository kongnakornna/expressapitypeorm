export default {
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        minLength: 4,
        maxLength: 500
      }, 
    },
    required: [
      'id', 
    ]
  }
}