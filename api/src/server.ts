import '@dotenvx/dotenvx';
import * as express from 'express';
import dbConnect from './dbconnect';
import cardRoute from './routers/card';

const { SERVER_PORT } = process.env;

const app: express.Express = express();

app.use('/api/card', cardRoute);

dbConnect();

const server = app.listen(SERVER_PORT, () => {
  console.log(`app is listening on port ${SERVER_PORT}`);
});

export { app };
