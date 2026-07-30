const fs = require('fs');
const path = require('path');

const apiHost = process.env.API_HOST;
if (!apiHost) {
  console.error('API_HOST environment variable is required for production builds.');
  process.exit(1);
}

const apiUrl = `https://${apiHost}/api`;
const envPath = path.join(__dirname, '../src/environments/environment.prod.ts');
const contents = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(envPath, contents);
console.log(`Set production API URL to ${apiUrl}`);
