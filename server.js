const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/rsvp", require("./routes/rsvpRoutes"));

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const memoryRoutes = require('./routes/memoryRoutes');
app.use('/api/memories', memoryRoutes);

const birthdayWishRoutes = require('./routes/birthdayWishRoutes');
app.use('/api/birthday-wishes', birthdayWishRoutes);

// app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));