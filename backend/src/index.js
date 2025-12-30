const express = require("express");
const cors = require("cors");

const rankRoutes = require("./api/rank");
const searchRoutes = require("./api/search");
const trendingRoutes = require("./api/trending");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EXPRESS OK");
});

app.use("/rank", rankRoutes);
app.use("/search", searchRoutes);
app.use("/trending", trendingRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});
