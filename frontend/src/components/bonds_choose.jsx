import React from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import axios from 'axios'; // Import Axios

function Bonds({ bond }) {

  // Function to handle adding a stock
  const handleAddBond = async (bond) => {
    try {
      // Replace 'userId' with the actual user ID
      const username = 'awani'; 
      
      // Make a POST request to the backend
      await axios.post('http://localhost:5000/addbonds/addBond', {
        username,
        assetname: bond.name,
        value: bond.faceValue
      });

      // Handle success (optional)
      alert('Bond added successfully!');
    } catch (error) {
      // Handle error (optional)
      console.error('Error adding bond:', error);
      alert('Failed to add bond');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {bonds.map((bond, index) => (
        <div key={index} className="relative bg-white shadow-md rounded-lg p-2">
          <h2 className="text-lg font-bold mb-2">{bond.name}</h2>
          <div className="absolute top-0 right-0">
            <AddCircleRoundedIcon
              className="m-2 text-violet hover:text-violet/60 cursor-pointer"
              onClick={() => handleAddBond(bond)}
            />
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Face Value:</span> {bond.faceValue}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Industry:</span> {bond.industry}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Sector:</span> {bond.sector}
          </p>
        </div>
      ))}
    </div>
  );
}


const bonds = [
  {
    name: "LIQUID GOLD SERIES 7",
    faceValue: 30833421.21,

  },
  {
    name: "SANSAR TRUST JAN 2022",
    faceValue: "10000000",

  },
  {
    name: "JFC FINANCE (INDIA) Ltd",
    faceValue: "10000000",
  },
  {
    name: "INDIGO 023",
    faceValue: "10000000",
  },
  {
    name: "SATIN HOUSING FINANCE Ltd",
    faceValue: "10000000",
  },
  {
    name: "FBRT-ZC-1-4-24-PTC",
    faceValue: "10000000",
  },
  {
    name: "FINQUEST FINANCIAL SOLUTIONS Pvt Ltd",
    faceValue: "10000000",
  },
  {
    name: "Sansar Trust Dec 2021 III",
    faceValue: "10000000",
  },
  {
    name: "INDIGO 002",
    faceValue: "10000000",
  },
  {
    name: "INDIGO 001",
    faceValue: "10000000",
  },
];

function App() {
  return (
    <div className="App">
      <Bonds bonds={bonds} />
    </div>
  );
}

export default App;