import '.././styles/TranslatorMockup.css'
import Navbar from '../components/Navbar.tsx'
import React from "react";

const TranslatorMockup: React.FC = () => {

    return (
        <div className='translator-page'>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <Navbar/>
            <div className='page-content'>
                <div className='sidebar'>
                    <text>sidebar</text>
                </div>
                <div className='code-content'>

                    <div className='tab-container'>
                        <div className='tab-content'>
                            <text>tab1</text>
                        </div>
                        <div className='tab-content'>
                            <text>tab2</text>
                        </div>
                    </div>

                    <div className='console'>
                        <text>console</text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TranslatorMockup;
