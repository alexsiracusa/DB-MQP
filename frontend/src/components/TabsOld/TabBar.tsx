// import {TabWindow} from "./TabWindow.tsx";
//
// type TabBarProps = {
//     window: TabWindow
// }
//
// function TabBar(props: TabBarProps) {
//
//     function addLeft() {
//         props.window.add("horizontal", "before")
//     }
//
//     function addRight() {
//         props.window.add("horizontal", "after")
//     }
//
//     function addUp() {
//         props.window.add("vertical", "before")
//     }
//
//     function addDown() {
//         props.window.add("vertical", "after")
//     }
//
//     return (
//         <div>
//             <button onClick={addLeft}>
//                 Add Left
//             </button>
//             <button onClick={addRight}>
//                 Add Right
//             </button>
//             <button onClick={addUp}>
//                 Add Up
//             </button>
//             <button onClick={addDown}>
//                 Add Down
//             </button>
//         </div>
//     );
// }
//
// export default TabBar;