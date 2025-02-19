import express, { Request, Response } from 'express';
import { default as gadgetsRouter } from './routes/gadgets.routes';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('um helloo..?');
});

app.use(cors());
app.use('/gadgets', gadgetsRouter);

app.listen(PORT, () => {
  console.log(`when the server run ${PORT}`);
});