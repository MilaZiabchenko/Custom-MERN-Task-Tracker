import url from 'url';
import path from 'path';
import express from 'express';
import tasks from './routes/tasksRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './../frontend/build')));

app.get(/^(?!\/api).+/, (_req, res) => {
  res.sendFile(path.join(__dirname, './../frontend/build/index.html'));
});

app.use('/api/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Successfully connected to MongoDB Atlas!');
  } catch (err) {
    console.error(err.message);
  }
};

const PORT = process.env.PORT || 5005;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening to requests on port ${PORT}...`);
  });
});
