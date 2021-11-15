import { writeFile } from 'fs';
import { argv, env } from 'yargs';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = argv['environment'];
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
   
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   ENVIRONMENT: "${environment.toUpperCase()}",
   PORT: ${process.env.PORT},
   COOKIE: "${process.env.COOKIE}",
   LOGIN: "${process.env.LOGIN}",
   ADDRESSES: "${process.env.ADDRESSES}",
   STAKE_INFO: "${process.env.STAKE_INFO}",
};
`;

writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Environment file created: ${targetPath}`);
});