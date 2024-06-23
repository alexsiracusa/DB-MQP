// import TabBar from "./TabBar.tsx";
// import {TabObject} from "./TabObject.tsx";
// import {TabGroup} from "./TabGroup.tsx";
//
//
// export class TabWindow extends TabObject {
//
//     render(): JSX.Element {
//         return (
//             <div className={"tab-content"}>
//                 <TabBar
//                     window={this}
//                 ></TabBar>
//             </div>
//         )
//     }
//
//     add(direction: string, placement: string): TabObject | null {
//         if (this.props.parent === null || this.props.parent.state.direction != direction) {
//             const tab = new TabWindow({parent: this.props.parent, add: this.props.add});
//             // turn self into TabGroup
//             if (placement === "after") {
//                 return new TabGroup(this.props.parent, [this, tab], direction);
//             } else {
//                 return new TabGroup(this.props.parent, [tab, this], direction);
//             }
//         } else {
//             // add to parent group
//             // this.props.parent.add(tab, this, direction, placement)
//             this.props.add(this, direction, placement)
//             console.log(this.props.parent.state.tabs.map(() => "tab"))
//             return null
//         }
//     }
// }