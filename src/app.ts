import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors()); // للسماح لـ Lovable بالاتصال بالمحرك
app.use(express.json());

const port = process.env.PORT || 3000;

// تسجيل مستخدم جديد عند ربط المحفظة
app.post('/register', async (req: Request, res: Response) => {
  const { wallet } = req.body;
  try {
    const user = await prisma.user.upsert({
      where: { wallet },
      update: {},
      create: { wallet }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('RentOS API is Active and Connected to Database! 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
