import React, { useState } from 'react';
// import Navbar from '../../components/Navbar';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
// import Comparison from './Comparison.gif';
// import Illustration from './Illustration.gif';
import { VscGraphLine } from "react-icons/vsc";
import { RiFundsBoxFill } from "react-icons/ri";
import { MdGpsFixed } from "react-icons/md";
import Stocks from './stocks_choose';
import Funds from './mfunds_choose';
import Bonds from './bonds_choose';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Optimization from './Optimization.gif'
// import Illustration0 from './Illustration0.gif'
// import LineGraphBar from './LinearGraphBar';


ChartJS.register(ArcElement, Tooltip, Legend)

function MyPortfolio() {
    const [file, setFile] = useState(null);
    const [sums, setSums] = useState(null);
    const [number, setNumber] = useState('');

    const handleInputChange = (event) => {
        setNumber(event.target.value);
    };

    const handleSubmit = () => {
        // You can use the 'number' variable here for further processing
        console.log('The entered number is:', number);
        if (parseInt(number) < 200) {
            console.log('Number is less than 200');
            alert('Stop Loss Reached!!!!'); // Display an alert on the screen
        }

    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please choose a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/calccsv/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSums(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const toggleStocksData = () => {
        setShowStocksData(!showStocksData);
    };

    const toggleMFundsData = () => {
        setShowMFundsData(!showMFundsData);
    };

    const toggleBondsData = () => {
        setShowBondsData(!showBondsData);
    };


    const totalStocks = sums ? parseInt(sums.sumBonds) : 0;
    const totalMutualFunds = sums ? parseInt(sums.sumEquity) : 0;
    const totalBonds = sums ? parseInt(sums.sumMutualFunds) : 0;

    const graphDataBar = [
        { xValues: ['BND', 'TLT', 'VTI'], yValues: [0.4, 0.2, 0.4] },
    ];

    const data = {
        labels: ['Stocks', 'Mutual Funds', 'Bonds'],
        datasets: [
            {
                label: 'Amount in Rs',
                data: [totalStocks, totalMutualFunds, totalBonds],
                backgroundColor: [
                    'rgba(23,26,38,1)',
                    'rgba(61,54,89,1)',
                    'rgba(134,132,191,1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const [showProgress, setshowProgress] = useState(false);

    const handleProgressClick = () => {
        setshowProgress(true);
        setshowComp(false);
        setshowOpti(false);
    };

    const [showComp, setshowComp] = useState(false);

    const handleClickComp = () => {
        setshowComp(true);
        setshowProgress(false);
        setshowOpti(false);
    };

    const [showOpti, setshowOpti] = useState(false);

    const handleClickOpti = () => {
        setshowOpti(true);
        setshowComp(false);
        setshowProgress(false);
    };

    return (
        <div className="MyPortfolio">
            <div className="flex justify-between items-end">
                <h1 className="text-2xl font-bold mt-10 ml-10">My Portfolio</h1>
                <div>
                    <div style={{ position: 'relative' }}>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload</button>

                    </div>
                </div>
            </div>
            <div className='shadow-md grid grid-cols-3 place-items-center border m-10 shadow-gray-800 text-gray-800 bg-white p-6 rounded-lg transition duration-300 ease-in-out hover:border hover:shadow-gray-800'>
                <div className='grid col-span-2 w-full'>
                    <div className='grid grid-cols-2 p-3 m-2 bg-gray-200 rounded-lg '>
                        <h1 className='text-lg font-bold text-[#3D3659]'>Stocks</h1>
                        <h3 className='text-md text-[#8684BF] font-bold'>Rs.{totalStocks}</h3>
                    </div>
                    <div className='grid grid-cols-2 p-3 m-2 bg-gray-200 rounded-lg'>
                        <h1 className='text-lg font-bold text-[#3D3659]'>Mutual Funds</h1>
                        <h3 className='text-md text-[#8684BF] font-bold'>Rs.{totalMutualFunds}</h3>
                    </div>
                    <div className='grid grid-cols-2 p-3 m-2 bg-gray-200 rounded-lg'>
                        <h1 className='text-lg font-bold text-[#3D3659]'>Bonds</h1>
                        <h3 className='text-md text-[#8684BF] font-bold'>Rs.{totalBonds}</h3>
                    </div>
                </div>
                <div className='flex justify-center items-center w-2/3'>
                    <Doughnut data={data} />
                </div>
            </div>
            <div className="flex justify-center p-10 mt-16 mx-10 gap-16">
                <motion.div
                    className="relative w-1/3 h-60 bg-cover bg-center flex items-center justify-center rounded-xl"
                    style={{ backgroundImage: `url(${Optimization})` }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleClickOpti}
                >
                    <h2 className="text-white text-2xl font-bold z-10">Asset Distribution Recommender</h2>
                    <div className="absolute inset-0 bg-black opacity-50 z-0 rounded-xl"></div>
                </motion.div>
            </div>
            {/* {showOpti &&
                <div className='grid grid-cols-2 m-10 place-items-center border-2'>
                    <LineGraphBar data={graphDataBar} className='w-1/2 border p-5' />
                    <div className='border-2 p-12 bg-lavendar rounded-lg shadow-md border shadow-gray-800' >
                        <h1 className='text-2xl '>Expected Annual Return </h1>
                        <p className='text-3xl font-bold p-2'>0.0461</p>
                        <h1 className='text-2xl'>Expected Volatility </h1>
                        <p className='text-3xl font-bold p-2'>0.1040</p>
                        <h1 className='text-2xl'>Sharp Ratio </h1>
                        <p className='text-3xl font-bold p-2'>0.3473</p>
                    </div>
                </div>} */}

        </div>
    );
}

export default MyPortfolio;