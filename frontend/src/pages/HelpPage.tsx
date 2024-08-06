import Navbar from "../components/TopNavBar.tsx";
import {Panel, PanelGroup} from "react-resizable-panels";
import '../styles/HelpPage.css'
import NewTab from "../assets/HelpPageScreenshots/NewTab.png"
import QueryEmpty from "../assets/HelpPageScreenshots/QueryEmpty.png"
import Query from "../assets/HelpPageScreenshots/Query.png"
import QueryWTranslate from "../assets/HelpPageScreenshots/Query+Translate.png"
import FullTranslation from "../assets/HelpPageScreenshots/FullTranslation.png"
import InsertingTab from "../assets/HelpPageScreenshots/InsertingTab.png"
import InsertingTabRight from "../assets/HelpPageScreenshots/InsertingTabRight.png"
import InsertingTabLeft from "../assets/HelpPageScreenshots/InsertingTabLeft.png"
import InsertingTabUp from "../assets/HelpPageScreenshots/InsertingTabUp.png"
import InsertingTabDown from "../assets/HelpPageScreenshots/InsertingTabDown.png"
import Inserting2Tabs from "../assets/HelpPageScreenshots/Inserting2Tabs.png"

const HelpPage = () => {
    return (
        <div>
            <div className="help-page">
                <Navbar/>

                <PanelGroup

                    direction={"horizontal"}
                >


                    <div className='sidebar'>
                        <a href="#Head" id="sidebar-header">Sections</a>
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


                    <Panel>
                        <PanelGroup
                            direction={"vertical"}
                        >


                            <div className='page-content'>
                                <div className="content-header" id="Head">

                                    <h1>Help Page</h1>
                                    <br></br><br></br><br></br>
                                    <p>Welcome to our Help Page. <br></br><br></br>This is where you can learn how to
                                        use our application to its fullest potential :)
                                        <br></br><br></br>
                                        Refer to our sections on the sidebar or scroll down and look through our
                                        tutorials</p>
                                    <br></br>

                                </div>
                                <div id="NewQuery" className="content-section">
                                    <h1>Create a new query</h1><br></br>
                                    <p>To create a new query, press the "New Query" button upon reaching the Translator
                                        page </p>
                                    <img src={NewTab} alt="Create New Query 1"></img>
                                    <br></br>
                                    <p>After that, a new tab where you can write your query will open. </p>
                                    <img src={QueryEmpty} alt="Create New Query 2"></img>
                                    <br></br>
                                </div>
                                <div id="Translating" className="content-section">
                                    <h1>Translating Queries</h1><br></br>
                                    <p>To translate a query, press the Translate button on the top right corner of your
                                        chosen tab. </p>
                                    <img src={Query} alt="Translating a Query 1"></img>
                                    <br></br>
                                    <p>A dropdown menu with the query languages available for translation will appear,
                                        and you can chose the one you want.</p>
                                    <img src={QueryWTranslate} alt="Translating a Query 2"></img>
                                    <br></br>
                                    <p>Two new windows will open, and you will be able to see the translated query with
                                        in-line comments, as well as a window explaining the translation</p>
                                    <img src={FullTranslation} alt="Translating a Query 3"></img>
                                    <br></br>
                                </div>
                                <div id="InsertingWindows" className="content-section">
                                    <h1>Inserting New Windows</h1><br></br>
                                    <p>To insert a new window, press the menu button (...) on the top right area of your
                                        window. </p>
                                    <img src={Query} alt="Query"></img>
                                    <br></br>
                                    <p>A dropdown menu with the options for inserting new windows will appear, and you
                                        may select how you would like to insert a new window</p>
                                    <img src={InsertingTab} alt="InsertingTab"></img>
                                    <br></br>
                                    <p>Inserting a window to the right will look like this:</p>
                                    <img src={InsertingTabRight} alt="Inserting New Window on right"></img>
                                    <br></br>
                                    <p>Inserting a window to the left will look like this:</p>
                                    <img src={InsertingTabLeft} alt="Inserting New Window on left"></img>
                                    <br></br>
                                    <p>Inserting a window up will look like this:</p>
                                    <img src={InsertingTabUp} alt="Inserting New Window up"></img>
                                    <br></br>
                                    <p>Finally, inserting a window down will look like this:</p>
                                    <img src={InsertingTabDown} alt="Inserting New Window down"></img>
                                    <br></br>
                                    <p>It is also possible to combine these options to insert multiple tabs</p>
                                    <img src={Inserting2Tabs} alt="Inserting2Tabs"></img>
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