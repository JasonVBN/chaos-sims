import { Link } from "react-router-dom";

function Home(){
    return (
    <>
            <h1>Home</h1>
            <Link to="/chaos">Chaos</Link>
            <br/>
            <Link to="/fire">Fire simulation</Link>
    </>
    );
}

export default Home;