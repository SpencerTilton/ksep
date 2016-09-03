import * as React from 'react';
import Port from "./port";
import { ItemTypes } from '../../constants'
import { DropTarget } from 'react-dnd';
import { connectPorts} from '../circuit';

export interface PortHoleProps {connectDropTarget: any, index: number,
    port: number, x: number, y: number, hidden: boolean};

class conn{
    conComp: number;
    conPort: number;
    net: number;
}

const portTarget = {
    drop(props, monitor){
        let fromComp = monitor.getItem().index;
        let fromPort = monitor.getItem().port;
        let toComp = props.index;
        let toPort = props.port;

        connectPorts(fromComp, fromPort, toComp, toPort);
        return;
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
};

class portHole extends React.Component<PortHoleProps, {}>{

    visibility = (): string => {
      console.log("i look" , this.props.hidden);
      if (this.props.hidden) return "hidden";
        else return "visible";
    }

    render () {
        let svgSrc = `./svg/port.svg`;
        const {connectDropTarget } = this.props;
        const {x,y} = this.props;
        return connectDropTarget(
            <div className="Socket" style={{position: "absolute",
              top:y, left:x, visibility:this.visibility()}}>
                <img src={svgSrc}/>
                <Port index={this.props.index} port={this.props.port} x={x} y={y+10}/>
            </div>
        );
    }
}

//can go in div
//Port Hole - {this.props.index},{this.props.port} to {this.props.connection.conComp},{this.props.connection.conPort} or net({this.props.connection.net})
export default DropTarget(ItemTypes.PORT, portTarget, collect)(portHole);
