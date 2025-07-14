import express from "express";
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRotes from './routes/auth.routes'
import propertyRoutes from './routes/property.routes';
import serverless from 'serverless-http';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://mini-zillow-fe.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/auth',authRotes);
app.use('/api/property',propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const handler = serverless(app);
