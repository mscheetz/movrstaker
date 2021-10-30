import { writeFile } from 'fs';
import { argv } from 'yargs';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = process.env.ENVIRONMENT;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
   
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   PORT: "${process.env.ADDRESS}",
   COOKIE: "${process.env.COOKIE}",
   LOGIN: "${process.env.LOGIN}",
   ADDRESSES: "${process.env.BAKE}",
   STAKE_INFO: "${process.env.VERSIONS}",
};
`;

writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Environment file created: ${targetPath}`);
});