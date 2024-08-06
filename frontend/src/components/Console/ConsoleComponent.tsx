
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
        <>
            {self.content}
        </>
    )
}

export default ConsoleComponent;