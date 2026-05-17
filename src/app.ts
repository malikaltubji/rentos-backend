import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('RentOS Backend is Running! 🚀');
});

app.listen(port, () => {
  console.log(`Server is driving on port ${port}`);
});
