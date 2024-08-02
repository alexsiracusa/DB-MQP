import Navbar from "../components/Navbar.tsx";
import {Panel, PanelGroup} from "react-resizable-panels";
import '../styles/Gutters.css';
import '../styles/HelpPage.css'
import NewQuery1 from "../assets/HelpPageScreenshots/NewQuery1.png"
import NewQuery2 from "../assets/HelpPageScreenshots/NewQuery2.png"
import Translating1 from "../assets/HelpPageScreenshots/Translating1.png"
import Translating2 from "../assets/HelpPageScreenshots/Translating2.png"
import Translating3 from "../assets/HelpPageScreenshots/Translating3.png"
import InsertingTab1 from "../assets/HelpPageScreenshots/InsertingTab1.png"
import InsertingTab2 from "../assets/HelpPageScreenshots/InsertingTab2.png"

const HelpPage = () => {
    return (
        <div>
            <div className="help-page">
                <Navbar></Navbar>
                
                <PanelGroup
                className="page-content"
                direction={"horizontal"}
            >
                <Panel
                    defaultSize={15}
                >
                    <div className='sidebar'>
                        <div className="content-section">
                        <h1>Sections</h1>
                        </div>
                        <a href="#NewQuery">
                            Create a new query
                        </a>
                        <a href="#Translating">
                            Translating queries
                        </a>
                        <a href="#InsertingWindows">
                            Inserting New Windows
                        </a>
                    </div>
                    
                </Panel>


                <Panel>
                    <PanelGroup
                        className="help-content"
                        direction={"vertical"}
                    >
                        

                        
                            <div className='page-content'>
                                <div className="content-header">
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                    <h1>Help Page</h1> 
                                    <br></br><br></br><br></br>
                                    <p>Welcome to our Help Page. <br></br><br></br>This is where you can learn how to use our application to its fullest potential :)
                                    <br></br><br></br>
                                    Refer to our Sections on the sidebar or scroll down and look through our tutorials</p>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </div>
                                <div id="NewQuery" className="content-section">
                                    <h1>Create a new query</h1><br></br>
                                    <p>To create a new query, press the "New Query" button upon reaching the Translator page </p>
                                    <img src={NewQuery1} alt="Create New Query 1"></img>
                                    <br></br>
                                    <p>After that, a new tab where you can write your query will open. </p>
                                    <img src={NewQuery2} alt="Create New Query 2"></img>
                                    <br></br>
                                </div>
                                <div id="Translating" className="content-section">
                                    <h1>Translating Queries</h1><br></br>
                                    <p>To translate a query, press the Translate button on the top right corner of your chosen tab. </p>
                                    <img src={Translating1} alt="Translating a Query 1"></img>
                                    <br></br>
                                    <p>A dropdown menu with the query languages available for translation will appear, and you can chose the one you want.</p>
                                    <img src={Translating2} alt="Translating a Query 2"></img>
                                    <br></br>
                                    <p>Two new windows will open, and you will be able to see the translated query with in-line comments, as well as a window explaining the translation</p>
                                    <img src={Translating3} alt="Translating a Query 3"></img>
                                    <br></br>
                                </div>
                                <div id="InsertingWindows" className="content-section">
                                    <h1>Inserting New Windows</h1><br></br>
                                    <p>To insert a new window, press the menu button on the top right area of your window. </p>
                                    <img src={InsertingTab1} alt="Inserting New Window 1"></img>
                                    <br></br>
                                    <p>A dropdown menu with the options for inserting new windows will appear, and you may select how you would like to insert a new window</p>
                                    <img src={InsertingTab2} alt="Inserting New Window 2"></img>
                                    <br></br>
                                </div>
                            

                            </div>
                        
                    </PanelGroup>
                </Panel>

            </PanelGroup>
            </div>
                
          

        </div>
    );
}

export default HelpPage;