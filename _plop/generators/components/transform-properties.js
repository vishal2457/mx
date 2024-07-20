const qs = require('qs');

const transformSchema = (schemaDefinition) => {
  for (const key in schemaDefinition.properties) {
    const property = schemaDefinition.properties[key];
    property.formType = property.type;
    if (property?.description) {
      const parsedQuery = qs.parse(property.description);
      if (parsedQuery.skipField) {
        property.skipField = !!parsedQuery.skipField;
      }

      if (parsedQuery.type) {
        property.formType = parsedQuery.type;
      }

      property.required = schemaDefinition.required.includes(key);
    }
  }
  return schemaDefinition;
};

module.exports = transformSchema;
