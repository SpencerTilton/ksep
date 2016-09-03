import * as React from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from '../../constants';

export interface PortProps {connectDragSource: any, index: number, port: number, x: number, y: number};

const portSource = {
    beginDrag(props) {
        return {index: props.index, port: props.port};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
    }
};

class Port extends React.Component<PortProps, {}>{


    render() {
        let svgSrc = `./svg/port.svg`;
        const {x,y} = this.props;
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="Ball" style={{position: "absolute", top:0, left:0}}>
                <img src={svgSrc}/>
            </div>
        );
    };

};

export default DragSource(ItemTypes.PORT, portSource, collect)(Port);
