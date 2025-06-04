import express from 'express';
import sequelize from './db.js';
import SurveyModel from './models/Survey.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://127.0.0.1:5500', // replace with your frontend URL
  credentials: true
}));
app.use(express.json());

const Survey = SurveyModel(sequelize);

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync db:', err);
});

// Route to receive form submissions
app.post('/submit', async (req, res) => {
  try {
    const { fullName, email, dob, contact, favFoodsArr, radioAnswers } = req.body;

    const newSurvey = await Survey.create({
      fullName,
      email,
      dob,
      contact,
      favFoodsArr,
      radioAnswers
    });

    res.status(201).json({ message: 'Survey submitted successfully!', data: newSurvey });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

app.get('/surveys', async (req, res) => {
  try {
    const allSurveys = await Survey.findAll();
    res.status(200).json({ data: allSurveys });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve surveys', details: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});