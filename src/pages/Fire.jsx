import {useEffect, useState} from 'react';
import '../Fire.css';

const ROWS = 30;
const COLS = 30;
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
    console.log("-- rendering Fire --");
    const [grid, setGrid] = useState(
        Array.from({length:ROWS}, (_,r)=>Array.from({length:COLS}, (_,c)=>'.'))
    );
    const [running, setRunning] = useState(false);
    //for debugging:
    // useEffect(() => {
    //     console.log("grid changed:");
    //     printGrid(grid);
    // }, [grid]);
    function growTrees(numTrees){
        for(var i=0; i<numTrees; i++){
            var r = Math.floor(Math.random()*ROWS);
            var c = Math.floor(Math.random()*COLS);
            setGrid(oldgrid => {
                var newgrid = [...oldgrid];
                // newgrid[r] = [...oldgrid[r]]; //deep copy
                newgrid[r][c] = 't';
                // mutating inner array - might be bad
                return newgrid;
            });
            console.log(`placed tree at (${r},${c})`);
        }
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
        console.log(`lightning strike at (${r},${c})`);
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
                            console.log(`tree (${r},${c}) has fire neighbor, now burning :D`);
                        }
                    }
                }
            }
            // console.log("newgrid after prop:"); printGrid(newgrid);
            // console.log("oldgrid before committing:"); printGrid(oldgrid);
            return newgrid;
        });
    }
    function step(){
        growTrees(1);
        if(Math.random() < 0.1){ //10% of lightning strike
            lightning();
        }
        propagateFire();
    }
    useEffect(() => {
        const ival = setInterval(() => {
            if(running){
                console.log(`iteration ${iter}`);
                step();
                iter++;
            }
        }, 10);
        return () => clearInterval(ival);
    }, [running]);

    return (
        <>
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