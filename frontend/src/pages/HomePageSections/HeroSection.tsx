import React from "react";
import '../../styles/HomePage.css'
import dbOrange from "../../assets/HomePage/db_orange.png";
import dbWhite from "../../assets/HomePage/db_white.png";
import dbBlue from "../../assets/HomePage/db_blue.png";
import HomePageButton from "../../components/HomePageButton";

const HeroSection: React.FC = () => {


    return (
        <div className="hero">
            <div className="content">
                <div className="pb-10">
                    <h1 className="text-accP text-[80px] font-bold tracking-[.1em]">RELATIONAL REMODEL</h1>
                    <label className="text-txtP text-[25px] font-Raleway">A database query translator and evaluation <br></br> tool powered by AI</label>
                </div>

                <div className="flex justify-center max-w-3xl mx-auto items-center gap-9 cursor-pointer group">
                    <div className="pr-3 group/img1 flex flex-col justify-center items-center group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 group-hover:translate-x-[-20%] hover:!-translate-x-[30%]">
                        <HomePageButton bgColor="[#151720]" buttonName="Develop Queries" />
                        <img src={dbBlue} alt="blue database" className="pt-3 hover:scale-105 duration-500 animate-pulse-slow group-hover/img1:animate-none" />
                        <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-md opacity-0 group-hover/img1:opacity-100 transition-opacity duration-500 z-40">
                            <p>Info for Translate Database</p>
                        </div>
                    </div>

                    <div className="pl-3 pr-3 group/img2 flex flex-col justify-center items-center group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] group-hover/test1:translate-x-[20%] hover:!scale-100 duration-500 group-hover:-translate-x-[-20%] hover:!-translate-x-[30%]">
                        <HomePageButton bgColor="accT" buttonName="Run Code" />
                        <img src={dbOrange} alt="orange database" className="pt-3 hover:scale-105 duration-500 animate-pulse-slow group-hover/img2:animate-none" />
                        <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-md opacity-0 group-hover/img2:opacity-100 transition-opacity duration-500 z-40">
                            <p>Info for Run Code</p>
                        </div>
                    </div>

                    <div className="pl-3 group/img3 flex flex-col justify-center items-center group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] group-hover/test1:translate-x-[20%] hover:!scale-100 duration-500 relative group-hover:-translate-x-[-20%] hover:!-translate-x-[30%]">
                        <HomePageButton textCol="black" bgColor="white" buttonName="Settings" />
                        <img src={dbWhite} alt="white database" className="pt-3 hover:scale-105 duration-500 animate-pulse-slow group-hover/img3:animate-none" />
                        <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-md opacity-0 group-hover/img3:opacity-100 transition-opacity duration-500 z-40">
                            <p>Info for Read Documentation</p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default HeroSection;