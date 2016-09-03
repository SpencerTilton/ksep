import * as React from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from '../constants';
import { rotateComp} from './circuit'

export interface Props {connectDropTarget: any};

const rotateTarget = {
    drop(props, monitor){
        //console.log('rotate drop')
        rotateComp(monitor.getItem().moved)
        return;
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
};

class ToolboxRotate extends React.Component<Props, {}>{
    render() {
        const {connectDropTarget } = this.props;
        return connectDropTarget(
            <div className="ToolboxRotate">
                Rotate
            </div>
        );
    };

};

export default DropTarget(ItemTypes.COMP, rotateTarget, collect)(ToolboxRotate);