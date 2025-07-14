import express from "express";
import cors from 'cors';
import userRoutes from '../src/routes/user.routes';
import authRotes from '../src/routes/auth.routes'
import propertyRoutes from '../src/routes/property.routes';
import path from "path";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://mini-zillow-fe.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/auth',authRotes);
app.use('/api/property',propertyRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
