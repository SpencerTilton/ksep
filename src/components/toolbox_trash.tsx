import * as React from "react";
import { DropTarget} from "react-dnd";
import { ItemTypes } from '../constants';
import { removeComp, getState} from './circuit'

export interface Props {connectDropTarget: any};

const trashTarget = {
    drop(props, monitor){
        removeComp(monitor.getItem().moved)
        return;
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
};

class ToolboxTrash extends React.Component<Props, {}>{
    render () {
        const {connectDropTarget } = this.props;
        return connectDropTarget(
            <div>
                Trash
            </div>
        );
    }
}

export default DropTarget(ItemTypes.COMP, trashTarget, collect)(ToolboxTrash);
