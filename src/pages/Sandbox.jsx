//to test random stuff
import {useEffect, useState} from 'react';
function Sandbox(){

    // stale state closure
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    useEffect(() => {
        const ival = setInterval(() => {
            console.log('hi');
            setA(a+1);
            setB(b => b+1);
        }, 1000);
        return () => clearInterval(ival);
    });

    return <>
        <p>a: {a}</p>
        <p>b: {b}</p>
    </>
}

export default Sandbox;