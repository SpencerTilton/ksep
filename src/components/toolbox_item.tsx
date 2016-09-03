import * as React from "react";
import { DragSource } from "react-dnd";
import { ItemTypes } from '../constants';

export interface ItemProps { name: string, isDragging: boolean,
  connectDragSource: any, connectDragPreview: any};

const compSource = {
    beginDrag(props) {
        return {name: props.name, add: true};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
    }
};

class ToolboxItem extends React.Component<ItemProps, {}>{

    svgSrc: string;
    hi: any;

    componentDidMount() {
        const img = new Image()
        img.onload = () => this.props.connectDragPreview(img)
        img.src = this.svgSrc;
    }

    constructor(props: ItemProps) {
        super(props);
        this.svgSrc = `./svg/${this.props.name}.svg`;
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="ToolboxItem">
                {this.props.name}<br/>
                <img src={this.svgSrc}/>
            </div>
        );
    };

};

export default DragSource(ItemTypes.COMP, compSource, collect)(ToolboxItem);
