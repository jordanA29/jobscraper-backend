import * as express from 'express';
import routes from './routes';
import * as path from 'path';
import './db/mongoose';

const PORT = process.env.PORT || 3000;

const app: express.Application = express();
const publicDir = path.join(__dirname, '../public');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(publicDir));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
