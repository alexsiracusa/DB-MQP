import React, { useState } from "react";
import '../../styles/HomePage.css'
import dbOrange from "../../assets/HomePage/db_orange.png";
import dbWhite from "../../assets/HomePage/db_white.png";
import dbBlue from "../../assets/HomePage/db_blue.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {

    // const [mouseEnter, setMouseEnter] = useState(false);

    // const handleHover = () => {
    //     mouseEnter ? setMouseEnter(false) : setMouseEnter(true);
    // }

    //const hoverDbBlue 
    //group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 group-hover:translate-x-[-20%] hover:!-translate-x-[30%]

    return (
        <div className="hero">
            <div className="content">
                <div className="pb-10">
                    <h1 className="text-accP text-[80px] font-bold tracking-[.1em]">RELATIONAL REMODEL</h1>
                    <label className="text-txtP text-[25px] font-Raleway">A database query translator and evaluation <br></br> tool powered by AI</label>
                </div>
                <div className="flex justify-center max-w-3xl mx-auto items-center gap-9 cursor-pointer group">

                    <div className="pr-3 group/img1 flex flex-col justify-center items-center">
                        <div className="group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500">
                            <Link to="/translator">
                                <Button className={`bg-[#151720] w-3/4 font-Inter font-bold text-sm text-white hover:scale-105 duration-500 rounded-full`}>Develop Queries</Button>
                            </Link>
                            <img src={dbBlue} alt="blue database" className="pt-4 hover:scale-105 duration-500" />
                        </div>
                    </div>

                    <div className="pl-3 pr-3 group/img2 flex flex-col justify-center items-center">
                        <div className="group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500">
                            <Link to="/translator">
                                <Button className={`bg-accT w-3/4 font-Inter font-bold text-sm text-white hover:scale-105 duration-500 rounded-full`}>Run Code</Button>
                            </Link>
                            <img src={dbOrange} alt="orange database" className="pt-4 hover:scale-105 duration-500" />
                        </div>
                    </div>

                    <div className="pl-3 group/img3 flex flex-col justify-center items-center">
                        <div className="group-hover:blur-[2px] hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500">
                            <Button className={`bg-white w-3/4 font-Inter font-bold text-sm text-black hover:scale-105 duration-500 rounded-full`}>Settings</Button>
                            <img src={dbWhite} alt="white database" className="pt-4 hover:scale-110 duration-500" />
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default HeroSection;