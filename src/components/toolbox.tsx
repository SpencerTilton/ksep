import * as React from "react";
import ToolboxItem from "./toolbox_item";
import ToolboxTrash from "./toolbox_trash";
import ToolboxRotate from "./toolbox_rotate";
import {SaveLoadWidget} from './saveLoadWidget';
import { ServerWidget } from './serverWidget';
import { PerksComponents } from "../constants";


export interface ToolboxProps {};

export class Toolbox extends React.Component<ToolboxProps, {}>{
    render() {
        return (
            <div className="Toolbox">
                Toolbox
                {this.getToolboxItems() }

                <ToolboxTrash/>
                <ToolboxRotate/>
                <SaveLoadWidget/>
                <ServerWidget/>
            </div>

        );
    };

    getToolboxItems = () => {
        return PerksComponents.map(
            (item, index) => <ToolboxItem key={index} name={item.name}/>
        );
    }



};
