export default {
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        minLength: 4,
        maxLength: 500
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 500
      },
    },
    required: [
      'id',
      'password', 
    ]
  }
}