import * as React from "react";
import {Wire, getCoords, getBetterCoords, getBetterBetterCoords, removeWire, getWireIndex} from '../circuit';

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
        let coor = this.doMaths();
        let boxes = this.makeBoxes(coor);
        console.log(boxes);
        
        //this solution messes with the svg box limits

        return (
            <div>
                { this.getWirePieces(boxes) }
            </div>
        );
    };

    getWirePieces(arr: [[number,number],[number,number],boolean][]): JSX.Element[] {
            return arr.map(
                (item, index) => {
                    let widthIsZero: boolean = false;
                    let width: number = (item[1][0] - item[0][0]);
                    if (width === 0) {widthIsZero = true;}
                    let height: number = (item[1][1] - item[0][1]);
                    if (height === 0) {widthIsZero = false;}
                    //console.log(width, height);
                    //console.log(item.toString());
                    
                    
                    
                    return (
                    <svg key={index} width={width+5} height={height+5}
                        style={{ position: "absolute", left: item[0][0], top: item[0][1]}}>
                        <polyline style={{fill: "white", stroke: "red", strokeWidth: "4"}} points={this.getPolyPoints(widthIsZero, width, height)}/>
                    </svg>)
                }
            );
    }

    getPolyPoints(isVertical: boolean, width: number, height: number) {
        let s: string;
        if (isVertical === true) {
            s = "0,0 0," + height.toString();
            return s;
        }
        else {
            s = "0,0 " + width.toString() + ",0"
            return s;
        }
    }

    doMaths() {
        // NOTE: Rotation is sometimes calculated wrong
        let [x1, y1, x2, y2, r1, r2] = getBetterBetterCoords(this.props.wire);
        let x3, y3, x4, y4: number = 0;
        let arr: [number, number][] = [];

        if (((r1&2) === (r2%2))&&((r1&2) === 0)) {
            if (x1 <= x2) {
                x3 = x4 = (x2 - x1)/2 + x1;
            }
            else {
                x3 = x4 = (x1 - x2)/2 + x2;
            }
            y3 = y1;
            y4 = y2;
            arr = [[x1, y1], [x3, y3], [x4, y4], [x2, y2]];
            return arr
        }
        else if (((r1&2) === (r2%2))&&((r1&2) === 1)) {
            if (y1 <= y2) {
                y3 = y4 = (y2 - y1)/2 + y1;
            }
            else {
                y3 = y4 = (y1 - y2)/2 + y2;
            }
            x3 = x1;
            x4 = x2;
            arr = [[x1, y1], [x3, y3], [x4, y4], [x2, y2]];
            return arr;
        }
        else {
            if ((r1&2) === 0) {
                x3 = x2;
                y3 = y1;
                arr = [[x1, y1], [x3, y3], [x2, y2]];
                return arr;
            }
            else {
                x3 = x1;
                y3 = y2;
                arr = [[x1, y1], [x3, y3], [x2, y2]];
                return arr;
            }
        }
    }
    makeBoxes(arr: [number, number][]): [[number,number],[number,number],boolean][] {
        // bool value of false means x is changing
        // bool value of true means y is changing
        let n: [[number,number],[number,number],boolean][] = [];
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i][0] < arr[i+1][0]) {
                n.push([arr[i],arr[i+1],false]);
            } else if (arr[i+1][0] < arr[i][0]) {
                n.push([arr[i+1],arr[i],false]);
            } else if (arr[i][1] < arr[i+1][1]) {
                n.push([arr[i],arr[i+1],true]);
            } else if (arr[i+1][1] < arr[i][1]) {
                n.push([arr[i+1],arr[i], true]);
            }
        }

        return n;
    }

    getSVGBoxLocation () {
        /*this.smallestX = this.smallestY = this.largestX = this.largestY = 0;
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
        }*/
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
