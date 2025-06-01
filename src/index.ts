import { rejects } from "assert";
import * as express from "express";
import connectDB from './config/db';

const app = express();
const PORT = 3000;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('<p>Hello from TypeScript and Express yes!</p>');
// });

// app.get('/api/user/login', (req, res) => {
//   res.send('<p>Hello from   and Express yes!</p>');
// });

// app.post('/api/user/create', (req, res) => {
//    const userData = req.body;
//   res.status(200).json(userData);
// });




connectDB()
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
