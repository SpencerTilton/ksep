import * as React from "react";
import {ItemTypes} from '../constants';
import { DropTarget } from 'react-dnd';
import { observe, addComp, moveComp, CircuitItem, getPerkslist, Wire, rotateLastMoved} from './circuit';
import CircuitComp from './editor_comps/circuit_comp';
import { NewWire }  from './editor_comps/new_wire';
import { GraphWidget } from './graphWidget';


//This prop is required by react DND
export interface EditorProps {
    //This props(function) is called within render() to allow react dnd to habndle the drag elements.
    connectDropTarget: any
};

//Editor state is really just circuitState from ./circuit but it also has the WireItem array which is depreciated from the nets itteration
//TODO: remove WireItem[]
interface EditorState {
    contents: {
        comps: CircuitItem[],
        wires: Wire[],
    },
    wiringGUI: boolean;
};

//This function is required by react dnd as the "drop target context"
const editorTarget = {
    drop(props, monitor) {
        let { x, y } = monitor.getClientOffset()
        if (monitor.getItem().add) addComp(monitor.getItem().name, x, y);
        if (monitor.getItem().move) {
          moveComp(monitor.getItem().moved, x, y);
        }
      }

};

//Specifies which props to inject into your component, required by react dnd
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

class Editor extends React.Component<EditorProps, EditorState>{

    unobserve: Function;

    constructor(props) {
        super(props);
        this.unobserve = observe(this.handleChange.bind(this));
    }
    componentWillUnmount() {
        this.unobserve();
    };

    handleChange(circuitState) {
        if (this.state) {
          const nextState = { contents: circuitState, wiringGUI: this.state.wiringGUI};
            this.setState(nextState);
        } else {
          const nextState = { contents: circuitState, wiringGUI: true}
          this.state  = nextState;
        }
    };

    hideStuff=()=>{
      console.log('hiding stuff, was ' + this.state.wiringGUI);
      const nextState = { contents: this.state.contents,
        wiringGUI: !(this.state.wiringGUI)};
      this.setState(nextState);
    }

    onKeyDown = (e: KeyboardEvent) => {
        console.log("keydown",e);
      if (e.keyCode === 87) this.hideStuff();
      else console.log('sad');
    }

    componentDidMount(){
        document.addEventListener("keydown", this.onKeyDown, false);
    }

    render() {
        const {connectDropTarget } = this.props;
        const r = getPerkslist();
        // {this.drawWires() }
        // {this.drawTestWires() }
        return connectDropTarget(
            <div className="Editor">
                {this.getComps() }
                {this.drawNewWires()}

                <button onClick={this.hideStuff}>Toggle <u>W</u>ires</button>
                <button onClick={rotateLastMoved}>Rotate</button>
                <div className="Results">
                    {r}
                    <GraphWidget/>
                </div>
            </div>
        );
    };



    drawNewWires() {
        console.log('drawing wires', this.state.contents.wires.length)
        return this.state.contents.wires.map(
            (item, index) =>
                <NewWire
                    wire={item}
                    key={index}/>
        );
    }

    getComps() {
        console.log('dawing comps', this.state.contents.comps.length);
        return this.state.contents.comps.map(
            (item, index) =>
                <CircuitComp
                    object={item}
                    key={index}
                    index={index}
                    hidden={!this.state.wiringGUI} />
        );
    }
};

//React DND export
export default DropTarget(ItemTypes.COMP, editorTarget, collect)(Editor);
