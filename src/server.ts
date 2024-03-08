import express from 'express';
import router from "./routes/router";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: ["http://localhost:5173", "https://sli-form.netlify.app", "https://sli-app.netlify.app"],
};


app.use(cors(corsOptions));


app.use(express.static("public"));
app.use(express.static("node_modules"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes settings
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
