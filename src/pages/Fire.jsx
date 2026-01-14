import {useEffect, useState, useRef} from 'react';
import '../Fire.css';

const ROWS = 50;
const COLS = 50;
const COLORS = {
    '.': '#ccc',
    't': '#0c0',
    'f': '#c00',
}
var iter = 0;

function printGrid(grid){
    grid.forEach((row)=>{
        console.log(row.join(''));
    });
}

function Fire(){
    // console.log("-- rendering Fire --");
    const [grid, setGrid] = useState(
        Array.from({length:ROWS}, (_,r)=>Array.from({length:COLS}, (_,c)=>'.'))
    );
    const [running, setRunning] = useState(false);
    const [treesRate, setTreesRate] = useState(1);
    const [timeIval, setTimeIval] = useState(100);
    const [lightningProb, setLightningProb] = useState(0.1);
    //for debugging:
    // useEffect(() => {
    //     console.log("grid changed:");
    //     printGrid(grid);
    // }, [grid]);
    function growTrees(numTrees){
        console.log(`growing ${numTrees} trees...`);
        setGrid(oldgrid => {
            var newgrid = [...oldgrid];
            for(var i=0; i<numTrees; i++){
                var r = Math.floor(Math.random()*ROWS);
                var c = Math.floor(Math.random()*COLS);
                
                // newgrid[r] = [...oldgrid[r]]; //deep copy
                newgrid[r][c] = 't';
                // mutating inner array - might be bad
                // console.log(`placed tree ${i} at (${r},${c})`);
            }
            return newgrid;
        });
    }
    function lightning(){
        var r = Math.floor(Math.random()*ROWS);
        var c = Math.floor(Math.random()*COLS);
        setGrid(oldgrid => {
            var newgrid = [...oldgrid];
            newgrid[r] = [...oldgrid[r]]; //deep copy
            newgrid[r][c] = 'f';
            return newgrid;
        });
        console.log(`**lightning strike at (${r},${c})`);
    }
    function propagateFire(){
        console.log("spreading fire");
        setGrid((oldgrid) => {
            // console.log("before:"); printGrid(oldgrid);
            var newgrid = [...oldgrid];
            for(var r=0; r<ROWS; r++){
                newgrid[r] = [...oldgrid[r]]; //deep copy
                // console.log(newgrid[r]);
                for(var c=0; c<COLS; c++){
                    if(oldgrid[r][c] == 't'){
                        //check neighbors
                        if((r-1>=0 && oldgrid[r-1][c]=='f') || 
                            (r+1<ROWS && oldgrid[r+1][c]=='f') || 
                            (c-1>=0 && oldgrid[r][c-1]=='f') || 
                            (c+1<COLS && oldgrid[r][c+1]=='f')
                            ){
                            newgrid[r][c] = 'f';
                            // console.log(`tree (${r},${c}) has fire neighbor, now burning :D`);
                        }
                    }
                    else if(oldgrid[r][c] == 'f'){
                        newgrid[r][c] = '.';
                    }
                }
            }
            // console.log("newgrid after prop:"); printGrid(newgrid);
            // console.log("oldgrid before committing:"); printGrid(oldgrid);
            return newgrid;
        });
    }
    function step(){
        growTrees(treesRate);
        if(Math.random() < lightningProb){ //10% of lightning strike
            lightning();
        }
        propagateFire();
    }
    useEffect(() => {
        console.log(`smth changed, re-making interval 
            (running:${running}, time:${timeIval}, lightningProb:${lightningProb})`);
        const ival = setInterval(() => {
            if(running){
                console.log(`iteration ${iter}`);
                step();
                iter++;
            }
        }, timeIval);
        return () => clearInterval(ival);
    }, [running, treesRate, timeIval, lightningProb]);

    const timeRef = useRef(null);
    return (
        <>
        <label>Trees growth rate: </label>
        <input 
            type="range"
            min='0'
            max='100'
            value={treesRate}
            onChange={(ev) => {setTreesRate(ev.target.value);}} />
        {treesRate}
        <br/>

        <label>Time between iters (ms): </label>
        <input type="number"
            min='10'
            max='1000'
            step='10'
            ref={timeRef}
            defaultValue='100'
        />
        <button onClick={() => {setTimeIval(timeRef.current.value);}}>
            Apply</button>
        <br/>

        <label>Lightning probability:</label>
        <input type="range"
            min='0'
            max='1'
            step='0.01'
            value={lightningProb}
            onChange={(ev) => {setLightningProb(ev.target.value);}} />
        {lightningProb}
        <br/>

        <button
            onClick={() => { lightning(); } }>
            Be Zeus and send a random lightning strike</button>

        <table>
            <tbody>
            {grid.map(row => (
                <tr>
                {row.map((cell) => {
                    const col = COLORS[cell];
                    // console.log(`color: ${col}`);
                    return <td className="grid-cell" style={{backgroundColor: col}}> </td>;
                })}
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={step}>Step</button>
        <button onClick={() => {setRunning(!running);}}>{running? 'Stop' : 'Go'}</button>
        </>
    );
}
export default Fire;