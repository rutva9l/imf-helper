import 'dotenv/config'
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { default as gadgetsRouter } from './routes/gadgets.routes';
import { default as authRouter } from './routes/auth.routes'
import db from './config/database'

const app = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('ping');
});

db.authenticate()
  .then(async () => {
    console.log('Database connected');
    await db.sync({ alter: true });
  })
  .catch((err) => console.error('Error connecting to database:', err));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/gadgets', gadgetsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});