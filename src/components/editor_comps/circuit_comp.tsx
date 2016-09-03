import * as React from "react";
import { DragSource } from "react-dnd";
import { ItemTypes, Rotations } from '../../constants';
import { CircuitItem } from '../circuit';
import PortHole from './port_hole'


export interface CompProps { object: CircuitItem, connectDragSource: any,
  connectDragPreview: any, index: number, hidden: boolean};

const compSource = {
    beginDrag(props) {
        return { moved: props.object, move: true };
    }
};
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
    }
};

class CircuitComp extends React.Component<CompProps, {}>{

    rotation: string;
    svgSrc: string;
    p0: number;
    p1: number;

    componentDidMount() {
        const img = new Image()
        img.onload = () => this.props.connectDragPreview(img)
        img.src = this.svgSrc;
    }

    constructor(props: CompProps) {
        super(props);
        this.svgSrc = `./svg/${this.props.object.type}.svg`;
        if (this.props.object.gui.rotation) {
            this.rotation = this.props.object.gui.rotation;
        } else {
            //this.rotation = Rotations[Math.floor(Math.random() * Rotations.length)];
            this.rotation = Rotations[0];
            this.props.object.gui.rotation = this.rotation;
        }
    }

    drawPorts = (x: number, y: number) => {
        //we're ignoring y and x for now
        const zero = 0;
        const one = 1;
        return (
            <div>
                <PortHole index={this.props.index} port={zero}
                  x={this.rightHandedRotation(-10)} y={0} 
                  hidden={this.props.hidden}/>
                <PortHole index={this.props.index} port={one}
                  x={this.rightHandedRotation(50)} y={0}
                  hidden={this.props.hidden}/>
            </div>
        )
    }

    rightHandedRotation(x: number): number {
        return x;
    }

    render() {
        const { connectDragSource } = this.props;
        const {xLoc, yLoc } = this.props.object.gui;
        this.svgSrc = `./svg/${this.props.object.type}.svg`;
        return connectDragSource(
            <div className={this.props.object.gui.rotation} style={{ position: "absolute", top: yLoc - 20, left: xLoc - 20 }}>
                <img src={this.svgSrc}/>{this.drawPorts(yLoc, xLoc)}
            </div>
        );
    };
};

//could go in div
//{this.props.index} - {this.props.object.type}
//

export default DragSource(ItemTypes.COMP, compSource, collect)(CircuitComp);
