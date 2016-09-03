import * as React from "react";
import {Toolbox} from './toolbox';
import {Header} from './header';
import {UtilSandbox} from './util';

import Editor from './editor'
import { DragDropContext } from 'react-dnd';


//declare function Editor3(param1: number, param2: ): void;
//I want to be able to do this, but the below works for now.
//import HTML5Backend from "../../node_modules/react-dnd-html5-backend";
var HTML5Backend = require('react-dnd-html5-backend');

export interface PerksProps {};

@DragDropContext(HTML5Backend)
export class Perks extends React.Component<{}, {}> {
    render() { return (
        <div>
            <Header/>
            <Toolbox/>
            <Editor/>
        </div>
    )};
};
