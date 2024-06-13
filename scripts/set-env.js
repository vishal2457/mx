const { writeFile } = require('fs');
const { resolve } = require('path');

const targetPath = resolve(
  __dirname,
  '../apps/admin/src/environments/environment.prod.ts'
);

const d = new Date();

// Define environment variables to inject
const envConfigFile = `
export const environment = {
  production: true,
  api: 'http://${process.env.NODE_HOST}:3000',
  get assetsURL() {
    return 'this.api'+'/static';
  },
  latestBuildTime: '${d.toDateString()}, ${d.getHours()}:${d.getMinutes()}'
};
`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment variables written to ${targetPath}`);
  }
});
