import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Freelance Platform API',
        version: '1.0.0'
      }
    },
    apis: ['src/routes/*.ts']
  } as const;
  const specs = swaggerJsdoc(options);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}


