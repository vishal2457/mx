const { writeFile } = require('fs');
const { resolve } = require('path');

const targetPath = resolve(
  __dirname,
  '../apps/admin/src/environments/environment.prod.ts'
);

const options = {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const formatter = new Intl.DateTimeFormat([], options);
const indianTime = formatter.format(new Date());
console.log(indianTime);

// Define environment variables to inject
const envConfigFile = `
export const environment = {
  production: true,
  api: 'http://${process.env.NODE_HOST}:3000',
  get assetsURL() {
    return 'this.api'+'/static';
  },
   latestBuildTime: '${indianTime}'
};
`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment variables written to ${targetPath}`);
  }
});
