import express from 'express';
import * as dot from 'dotenv';
import { logger, Winston } from "./config/winston.js";
import morgan from 'morgan';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';

import * as swaggerUi from 'swagger-ui-express';
import router from './routes/index.js';
import URLRouter from './routes/URLRouter.js';

const swaggerDocument = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)));

const dotenv = dot.config();

// Start Express Application
const app = express();

// Set up Logger system
if (dotenv.error) {
    logger.log('error', `Error with dotEnv setup`);
    throw dotenv.error;
} else {
    /**
     * Connection begins
     */
    const dbName = process.env.NODE_ENV === 'development' ? process.env.DB_NAME_DEV : process.env.DB_NAME_PROD;
    const connectionString = process.env.CONNECTION_STRING;
    mongoose.connect(connectionString,() => {});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error, unable to connect to database!'));
    db.once('open', () => {
        // connected
        logger.log('info', `Connected correctly to server => ${dbName}`);
    });
// Connection ends here.

}

// set up environment
app.use(morgan('dev'));
app.use(morgan("combined", { stream: Winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( (req, res, next) => {
    // Allow access from all origin for now
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate, private');
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    next();
});

// Assign routers
app.use('/', router);
app.use(`/swagger/documentation`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/api`, URLRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
    const msg = 'This resource you are trying to access is not found on this server!.';
    const err = new Error(msg);
    err.status = 'FAILURE';
    err.code = 404;
    err.msg = msg;
    res.status(404).send(err);
});

// error handler
app.use((req, res) => {
    const error = new Error('Internal server error');
    res.locals.error = req.app.get('env') === 'development' ? error : {};
    res.status(500).send(error);
});
export default app;
