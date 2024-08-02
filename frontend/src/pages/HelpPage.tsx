import Navbar from "../components/Navbar.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import '../styles/Gutters.css';
import '../styles/HelpPage.css'
import NewQuery1 from "../assets/HelpPageScreenshots/NewQuery1.png"


const HelpPage = () => {
    return (
        <>
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
                        <div className="content-header">
                        Sections
                        </div>
                        <a href="#NewQuery">
                            Create a new query
                        </a>
                        <a href="#Translating">
                            Translating queries
                        </a>
                    </div>
                    
                </Panel>

                <PanelResizeHandle className={"gutter gutter-horizontal"}/>

                <Panel>
                    <PanelGroup
                        className="help-content"
                        direction={"vertical"}
                    >
                        

                        <PanelResizeHandle className={"gutter gutter-vertical"}/>

                        <Panel>
                            <div className='content'>
                                <div className="content-header">
                                    Help Page <br></br><br></br>
                                </div>
                                <div id="NewQuery" className="content-section">
                                    <h1>Create a new query</h1><br></br>
                                    <p>To create a new query, press the "New Query" button upon reaching the Translator page </p>
                                    <img src={NewQuery1} alt="Create New Query"></img>
                                    <br></br>
                                </div>
                                <div id="Translating" className="content-section">
                                    <h1>Translating Queries</h1><br></br>
                                    <p>To translate a query, press the  </p>
                                    <img src={NewQuery1} alt="Create New Query"></img>
                                </div>

                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>

            </PanelGroup>
            </div>
                
          

        </>
    );
}

export default HelpPage;