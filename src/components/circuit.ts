//This file manages the state of the circuit as well as the actions performed on it.
//Should probably break this up into two files, one with the state and another
//with all the actions, as well as wrapping the actions within a class.

//Imports for computational engine.
import { PerksListObject, Util } from './util';
import { Rotations } from '../constants';

//The entire state of the application is made up of the classes below.
//circuitState holds arrays of the components and wires.
//TODO: make a class type for this
let circuitState: {
    comps: CircuitItem[];
    wires: Wire[];
    results: any;
} = {
        wires: [],
        comps: [],
        results: null
    }

//At this point conComp and conPort aren't used and should be removed, waiting to see where we take wires though.
//Even nets could go now that we're using a second wires object to keep track of those.
//TODO: Remove ports:{}
export class CircuitItem {
    type: string;
    gui: {
        svgSrc: string;
        xLoc: number;
        yLoc: number;
        rotation: string; //Complicated, see "new_wire" for insight.
    }
}

//Realy simple wire. conComp is the index of the item and conPort is also an index (0 or 1 for now, could be expanded)
export class Wire {
    pos: {
        conComp: number;
        conPort: number;
    }
    neg: {
        conComp: number;
        conPort: number;
    }

}

//Observer tool for updating the DOM, used in editor.
//Complicated, but the gist is that whenever the emitChange() is called,
//we can then use emitChange() to notify the editor that it needs to update.
//React doesn't watch for this because we have circuitState stored externally
//rather than as a prop.
let observer = null;

export function getState() {
    return circuitState;
}

function emitChange() {
    observer(circuitState);
}

//INPUTS: o(a javascript object to notify)
//RETURN: an arrow function that the notifying object can call through binding to clear the observer
export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();
    return () => {
        observer = null;
    };
}

//Function to add a component to the circuitState.
//INPUTS: added(the string representing the component type, found in ../constants.ts) x, y(the coords of the comp)
/*
        ports: {
            0: { conComp: -1, conPort: -1, net: count * 2 + 1 },
            1: { conComp: -1, conPort: -1, net: count * 2 + 2 }
 */
export function addComp(added: string, x: number, y: number) {
    let count = circuitState.comps.length;
    let compo: CircuitItem = {
        type: added,
        //ports:{} will be removed in the future, depreciated
        gui: {
            svgSrc: `./svg/${added}.svg`,
            xLoc: x,
            yLoc: y,
            rotation: null,
        }
    }

    circuitState.comps.push(compo);
    emitChange();
}

//Moves an already existing component to a new location
//INPUTS: moved(index of component) x,y (coords)
export function moveComp(moved: CircuitItem, x: number, y: number) {
    let ind: number = circuitState.comps.indexOf(moved);
    circuitState.comps[ind].gui.xLoc = x;
    circuitState.comps[ind].gui.yLoc = y;
    lastMoved = ind;
    emitChange();
}
let lastMoved: number;

export function rotateLastMoved(){
  rotateComp(circuitState.comps[lastMoved]);
}

export function rotateComp(moved: CircuitItem) {
    let i: number = Rotations.indexOf(moved.gui.rotation);
    //console.log(i);
    i = (i + 1) % 4;
    //console.log(moved.gui.rotation);
    moved.gui.rotation = Rotations[i];
    //console.log(moved.gui.rotation);
    emitChange();
}

//Removes a comp, causes lots of bugs. Don't know where blame lies in all cases though.
//INPUTS: item(the actual circuitItem to remove from the index)
//TODO: change object reference to index
export function removeComp(item: CircuitItem) {
    removeWires(item);
    console.log(JSON.stringify(circuitState.wires));
    //let index = circuitState.comps.indexOf(item);
    //let msg = circuitState.comps.splice(index, 1);
    //console.log(msg);

    let newCompState: CircuitItem[] = [];
    for (let i = 0; i < circuitState.comps.length; i++) {
        let thisComp = circuitState.comps[i];
        if (item !== thisComp) {
            newCompState.push(thisComp);
        }
    }
    circuitState.comps = newCompState;

    emitChange();
}

function removeWires(item: CircuitItem) {
    let newWireState: Wire[] = [];
    let compIndex = circuitState.comps.indexOf(item);
    console.log(compIndex, JSON.stringify(circuitState.wires));
    for (let i = 0; i < circuitState.wires.length; i++) {
        let thisWire: Wire = circuitState.wires[i];
        if ((compIndex !== thisWire.neg.conComp) && (compIndex !== thisWire.pos.conComp)) {
            if (thisWire.pos.conComp > compIndex) thisWire.pos.conComp = thisWire.pos.conComp - 1;
            if (thisWire.neg.conComp > compIndex) thisWire.neg.conComp = thisWire.neg.conComp - 1;
            newWireState.push(thisWire);
        } else {
            console.log(thisWire.pos.conComp + "and" + thisWire.neg.conComp + "!=" + compIndex)
        }
    }
    circuitState.wires = newWireState;
    console.log(JSON.stringify(circuitState.wires));
    emitChange();
}

export function removeWire(index: Number) {
    let newWireState: Wire[] = [];
    for (let i = 0; i < circuitState.wires.length; i++) {
        let thisWire: Wire = circuitState.wires[i];
        if ((index !== i)) {
            newWireState.push(thisWire);
        } else {
            console.log('wire removed');
        }
    }
    circuitState.wires = newWireState;

    emitChange();
}
export function getWireIndex(wire: Wire) {
    return circuitState.wires.indexOf(wire)
}

//At this point this function really shouldn't exist and makeWire() should just also push the wire onto the state.
//TODO: ^that
//INPUTS: ...(the indecies and ports that the wire should be drawn between, ref of circuitState)
export function connectPorts(index1: number, port1: number, index2: number, port2: number) {
    let netNumber = Math.floor((Math.random() * 10) + 1);
    //The following are from the initial wire design (1 wire per port)
    //circuitState.comps[index1].ports[port1].conComp = index2;
    //circuitState.comps[index1].ports[port1].conPort = port2;
    //circuitState.comps[index2].ports[port2].conComp = index1;
    //circuitState.comps[index2].ports[port2].conPort = port1;

    //Depreciated but still being called to show functionality. From the second itteration (nets)
    //TODO: remove AFTER nets being made from wires it done.
    //oldConnect(index1, port1, index2, port2);

    circuitState.wires.push(makeWire(index1, port1, index2, port2));
    setNets();
    //console.log(circuitState.wires.length);
    emitChange();
}

//This function simply takes the inputs for a wire and returns the wire. See above todo.
//INPUTS: ...(the indecies and ports that the wire should be drawn between, ref of circuitState)
//RETURN: Wire(a wire object)
function makeWire(index1: number, port1: number, index2: number, port2: number): Wire {
    let wire: Wire;
    wire = {
        pos: {
            conComp: index1,
            conPort: port1,
        },
        neg: {
            conComp: index2,
            conPort: port2,
        }
    }

    return wire;
}

function setNets() {

}

//This function takes a wire object, and then outputs the four coords that correspond to its endpoints in terms of components
//The return values from this function still need to be offset for ports.
//INPUTS: wire(A wire object, defined above, NOT WireItem)
//RETURN: x1,y1,x2,t2 (standard coords required for 2 points to draw the line in between)
export function getCoords(wire: Wire): [number, number, number, number] {
    let posComp = circuitState.comps[wire.pos.conComp];
    let x1 = posComp.gui.xLoc;
    let y1 = posComp.gui.yLoc;

    let negComp = circuitState.comps[wire.neg.conComp];
    let x2 = negComp.gui.xLoc;
    let y2 = negComp.gui.yLoc;

    //TODO, logic that modifies coords based on rotation


    return [x1, y1, x2, y2]
}

export function getBetterCoords(wire: Wire): [number, number, number, number] {

    let posComp = circuitState.comps[wire.pos.conComp];
    let x1 = posComp.gui.xLoc;
    let y1 = posComp.gui.yLoc;

    let negComp = circuitState.comps[wire.neg.conComp];
    let x2 = negComp.gui.xLoc;
    let y2 = negComp.gui.yLoc;


    //TODO, logic that modifies coords based on rotation
    let posPort = (wire.pos.conPort);
    let negPort = (wire.neg.conPort);

    let posRot = Rotations.indexOf(posComp.gui.rotation);
    let negRot = Rotations.indexOf(negComp.gui.rotation);

    let posState: [number, number] = [posPort, posRot];
    let negState: [number, number] = [negPort, negRot];


    [x1, y1] = translate(x1, y1, posState);
    [x2, y2] = translate(x2, y2, negState);

    return [x1, y1, x2, y2]
}

export function getBetterBetterCoords(wire: Wire): [number, number, number, number, number, number] {

    let posComp = circuitState.comps[wire.pos.conComp];
    let x1 = posComp.gui.xLoc;
    let y1 = posComp.gui.yLoc;

    let negComp = circuitState.comps[wire.neg.conComp];
    let x2 = negComp.gui.xLoc;
    let y2 = negComp.gui.yLoc;


    //TODO, logic that modifies coords based on rotation
    let posPort = (wire.pos.conPort);
    let negPort = (wire.neg.conPort);

    let posRot = Rotations.indexOf(posComp.gui.rotation);
    let negRot = Rotations.indexOf(negComp.gui.rotation);

    let posState: [number, number] = [posPort, posRot];
    let negState: [number, number] = [negPort, negRot];


    [x1, y1] = translate(x1, y1, posState);
    [x2, y2] = translate(x2, y2, negState);

    return [x1, y1, x2, y2, posRot, negRot]
}

function translate(x: number, y: number, state: [number, number]): [number, number] {
    let a = state[0];
    let b = state[1];
    if (a == 0 && b == 0) {
        return [x - 15, y - 5];
    } else if (a == 1 && b == 2) {
        return [x - 15, y - 5];
    } else if ((a == 1 && b == 0)) {
        //console.log('b');
        return [x + 45, y - 5];
    } else if (a == 0 && b == 2) {
        return [x + 45, y - 5];

    } else if ((a == 0 && b == 1)) {
        //console.log('c');
        return [x + 17, y - 33];
    } else if (a == 1 && b == 3) {
        return [x + 13, y - 33];
    } else if ((a == 1 && b == 1)) {
        //console.log('d');
        return [x + 15, y + 27];
    } else if (a == 0 && b == 3) {
        return [x + 13, y + 27];
    }
    console.log('@@@@WHY')
    return [x, y];
}

export function getPerkslist() {
    return getUtilResults();
}
export function getPerksListObject() {
    //Get pieces of state
    let compRef = circuitState.comps;
    let wireRef = circuitState.wires;

    //Pass state to netlist creation function
    let netList = populateNetList(compRef, wireRef);

    return netList;
}

//This enitre getPerkslist() function is responsible for translating the circuitState components into the
//appropriate netlist components.
//RETURN: r(a string with all of the components in netlist form followed by the results given by the util module)
//TODO: Update to work with wires instead of nets
export function old_getPerkslist() {

    //Helper function that keeps track of and distributes the IDs required by the netlist
    function getId(type: string) {

        if (type == 'c') {
            counter.c++;
            return counter.c;
        } else if (type == 'v') {
            counter.v++;
            return counter.v;
        } else if (type == 'd') {
            counter.d++;
            return counter.d;
        } else if (type == 'l') {
            counter.l++;
            return counter.l;
        } else if (type == 'r') {
            counter.r++;
            return counter.r;
        } else if (type == 'q') {
            counter.q++;
            return counter.q;
        }
    }
    let counter = {
        c: 0,
        v: 0,
        d: 0,
        l: 0,
        r: 0,
        q: 0
    }

    //This function takes the nets in the current list of components and makes sure there are no
    //gaps in the indexies of nets as well as labeling the backside of the powersource as net 0.
    //If the circuit was using nets 3, 20, and 99 after this function is is using nets 0,1,2.
    function redoNets() {

        function isSource(obj: PerksListObject) {
            return obj.type == 'v';
        }

        let groundObj = netList.filter(isSource);
        //This check combined with the previous function and call allow us to only go into this redoing system
        //if there is a power source
        if (groundObj.length == 1) {

            //This for loop changes the net that is currently the ground net to net 0
            let groundNet = groundObj[0].neg;
            for (let i = 0; i < netList.length; i++) {
                if (netList[i].neg == groundNet) {
                    netList[i].neg = 0;
                }
                if (netList[i].pos == groundNet) {
                    netList[i].pos = 0;
                }
            }

            //This pair of nested loops first goes through number 1 to 100, (this is currently a limit of the application)
            //and then appropriately renumbers a matching net to the lowest available number.
            //TODO: Fix
            let netCounter = 1;
            for (let i = 1; i < 100; i++) {
                let triggered: boolean = false;
                for (let j = 0; j < netList.length; j++) {
                    if (netList[j].neg == i) {
                        netList[j].neg = netCounter;
                        triggered = true;
                    }
                    if (netList[j].pos == i) {
                        netList[j].pos = netCounter;
                        triggered = true;
                    }

                }
                if (triggered) netCounter++;
            }
        }

    } //End redoNets()

    let netList: PerksListObject[] = [];
    let util = new Util;
    for (let i = 0; i < circuitState.comps.length; i++) {
        let item = circuitState.comps[i];
        let name = getType(item.type);
        let id = getId(name);
        let value = getBaseValue(item.type);

        netList.push({ type: name, id: id, pos: -1, neg: -1, value: value })
    }

    redoNets();


    let utilR = util.mainFunction(netList);
    let r = JSON.stringify(netList) + JSON.stringify(utilR);
    return r;
} //end getPerkslist()

//Helper function to get the netlist character representing each component type.
function getType(fullName: String) {
    if (fullName == 'capacitor') return 'c';
    if (fullName == 'dcvsource') return 'v';
    if (fullName == 'diode') return 'd';
    if (fullName == 'inductor') return 'l';
    if (fullName == 'resistor') return 'r';
    if (fullName == 'switch') return 'q';
}

//Helper function to get the base values we are using in the netlist.
function getBaseValue(fullName: String) {
    if (fullName == 'capacitor') return .00047;
    if (fullName == 'dcvsource') return 10;
    if (fullName == 'diode') return 10;
    if (fullName == 'inductor') return .001;
    if (fullName == 'resistor') return 10;
    if (fullName == 'switch') return .5;
}

function getUtilResults() {

    //Get pieces of state
    let compRef = circuitState.comps;
    let wireRef = circuitState.wires;

    //Pass state to netlist creation function
    let netList = populateNetList(compRef, wireRef);

    //Return results
    let util = new Util;
    let utilR = util.mainFunction(netList);
    let rInText = JSON.stringify(netList) + JSON.stringify(utilR);
    //console.log(rInText);
    return rInText;
}

function populateNetList(comps: CircuitItem[], wires: Wire[]): PerksListObject[] {

    let netList: PerksListObject[] = [];

    type tup = [number, number];
    type net = tup[];
    let nets: net[] = [];

    function existsInNets(t: tup): number {
        for (let i = 0; i < nets.length; i++) {
            let net = nets[i];
            let x = -1;

            for (let j = 0; j < net.length; j++) {
                let netCompJ: number = net[j][0];
                let netPortJ: number = net[j][1];

                let tupComp: number = t[0];
                let tupPort: number = t[1];

                let compC: boolean = (netCompJ == tupComp);
                let portC: boolean = (netPortJ == tupPort);

                let cC: boolean = (compC && portC);

                //console.log(netCompJ, netPortJ, tupComp, tupPort);

                if (cC) {
                    return i;
                }
            }
            //console.log('checking for ' + t, JSON.stringify(net), x)
        }
        return -1;
    }

    function combineNets(xI: number, yI: number) {
        //remove larger net to keep nets smallest as possible.
        //TODO
        let removedNet: net;
        let remainignNet: net;
        let removed: net[];

        if (xI > yI) {
            removed = nets.splice(xI, 1);
            remainignNet = nets[yI];
        } else {
            removed = nets.splice(yI, 1);
            remainignNet = nets[xI];

        }
        removedNet = removed[0];
        let index: number = nets.indexOf(remainignNet);

        for (let i = 0; i < removedNet.length; i++) {
            nets[index].push(removedNet[i]);
        }

    }

    function addToNet(netI: number, newConnection: tup) {
        //console.log(netI, JSON.stringify(newConnection));
        nets[netI].push(newConnection);
    }

    function makeNet(t1: tup, t2: tup) {
        let newNet: net = [t1, t2];
        nets.push(newNet);
    }

    let counter = {
        c: 0,
        v: 0,
        d: 0,
        l: 0,
        r: 0,
        q: 0
    }

    //Helper function that keeps track of and distributes the IDs required by the netlist
    function getId(type: string) {

        if (type == 'c') {
            counter.c++;
            return counter.c;
        } else if (type == 'v') {
            counter.v++;
            return counter.v;
        } else if (type == 'd') {
            counter.d++;
            return counter.d;
        } else if (type == 'l') {
            counter.l++;
            return counter.l;
        } else if (type == 'r') {
            counter.r++;
            return counter.r;
        } else if (type == 'q') {
            counter.q++;
            return counter.q;
        }
    }

    let netCounter: number = 0;

    function assignNets(i: number) {
        let nt: tup = [i, 0];
        let pt: tup = [i, 1];

        let nn = existsInNets(nt);
        let pn = existsInNets(pt);

        return [nn, pn];
    }

    for (let i = 0; i < wires.length; i++) {
        //console.log(JSON.stringify(nets));
        let wire = wires[i];

        let neg = wire.neg;
        let nc = neg.conComp;
        let np = neg.conPort
        let pos = wire.pos;
        let pc = pos.conComp;
        let pp = pos.conPort;

        let nt: tup = [nc, np];
        let pt: tup = [pc, pp];
        //console.log(nt, pt);

        let nn = existsInNets(nt);
        let pn = existsInNets(pt);
        //console.log(nn, pn);

        let ne = (nn >= 0);
        let pe = (pn >= 0);
        //if one is there, you ad it the other that list, if both are there, you combine those nets.
        //if neither are there, you make a new net.
        if (ne && pe) {
            //console.log('c');
            combineNets(nn, pn)
        }
        else if (ne) {
            //console.log('a1');
            addToNet(nn, pt);
        }
        else if (pe) {
            //console.log('a2');
            addToNet(pn, nt);
        }
        else {
            if (nn == pn && nn != -1) {
                console.log('useless wire?');
            } else {
                //console.log('m');
                makeNet(nt, pt);
            }
        }

    }
    /*
    for (let i = 0; i < nets.length; i++) {
        console.log(JSON.stringify(nets[i]));

    }*/
    //console.log(JSON.stringify(nets));
    //console.log('end log');


    for (let i = 0; i < comps.length; i++) {
        let item = comps[i];
        let name = getType(item.type);
        let id = getId(name);
        let value = getBaseValue(item.type);

        let posNet = -1;
        let negNet = -1;

        [posNet, negNet] = assignNets(i);

        netList.push({ type: name, id: id, pos: posNet, neg: negNet, value: value })
    }

    return netList;
}

export function saveCircuit() {
    localStorage.setItem('circuit', JSON.stringify(circuitState));
}
export function saveCircuitByName(name: string) {
    localStorage.setItem(name, JSON.stringify(circuitState));
}

export function loadCircuit() {
    circuitState = JSON.parse(localStorage.getItem('circuit'));
    emitChange();
}
export function checkState() {
    console.log(circuitState, circuitState.wires.length);
}
export function loadCircuitByName(name: string) {
    circuitState = JSON.parse(localStorage.getItem(name));
    emitChange();
}


export function setGraphs(data: any){
    
    emitChange();
}