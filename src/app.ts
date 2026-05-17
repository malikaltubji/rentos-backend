import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; // استدعاء الأداة الجديدة

const prisma = new PrismaClient();
const app = express();

// إعدادات الحماية للسماح لـ Lovable بالوصول
app.use(cors({
  origin: [
    /\.lovable\.app$/,
    /\.lovableproject\.com$/,
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

// معالجة الطلبات التمهيدية
app.options("*", cors());

app.use(express.json());

const port = process.env.PORT || 3000;

// نقطة فحص السمعة (Reputation Endpoint) لكي لا يظهر خطأ في Lovable
app.get('/reputation', async (req: Request, res: Response) => {
  try {
    // جلب عينة من البيانات لكي يراها Lovable
    const data = await prisma.reputation.findMany({
      take: 10,
      include: { user: true }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reputation data" });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('RentOS API is Active and CORS is Configured! 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
