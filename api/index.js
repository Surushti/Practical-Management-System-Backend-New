import dbConnect from '../config/database.js'; 
import express from 'express';
import router from '../routes/FeedbackRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", router);

dbConnect();
app.get("/",(req,res)=>{
  res.json({
    success: true,
    message: "Server Running Successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
