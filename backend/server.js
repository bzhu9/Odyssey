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

app.use("/event", require("./routes/eventRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/friend", require("./routes/friendRoute"));
app.use("/building", require("./routes/buildingRoute"));
app.use("/openclass", require("./routes/openClassRoute"));
app.use("/course", require("./routes/courseRoute"));


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(port, () => console.log(`Server running on port ${port}`))
})