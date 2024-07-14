/**
 * Component Generator
 */

/* eslint strict: ["off"] */
const { readdirSync, lstatSync } = require('fs');
const path = require('path');
const { zodToJsonSchema } = require('zod-to-json-schema');
const transformSchema = require('./transform-properties');
// const transformForSequelizeModel = require('../utils/data-transform');

const basePath = path.join(__dirname, '../../../libs/mx-schema/src/lib');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'test',
    },
    {
      type: 'input',
      name: 'dbSchema',
      message: 'Db Schema Name',
      default: 'TB_test',
    },
    {
      type: 'input',
      name: 'zodSchema',
      message: 'Zod schema name',
      default: 'Z_test',
    },
    {
      type: 'list',
      name: 'generator',
      message: 'What do you want to generate',
      choices: ['crud', 'crud-api-only'],
    },
  ],
  actions: (data) => {
    const files = readdirSync(basePath, { recursive: true });
    let schemaDefinition;
    for (const file of files) {
      if (lstatSync(`${basePath}/${file}`).isFile()) {
        const j = require('jiti')(__filename);
        const zodSchema = j(`${basePath}/${file}`)[data.zodSchema];
        if (zodSchema) {
          const jsonSchema = zodToJsonSchema(zodSchema, data.zodSchema);
          schemaDefinition = jsonSchema.definitions[data.zodSchema];
        }
      }
    }

    if (!schemaDefinition) {
      // schemaDefinition = transformForSequelizeModel(schemaDefinition);
      console.error(`No Schema with name ${data.zodSchema}`);
      return;
    }

    if (schemaDefinition) {
      schemaDefinition = transformSchema(schemaDefinition);
    }

    if (data.generator === 'crud-api-only') {
      return getApiActions(schemaDefinition);
    }
    return getAllActions(schemaDefinition);
  },
};

function getAllActions(schemaDefinition) {
  return [
    ...getApiActions(schemaDefinition),
    ...getAngularActions(schemaDefinition),
  ];
}

function getApiActions(schemaDefinition) {
  return [
    // api service file
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/index.ts',
      templateFile: './components/express/router-index.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // api service file
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/{{dashCase name}}.service.ts',
      templateFile: './components/express/data.service.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get list api
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/get-{{dashCase name}}-list.api.ts',
      templateFile: './components/express/get-all-list.api.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get all entries for dropdowns
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/get-all-{{dashCase name}}.api.ts',
      templateFile: './components/express/get-all.api.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // create api
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/create-{{dashCase name}}.api.ts',
      templateFile: './components/express/create.api.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //delete api
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/id/delete-{{dashCase name}}.api.ts',
      templateFile: './components/express/id/delete.api.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get by id api
    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/id/get-{{dashCase name}}.api.ts',
      templateFile: './components/express/id/get.api.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // update api

    {
      type: 'add',
      path: '../../apps/api/src/routes/v1/{{dashCase name}}/id/update-{{dashCase name}}.api.ts',
      templateFile: './components/express/id/update.api.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Modify api routing file
    {
      type: 'modify',
      path: '../../apps/api/src/routes/v1/router.ts',
      pattern: /(\/\/ APPEND API ROUTES)/g,
      templateFile: './components/express/router.ts.hbs',
    },
    // modiy routing file
    {
      type: 'modify',
      path: '../../apps/api/src/routes/v1/router.ts',
      pattern: /(\/\/ IMPORT GENERATED FILES)/g,
      templateFile: './components/express/import-routes.ts.hbs',
    },
  ];
}

function getAngularActions(schemaDefinition) {
  return [
    // angular module file
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/{{dashCase name}}.module.ts',
      templateFile: './components/angular/module.ts.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // angular routing file
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/{{dashCase name}}-routing.module.ts',
      templateFile: './components/angular/routing.ts.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // List component
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/{{dashCase name}}-list/{{dashCase name}}-list.component.ts',
      templateFile: './components/angular/list.ts.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Form component HTML
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/modify-{{dashCase name}}/{{dashCase name}}-form/{{dashCase name}}-form.component.html',
      templateFile: './components/angular/form/form.html.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Form component TS
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/modify-{{dashCase name}}/{{dashCase name}}-form/{{dashCase name}}-form.component.ts',
      templateFile: './components/angular/form/form.ts.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Create form component
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/modify-{{dashCase name}}/create-{{dashCase name}}.component.ts',
      templateFile: './components/angular/form/add-form.ts.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Edit form component
    {
      type: 'add',
      path: '../../apps/admin/src/app/features/{{dashCase name}}/modify-{{dashCase name}}/update-{{dashCase name}}.component.ts',
      templateFile: './components/angular/form/edit-form.ts.hbs',
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // modify routing file
    {
      type: 'modify',
      path: '../../apps/admin/src/app/app-routing.module.ts',
      pattern: /(\/\/ APPEND ANGULAR ROUTES)/g,
      templateFile: './components/angular/append-route.ts.hbs',
    },
  ];
}
