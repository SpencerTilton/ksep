import * as React from "react";
import {Wire, getCoords, getBetterCoords, removeWire, getWireIndex} from '../circuit';

export interface NewWireProps { wire: Wire };

export class NewWire extends React.Component<NewWireProps, {}>{
    largestX: number = 0;
    largestY: number = 0;
    smallestX: number = 0;
    smallestY: number = 0;

    click = (me: MouseEvent) =>{
        console.log('me');
        removeWire(getWireIndex(this.props.wire));
    }

    old_render() {
        let [x1, y1, x2, y2] = this.doMaths();
        //this solution messes with the svg box limits

        return (
            <div onClick={this.click}>
                <svg width={this.largestX - this.smallestX} height={this.largestY - this.smallestY}
                    style={{ position: "absolute", left: this.smallestX, top: this.smallestY}}>
                    <path fillOpacity="0" stroke="purple" strokeWidth="6" d={this.getPath(x1, y1, x2, y2) }/>
                </svg>
            </div>
        );
    }; 

    render() {
        let [x1, y1, x2, y2] = this.doMaths();
        //this solution messes with the svg box limits

        return (
            <div onClick={this.click}>
                <svg width={this.largestX - this.smallestX} height={this.largestY - this.smallestY}
                    style={{ position: "absolute", left: this.smallestX, top: this.smallestY}}>
                    <polyline points={this.getPathString(x1, y1, x2, y2) }fill="none" stroke="purple" strokeWidth="6"/>
                </svg>
            </div>
        );
    };

    doMaths() {
        let [x1, y1, x2, y2] = getBetterCoords(this.props.wire);

        this.smallestX = this.smallestY = this.largestX = this.largestY = 0;
        if (x1 > x2) {
            this.largestX = x1;
            this.smallestX = x2;
        } else {
            this.largestX = x2;
            this.smallestX = x1;
        }

        if (y1 > y2) {
            this.largestY = y1;
            this.smallestY = y2;
        } else {
            this.largestY = y2;
            this.smallestY = y1;
        }

        return [x1, y1, x2, y2];
    }

    tranlateToRelative(x: number, y: number): [number, number] {
        return [x - this.smallestX, y - this.smallestY];
    }

    getPath(x1, y1, x2, y2) {
        let d: string = "M ";
        let rCenter = this.tranlateToRelative(x1, y1);
        d += rCenter[0] + " " + rCenter[1] + " ";


        let rPoints = this.tranlateToRelative(x2, y2);
        /**/
        if (y1>y2) d += "L " + rCenter[0] + " " + rPoints[1];
        else d += "L " + rPoints[0] + " " + rCenter[1];
        d += "L " + rPoints[0] + " " + rPoints[1];
        /**/
        //d += "L " + rPoints[0] + " " + rPoints[1];

        return d;
    }

    getPathString(x1, y1, x2, y2) {
        let d: string = "";
        let rCenter = this.tranlateToRelative(x1, y1);
        d += rCenter[0] + "," + rCenter[1] + " ";

        let rPoints = this.tranlateToRelative(x2, y2);

        if (y1>y2) d += rCenter[0] + "," + rPoints[1] + " ";
        else d += rPoints[0] + "," + rCenter[1] + " ";
        d += rPoints[0] + "," + rPoints[1];

        return d;
    }
};
