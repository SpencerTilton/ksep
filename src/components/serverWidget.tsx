import * as React from 'react';
import * as $ from "jquery";
import {getPerksListObject} from './circuit'
import {getRealList} from './netComp'

interface WidgetState { results: any };

export class ServerWidget extends React.Component<{}, WidgetState>{

    url: string = '/api/spice';

    componentWillMount() {
        this.state = { results: "" }
    }

    getResults(): string {
        return this.state.results.Vc;
    }

    setResults = (r) => {
        const nextState = { results: r };
        if (this.state) {
            this.setState(nextState);
        } else {
            this.state = nextState;
        }
    }

    post = () => {
        let netList = getPerksListObject();
        let newList = getRealList(netList);
        console.log('...........');
        console.log('posting', newList);
        $.post(this.url, newList,
            function (data, status) {
                
                this.setResults(data)
                console.log(status);;
            }.bind(this));

    }

    render() {
        const r = this.getResults();
        return (
            <div>
                <button onClick={this.post}>Process Netlist</button>
                {r}
            </div>
        );
    };
}; 