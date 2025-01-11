import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

if (process.env.env === 'production') {
    const productionEnvPath = '.env.production';
    if (!fs.existsSync(productionEnvPath)) {
        throw new Error(`Missing .env.production file for production environment`);
    }
    dotenv.config({ path: productionEnvPath, override: true });
}

interface IAppConfig {
    port: number;
    mongoUri: string;
    rabbitMQUri: string;
    env: string;
}

const getAppConfig = (): IAppConfig => {
    const port = parseInt(process.env.PORT) || 3001;
    const mongoUri = process.env.MONGOURI;
    const rabbitMQUri = process.env.RABBITMQ_URL;
    const env = process.env.ENV;

    if (!port) console.error('PORT is not defined');
    if (!mongoUri) console.error('MONGOURI is not defined');
    if (!rabbitMQUri) console.error('RABBITMQ_URL is not defined');
    if (!env) console.error('env is not defined');

    return { port, mongoUri, rabbitMQUri, env };
};

export const AppConfig = getAppConfig();
