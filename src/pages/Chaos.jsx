import '../App.css';
import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';
import { Line, Scatter } from 'react-chartjs-2';
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

const R_STEP = 0.01;
const options = {
  scales: {
    y: {
      min: 0,
      max: 1,
      title: { display: true, text: 'Value' }
    }
  }
};
function Chaos() {
    const [R, setR] = useState(1);
    const [initx, setInitx] = useState(0.5);
    const [seq, setSeq] = useState({
        datasets: [
            {
                label: 'Line Dataset',
                data: [{x:1, y:2}, {x:2, y:3}, {x:3, y:1}],
                backgroundColor: 'rgba(75,192,192,1)',
            },
        ],
    });
    const [data, setData] = useState({
        datasets: [
            {
                label: 'Tail Dataset',
                data: [],
                backgroundColor: 'rgba(255,99,132,1)',
            }
        ],
    });
    useEffect(() => {
        compute(R, initx, data, setSeq, setData);
    }, [R, initx]);
    return (
    <div className="App">
        <Link to="/">Back home</Link>
        <header className="App-header">
            <h2>Logistic Progression</h2>
            <p>X<sub>n+1</sub> = R * X<sub>n</sub> * (1 - X<sub>n</sub>)</p>
        </header>
        <div style={{ margin: '20px 0' }}>
            <label htmlFor="slider">R: {R.toFixed(2)}</label>
            <input
                id="slider" type="range"
                min="1" max="4" step={R_STEP}
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px' }}>
            <div style={{ width: '40%' }}>
                <Line data={seq} options={options}/>
            </div>
            <div style={{ width: '60%' }}>
                <Scatter data={data} options={{}}/>
                <p>Num points: {data.datasets[0].data.length}</p>
            </div>
        </div>
    </div>
    );
}



function compute(r, start, data, setterSeq, setterData){
    // alert(`compute called with r = ${r}`);
    const N = 150;
    var nums = [start];
    for (let i = 1; i < N; i++) {
        nums.push(r * nums[i-1] * (1 - nums[i-1]));
    }
    var points = data.datasets[0].data;
    for(let i = N-10; i < N; i++){
        points.push({x: r, y: nums[i]});
    }
    setterSeq({
        labels: [...Array(nums.length).keys()],
        datasets: [
            {
                label: 'X(n+1) = R * X(n) * (1 - X(n))',
                data: nums,
                backgroundColor: 'rgba(75,192,192,1)',
            },
        ],
    });
    setterData({
        datasets: [
            {
                label: 'Tail Dataset',
                data: points,
                backgroundColor: 'rgba(255,99,132,1)',
            }
        ],
    });
    return nums;
}

export default Chaos;
