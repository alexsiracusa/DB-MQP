// import React from "react";
// import TabBar from "./TabBar.tsx";
// import '../../styles/TranslatorMockup.css'
// import Split from 'react-split'
//
// export abstract class TabObject extends React.Component {
//     parent: TabGroup | null;
//
//     constructor(parent: TabGroup | null) {
//         super({parent: parent});
//         this.parent = parent;
//     }
//
//     abstract render(): JSX.Element;
// }
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
//     add(tab: TabWindow, direction: string, placement: string): TabObject | null {
//         if (this.parent === null || this.parent.state.direction != direction) {
//             // turn self into TabGroup
//             if (placement === "after") {
//                 return new TabGroup(this.parent, [this, tab], direction);
//             } else {
//                 return new TabGroup(this.parent, [tab, this], direction);
//             }
//         } else {
//             // add to parent group
//             this.props.parent.add(tab, this, direction, placement)
//             // this.parent.add(tab, this, direction, placement)
//             console.log(this.parent.state.tabs.map(() => "tab"))
//             return null
//         }
//     }
// }
//
// export class TabGroup extends TabObject {
//     state: {
//         tabs: TabObject[],
//         direction: string
//     }
//
//     constructor(parent: TabGroup | null, tabs: TabObject[], direction: string) {
//         super(parent);
//         this.state = {
//             tabs: tabs,
//             direction: direction
//         }
//         for (const tab of this.state.tabs) {
//             tab.parent = this;
//         }
//     }
//
//     // componentDidMount() {
//     //     console.log("mounted")
//     //     this.add = this.add.bind(this);
//     // }
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
//                                 {component && component.render()}
//                             </React.Fragment>
//                         )
//                     })
//                 }
//             </Split>
//         )
//     }
//
//     push(tab: TabWindow) {
//         tab.parent = this
//         this.state.tabs.push(tab)
//     }
//
//     add(tab: TabWindow, from: TabWindow, direction: string, placement: string) {
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