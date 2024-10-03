import * as express from 'express';
import { Request, Response } from 'express';
import { join, resolve } from 'path';

const app = express();
const distFolder = resolve(__dirname, 'front-end/dist/front-end/browser');

app.use(express.static(distFolder));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(join(distFolder, 'index.html'));
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
