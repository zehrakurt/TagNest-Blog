import express from 'express';
import categoryRoutes from './routes/categoryRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import tagRoutes from './routes/tagRoutes';

const app = express();

app.use(express.json());


app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);

export default app;
