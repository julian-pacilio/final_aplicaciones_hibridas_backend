import express from "express";
import Router from "./routes/router.js"
import cors from 'cors'
import path from "path";

const PORT = 8083;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server Listening on http://192.168.1.2:${PORT}`);
});