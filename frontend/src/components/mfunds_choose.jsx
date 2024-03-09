import React from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import axios from 'axios'; // Import Axios

function Funds({ funds }) {

  // Function to handle adding a stock
  const handleAddFund = async (fund) => {
    try {
      // Replace 'userId' with the actual user ID
      const username = 'darshini'; 
      
      // Make a POST request to the backend
      await axios.post('http://localhost:5000/addfund/addFund', {
        username,
        assetname: fund.name,
        value: fund.faceValue
      });

      // Handle success (optional)
      alert('Fund added successfully!');
    } catch (error) {
      // Handle error (optional)
      console.error('Error adding fund:', error);
      alert('Failed to add fund');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {funds.map((fund, index) => (
        <div key={index} className="relative bg-white shadow-md rounded-lg p-2">
          <h2 className="text-lg font-bold mb-2">{fund.name}</h2>
          <div className="absolute top-0 right-0">
            <AddCircleRoundedIcon
              className="m-2 text-violet hover:text-violet/60 cursor-pointer"
              onClick={() => handleAddFund(fund)}
            />
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Face Value:</span> {fund.faceValue}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Industry:</span> {fund.industry}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Sector:</span> {fund.sector}
          </p>
        </div>
      ))}
    </div>
  );
}


const funds = [
  {
    name: "Nippon India ETF Nifty 1D Rate Liquid BeES",
    faceValue: 1000,

  },
  {
    name: "TRUSTMF Fixed Maturity Plan Series II (1196 - Direct Plan--Growth",
    faceValue: 1000,

  },
  {
    name: "DSP NIFTY 1D Rate Liquid ETF",
    faceValue: 1000,

  },
  {
    name: "ICICI Prudential S&P BSE Liquid Rate ETF",
    faceValue: 1000,

  },
  {
    name: "Aditya Birla Sun Life CRISIL Liquid Overnight ETF",
    faceValue: 1000,

  },
  {
    name: "Bharat Bond ETF - April 2030",
    faceValue: 1000,

  },
  {
    name: "Zerodha Nifty 1D Rate Liquid ETF",
    faceValue: 100,

  },
  {
    name: "HDFC FMP 1861D MARCH 2022 (1) - SERIES 46- Direct Option- Growth Option",
    faceValue: 10,

  },
  {
    name: "Mirae Asset Nifty 8-13 Yr G-Sec ETF",
    faceValue: 10,

  },
  {
    name: "Axis Fixed Term Plan - Series 112 (1143 Days) - Direct Plan - Growth Option",
    faceValue: 10,

  },
];

function App() {
  return (
    <div className="App">
      <Funds funds={funds} />
    </div>
  );
}

export default App;