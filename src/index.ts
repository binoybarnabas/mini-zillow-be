import express from "express";
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRotes from './routes/auth.routes'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/auth',authRotes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
