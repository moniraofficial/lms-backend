// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { connectDB } = require('./config/db');

// const app = express();
// const PORT = process.env.PORT || 5000;




// app.use(cors());
// app.use(express.json());



// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });


// app.get('/', (req, res) => {
//   res.send('DataPollex LMS Backend is running with Native MongoDB!');
// });


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');


const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.get('/', (req, res) => {
  res.send('DataPollex LMS Backend is running with Native MongoDB!');
});