const express = require('express');
const cors = require('cors');
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

const calccsvRouter = require('./calccv');
app.use("/calccsv", calccsvRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});