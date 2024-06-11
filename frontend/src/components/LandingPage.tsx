import Navbar from './Navbar';


const LandingPage = () => {
    return (
        <div className='LandingPage'>
        <Navbar></Navbar>
        <div>
            <h1 className="text-red-500">This is the landing page!</h1>
        </div>
        </div>
    );
}

export default LandingPage;