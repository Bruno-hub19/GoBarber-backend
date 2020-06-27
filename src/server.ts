import 'reflect-metadata';
import express from 'express';

import routes from './routes/index';
import './database';
import uploadConfigs from './configs/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfigs.directory));
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server running => http://localhost:3333');
});
