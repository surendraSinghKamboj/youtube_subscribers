const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API documentation'
    },
    servers: [
      {
        url: 'https://ytsubscribers.onrender.com/'
      }
    ]
  },
  apis: ['./app.js'] 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
