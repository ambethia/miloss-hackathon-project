/* eslint no-console: 0 */

import path from 'path';
import express from 'express';

const ROOT_PATH = path.resolve(__dirname, '..');
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'dist');
const DEFAULT_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();

app.use(express.static(PUBLIC_PATH));

app.get('/foo', (req, res) => {
  res.send('bar');
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
});

if (process.env.NODE_ENV !== 'production') require('./dev')(app);
