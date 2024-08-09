import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import RunIcon from "../../../../../assets/Icons/RunIcon.svg"
import {useContext} from 'react';
import {ConsoleContext} from "../../../../../pages/TranslatorPage.tsx";

type RunButtonProps = {
    self: QueryTab
}

const RunButton = (props: RunButtonProps) => {
    const self = props.self;
    const queryConsole = useContext(ConsoleContext)

    function disabled(): boolean {
        return !self.isLoaded() || getDatabaseRoute() === null;
    }

    function getDatabaseRoute(): string | null {
        switch (self.language) {
            case "PL/pgSQL": {
                return "postgres"
            }
            case "Raw MQL": {
                return "mongodb"
            }
            default: {
                return null;
            }
        }
    }

    async function runCode() {
        const body = {
            query: self.query
        };

        const route = getDatabaseRoute()

        const response = await fetch(`http://localhost:8000/${route}/execute/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            credentials: 'include'
        })

        const result = await response.json()

        if (response.status === 200) {
            await queryConsole.append(JSON.stringify(result.result))
        }
        else {
            await queryConsole.append(result.error)
        }
    }

    return (
        <button
            className="run-button toolbar-button"
            title="Run"
            disabled={disabled()}
            onClick={runCode}
        >
            <img src={RunIcon}/>
        </button>
    )
}

export default RunButton;