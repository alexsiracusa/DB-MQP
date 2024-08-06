import "../../styles/Console.css"

import Console from "./Console.tsx";
import {updateState, useStateCallback} from "../../useStateCallback.tsx";

type ConsoleComponentProps = {
    self: Console
}

function ConsoleComponent(props: ConsoleComponentProps) {
    const self = props.self
    const [, setState] = useStateCallback({});
    self.forceUpdate = updateState(setState);

    return (
        <div className="query-console">
            {self.content}
        </div>
    )
}

export default ConsoleComponent;