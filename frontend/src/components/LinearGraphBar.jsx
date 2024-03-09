// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Plot from 'react-plotly.js';

// const useStyles = makeStyles((theme) => ({
//   graphContainer: {
//     width: '80%',
//     margin: 'auto',
//   },
// }));

// const LineGraphBar = ({ data }) => {
//   const classes = useStyles();

//   const customGraphNames = ['Apple', 'Amazon', 'Tesla', 'Coin', 'DKNG'];
//   const colorPalette = ['purple'];

//   return (
//     <div className={classes.graphContainer}>
//       <Plot
//         data={data.map((graph, index) => ({
//           x: graph.xValues,
//           y: graph.yValues,
//           type: 'bar', // Set the type to 'bar' for a bar graph
//           marker: { color: colorPalette[index % colorPalette.length] },
//           name: customGraphNames[index],
//         }))}
//         layout={{
//           title: 'Asset Allocation',
//           xaxis: { title: 'X-axis' },
//           yaxis: { title: 'Y-axis' },
//         }}
//       />
//     </div>
//   );
// };

// export default LineGraphBar;