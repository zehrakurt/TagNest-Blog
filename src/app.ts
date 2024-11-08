import express from 'express';
import categoryRoutes from '../src/routers/categoryRoutes';
import postRoutes from '../src/routers/postRoutes';
import commentRoutes from '../src/routers/commentRoutes';
import tagRoutes from '../src/routers/tagRoutes';
import posttagRoutes from '../src/routers/postTagRoutes';
import userRoutes from '../src/routers/userRoutes';
import jwtRoutes from '../src/routers/jwtRoutes'; 

const app = express();

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);
app.use('/tag', posttagRoutes);
app.use('/users', userRoutes);
app.use('/auth', jwtRoutes);

export default app;
