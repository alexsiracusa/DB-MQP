import Navbar from '../components/TopNavBar.tsx';
import '../styles/HomePage.css'
import HeroSection from "./HomePageSections/HeroSection.tsx";
import QueriesSection from "./HomePageSections/QueriesSection.tsx";
import ReportSection from "./HomePageSections/ReportSection.tsx";
import TeamSection from "./HomePageSections/TeamSection.tsx";
import Footer from "../components/Footer.tsx";


const HomePage = () => {
    return (
        <div className='HomePage'>
            <Navbar></Navbar>
            <div className='sections'>
                <HeroSection/>
                <div className='gradient hero-queries'></div>
                <QueriesSection/>
                <div className='gradient queries-report'></div>
                <ReportSection/>
                <div className='gradient report-team'></div>
                <TeamSection/>

                <Footer/>
            </div>
        </div>
    );
}

export default HomePage;