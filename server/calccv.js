const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvtojson = require('csvtojson');

const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Convert CSV to JSON
    const jsonArray = await csvtojson().fromFile(filePath);

    // Calculate sums
    const sumBonds = jsonArray.reduce((acc, row) => acc + parseFloat(row['price_invested_ bond_name'] || 0), 0);
    const sumEquity = jsonArray.reduce((acc, row) => acc + parseFloat(row['price_inevested_equity'] || 0), 0);
    const sumMutualFunds = jsonArray.reduce((acc, row) => acc + parseFloat(row['price_invested_mf'] || 0), 0);

    // Send sums to frontend
    res.json({
      sumBonds,
      sumEquity,
      sumMutualFunds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;