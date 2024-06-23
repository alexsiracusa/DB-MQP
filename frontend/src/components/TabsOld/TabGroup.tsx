// import Split from "react-split";
// import React from "react";
// import {TabObject} from "./TabObject.tsx";
// import {TabWindow} from "./TabWindow.tsx";
//
//
// export class TabGroup extends TabObject {
//     state: {
//         tabs: TabObject[],
//         direction: string
//     }
//
//     constructor(parent: TabGroup | null, tabs: TabObject[], direction: string) {
//         const add = (parent === null) ? null : parent.add;
//         super({parent: parent, add: add});
//         this.state = {
//             tabs: tabs,
//             direction: direction
//         }
//     }
//
//     push(tab: TabWindow) {
//         this.state.tabs.push(tab)
//     }
//
//     render(): JSX.Element {
//         return (
//             <Split
//                 className="tab-split-container"
//                 direction="horizontal"
//                 gutterAlign="start"
//                 sizes={[50, 50]}
//                 minSize={6}
//                 gutterSize={6}
//             >
//                 {
//                     this.state.tabs.map((component: React.Component, i) => {
//                         return (
//                             <React.Fragment key={i}>
//                                 {component.render()}
//                             </React.Fragment>
//                         )
//                     })
//                 }
//             </Split>
//         )
//     }
//
//     add(from: TabWindow, direction: string, placement: string) {
//         const tab = new TabWindow({parent: this, add: this.add});
//
//         console.log(this.state === undefined)
//         const index = this.state.tabs.indexOf(from);
//         if (this.state.direction === direction) {
//             const offset = (placement === "before") ? 0 : 1;
//             this.state.tabs.splice(index + offset, 0, tab)
//
//             const newTabs = this.state.tabs.slice(0, index + offset)
//                 .concat([tab])
//                 .concat(this.state.tabs.slice(index + offset));
//
//             this.setState({
//                 tabs: newTabs
//             })
//         } else {
//             const newTabs = [...this.state.tabs]
//             newTabs[index] = from.add(tab, direction, placement);
//             this.setState({
//                 tabs: newTabs
//             })
//         }
//     }
// }