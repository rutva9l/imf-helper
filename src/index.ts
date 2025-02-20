import 'dotenv/config'
import express, { Request, Response } from 'express';
import cors from 'cors';
import { default as gadgetsRouter } from './routes/gadgets.routes';
import db from './config/database'

const app = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('um helloo..?');
});

db.authenticate()
  .then(async () => {
    console.log('Database connected');
    await db.sync({ alter: true });
  })
  .catch((err) => console.error('Error connecting to database:', err));

app.use(express.json());
app.use(cors());
app.use('/gadgets', gadgetsRouter);

app.listen(PORT, () => {
  console.log(`when the server run ${PORT}`);
});