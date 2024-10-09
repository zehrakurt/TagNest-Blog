import express from 'express';
import categoryRoutes from '../src/routers/categoryRoutes';
import postRoutes from '../src/routers/postRoutes';
import commentRoutes from '../src/routers/commentRoutes';
import tagRoutes from '../src/routers/tagRoutes';

const app = express();

app.use(express.json());


app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);

export default app;
