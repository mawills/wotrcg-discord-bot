import '@dotenvx/dotenvx';
import * as express from 'express';
import dbConnect from './dbconnect';
import searchRoute from './routers/search';

const { SERVER_PORT } = process.env;

const app: express.Express = express();

app.use('/api/search', searchRoute);

dbConnect();

app.listen(SERVER_PORT, () => {
  console.log(`app is listening on port ${SERVER_PORT}`);
});

export { app };
