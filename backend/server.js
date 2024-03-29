// MongoDB
// username: admin
// password: admin

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sse = require('express-sse');

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const connectDB = require("./db/conn.js")

connectDB()

app.use("/event", require("./routes/eventRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/friend", require("./routes/friendRoute"));
app.use("/building", require("./routes/buildingRoute"));
app.use("/openclass", require("./routes/openClassRoute"));
app.use("/course", require("./routes/courseRoute"));
app.use("/message", require("./routes/messageRoute"));
app.use("/chat", require("./routes/chatRoute"));
app.use("/review", require("./routes/reviewRoute"));
app.use("/note", require("./routes/noteRoute"));

const db = mongoose.connection;
const sseStream = new sse();
const eventStream = new sse();

db.once("open", () => {
  console.log("Connected to MongoDB")
  const chatCollection = db.collection("chats");
  const eventCollection = db.collection("events")
  const changeStream = chatCollection.watch();
  const eventChangeStream = eventCollection.watch();
  changeStream.on("change", change => {
    sseStream.send(change);
  });
  eventChangeStream.on("change", change => {
    eventStream.send(change);
  });
  app.listen(port, () => console.log(`Server running on port ${port}`))
})

app.get('/updates', sseStream.init);
app.get('/eventUpdates', eventStream.init);