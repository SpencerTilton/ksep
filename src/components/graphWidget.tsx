import * as React from 'react';
import {getState, CircuitItem} from './circuit';

declare namespace Plotly {
  function plot(dom: any, plot: any, layout: any): void
  function plot(dom: any, plot: any, layout: any, flag: any): void;
  
}

interface WidgetState {
    plots: any[];
}


export class GraphWidget extends React.Component<{}, WidgetState>{

    componentWillMount() {
        this.state = { plots: [] };
    }

    private changeState = (newPlot) => {
        const oldPlots = this.state.plots;
        const nextState = { plots: (oldPlots, newPlot) };
        if (this.state) {
            this.setState(nextState);
        } else {
            this.state = nextState;
        }
    }

    addPlot(plot) {
        this.changeState(plot);
    }


    buttonClick1() {
        let dom = document.getElementById('graph1');
        let data = [{x:[2, 3, 4, 5, 6],y:[1, 2, 4, 8, 16]}];
        let layout = {margin:{t:0}};
        Plotly.plot(dom, data, layout);
    }

    buttonClick2() {
        let TESTER = document.getElementById('graph2');
        Plotly.plot(TESTER, [{
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16]
        }], {
                margin: { t: 0 }
            });
    }

    buttonClick3() {
        let TESTER = document.getElementById('graph3');
        Plotly.plot(TESTER, [{
            x: [2, 3, 4, 5, 6],
            y: [11, 21, 41, 81, 161]
        }], {
                margin: { t: 0 }
            });
    } 

    graphCircuit = () => {
        let comps: CircuitItem[] = getState().comps;
        let x: number[] = [];
        let y: number[] = [];

        for (let comp of comps) {
            x.push(comp.gui.xLoc);
            y.push(comp.gui.yLoc);
        }1

        this.graphXY(x, y);
    }

    graphXY = (x: number[], y: number[]) => {
        let TESTER = document.getElementById('graph1');
        Plotly.plot(TESTER, [{
            x,
            y
        }], {
                margin: { t: 0 }
            });
    }

    render() {
        return (
            <div>
                <button onClick={this.buttonClick1}>Graph 1</button>
                <button onClick={this.buttonClick2}>Graph 2</button>
                <button onClick={this.buttonClick3}>Graph 3</button>
                <div className="graph" id="graph1"/>
                <div className="graph" id="graph2"/>
                <div className="graph" id="graph3"/>
            </div>
        )
    }
}