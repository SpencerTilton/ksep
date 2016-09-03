import * as React from 'react';
import { saveCircuit, loadCircuit,
    saveCircuitByName, loadCircuitByName,
    checkState} from './circuit';

interface WidgetState {
    text: string;
};

export class SaveLoadWidget extends React.Component<{}, WidgetState>{

    save() {
        console.log('save');
        saveCircuit();
    }
    saveByName =() =>  {
        console.log('save by name');
        saveCircuitByName(this.state.text);
    }

    load() {
        console.log('load');
        loadCircuit();
    }
    loadByName = () => {
        console.log('load by name');
        loadCircuitByName(this.state.text);
    }

    check = () => {
    checkState();
    }


    handleTextChange =(e)=> {
        const nextState = { text: e.target.value };
        if (this.state) {
            this.setState(nextState);
        } else {
            this.state = nextState;
        }
    }

    componentWillMount() {
        this.setState({ text: 'circuit' });
    }

    render() {
        console.log('saveload');
        return (
            <div>
            <button onClick={this.check}>check</button>
                <button onClick={this.saveByName}>save</button>
                <button onClick={this.loadByName}>Load</button>
                <input className="saveloadbox"
                    type="text"
                    placeholder="circuit name"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    />
            </div>
        );
    };
};
