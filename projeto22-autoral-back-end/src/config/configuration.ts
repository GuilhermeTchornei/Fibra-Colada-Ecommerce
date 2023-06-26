import * as dotenv from 'dotenv';

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    secret_key: process.env.JWT_SECRET,
    database: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
    }
});