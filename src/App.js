import './App.css';
import {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

const options = {
  scales: {
    y: {
      min: 0,
      max: 1,
      title: { display: true, text: 'Value' }
    }
  }
};
function App() {
	const [R, setR] = useState(0);
	const [initx, setInitx] = useState(0.5);
	const [data, setData] = useState({
		datasets: [
			{
				label: 'Scatter Dataset',
				data: [{x:1, y:2}, {x:2, y:3}, {x:3, y:1}],
				backgroundColor: 'rgba(75,192,192,1)',
			},
		],
	});
	useEffect(() => {
		compute(R, initx, setData);
	}, [R, initx]);
	return (
	<div className="App">
		<header className="App-header">
			<h2>Logistic Progression</h2>
			<p>X<sub>n+1</sub> = R * X<sub>n</sub> * (1 - X<sub>n</sub>)</p>
		</header>
		<div style={{ margin: '20px 0' }}>
			<label htmlFor="slider">R: {R.toFixed(2)}</label>
			<input
				id="slider" type="range"
				min="0" max="4" step="0.05"
				value={R}
				onChange={e => {
					const newR = Number(e.target.value);
					setR(newR);
				}}
				style={{ width: '500px', marginLeft: '10px' }}
			/>
			<br></br>
			<label htmlFor="x-slider">Start x: {initx}</label>
			<input
				id="x-slider" type="range"
				min="0" max="1" step="0.05"
				value={initx}
				onChange={e => {
					const newInitx = Number(e.target.value);
					setInitx(newInitx);
				}}
				style={{ width: '300px', marginLeft: '10px' }}
			/>
		</div>
		<Line data={data} options={options}/>
	</div>
	);
}



function compute(r, start, setter){
	// alert(`compute called with r = ${r}`);
	var nums = [start];
	for (let i = 1; i < 50; i++) {
		nums.push(r * nums[i-1] * (1 - nums[i-1]));
	}
	// var newData = [];
	// for (let i = 0; i < nums.length; i++) {
	// 	newData.push({x: i, y: nums[i]});
	// }
	setter({
		labels: [...Array(nums.length).keys()],
		datasets: [
			{
				label: 'X(n+1) = R * X(n) * (1 - X(n))',
				data: nums,
				backgroundColor: 'rgba(75,192,192,1)',
			},
		],
	});
	return nums;
}

export default App;
