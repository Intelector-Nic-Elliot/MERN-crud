import express from 'express'
import cors from 'cors'
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.use(cors());
app.use(express.json())
app.use(indexRoutes);
app.use(taskRoutes);
app.listen(PORT)

app.use(express.static(join(__dirname, '../client/dist')))
console.log(`server is running on port ${PORT}`);