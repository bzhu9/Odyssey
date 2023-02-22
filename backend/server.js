// MongoDB
// username: admin
// password: admin

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require("./db/conn.js")

connectDB()

app.use("/record", require("./routes/eventRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/user", require("./routes/buildingRoute"));



// app.listen(port, async () => {
//   // perform a database connection when server starts
//   await dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(port, () => console.log(`Server running on port ${port}`))
})