import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://mahemud:mahemud@cluster0.y3zrjtm.mongodb.net/luxurystore'; // Replace with your MongoDB Atlas URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err));

// Define Mongoose Schema and Model
const DataSchema = new mongoose.Schema({
    vlabel: String,
    vlink: String,
    postedby: String,
});


const DataModel = mongoose.model('Data', DataSchema, 'videodetail');

// API Route to Add Data
app.post('/add-data', async (req, res) => {
    const { vlabel, vlink, postedby } = req.body;
    // console.log({ vlabel, vlink, postedby } )
    try {
        const newData = new DataModel({ vlabel, vlink, postedby });
        await newData.save();
        res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding data', error });
    }
});

app.get('/get-data', async (req, res) => {
    try {
        const data = await DataModel.find(); // Retrieve all documents from the 'videodetail' collection
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

// 
app.delete('/delete-data', async (req, res) => {
    const { vlabel } = req.body;
    try {
        const data = await DataModel.findOneAndDelete({ vlabel: vlabel });
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        return res.status(200).json({ message: 'Data deleted successfully', data });
    } catch (error) {
        return res.status(500).json({ message: 'Error while deleting data', error });
    }
});

// API Route to Get Data by Label
app.get('/search-data', async (req, res) => {
    const { vlabel } = req.query;
    if (!vlabel) {
        return res.status(400).json({ message: 'vlabel query parameter is required' });
    }
    try {
        const data = await DataModel.find({ vlabel: { $regex: vlabel, $options: 'i' } });
        if (data.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
    }
});


app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend at port 3000
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
