export const Swagger_API_Auth_Service = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'API Auth Service',
    description: 'API documentation for Auth Service',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  paths: {
    '/': {
      get: {
        tags: ['System'],
        summary: 'Check if the service is working',
        description:
          'This endpoint validates if the service is up and running.',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'API is working!!',
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Logs in a user',
        description:
          'Validate user credentials and return authentication token.',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User credentials',
            required: true,
            schema: {
              $ref: '#/definitions/Login',
            },
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Auth',
            },
          },
          '400': {
            description: 'Invalid credentials supplied',
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        description: 'Create a new user account.',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User details',
            required: true,
            schema: {
              $ref: '#/definitions/Register',
            },
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/Auth',
            },
          },
          '400': {
            description: 'Invalid input',
          },
        },
      },
    },
  },
  definitions: {
    Login: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
    Register: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
    Auth: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'authentication_token',
        },
      },
    },
  },
};
