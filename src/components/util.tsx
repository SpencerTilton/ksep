import * as React from 'react';

export class UtilSandbox extends React.Component<{}, {}>{
    buck: PerksListObject[] = [
        //Buck

        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 1, neg: 2, value: 0.5},
        {type:'r', id: 1, pos: 3, neg: 0, value: 10},
        {type:'c', id: 1, pos: 3, neg: 0, value: 15},
        {type:'l', id: 1, pos: 2, neg: 3, value: 15},
        {type:'d', id: 1, pos: 0, neg: 2, value: 0.5}
    ];

    boost: PerksListObject[] = [
        //Boost
        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 2, neg: 0, value: 0.5},
        {type:'r', id: 1, pos: 3, neg: 0, value: 10},
        {type:'c', id: 1, pos: 3, neg: 0, value: 15},
        {type:'l', id: 1, pos: 1, neg: 2, value: 15},
        {type:'d', id: 1, pos: 3, neg: 2, value: 0.5}
    ];

    buckBoost: PerksListObject[] = [
        //Buck Boost

        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 1, neg: 2, value: 0.5},
        {type:'r', id: 1, pos: 3, neg: 0, value: 10},
        {type:'c', id: 1, pos: 3, neg: 0, value: 15},
        {type:'l', id: 1, pos: 2, neg: 0, value: 15},
        {type:'d', id: 1, pos: 2, neg: 3, value: 0.5}
    ];

    nonInvertingBuckBoost: PerksListObject[] = [

        //Noninverting Buck-Boost
        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 1, neg: 2, value: 0.5},
        {type:'q', id: 2, pos: 3, neg: 0, value: 0.5},
        {type:'d', id: 1, pos: 2, neg: 0, value: 0.5},
        {type:'d', id: 2, pos: 3, neg: 4, value: 0.5},
        {type:'l', id: 1, pos: 2, neg: 3, value: 15},
        {type:'c', id: 1, pos: 4, neg: 0, value: 15},
        {type:'r', id: 1, pos: 4, neg: 0, value: 10}
    ];

    hBridge: PerksListObject[] = [
        //H-Bridge

        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 1, neg: 2, value: 0.5},
        {type:'q', id: 2, pos: 4, neg: 0, value: 0.5},
        {type:'d', id: 1, pos: 2, neg: 0, value: 0.5},
        {type:'d', id: 2, pos: 1, neg: 4, value: 0.5},
        {type:'l', id: 1, pos: 2, neg: 3, value: 15},
        {type:'c', id: 1, pos: 3, neg: 4, value: 15},
        {type:'r', id: 1, pos: 3, neg: 4, value: 10}
    ];

    currentFed: PerksListObject[] = [
        //Current-fed Bridge
        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 2, neg: 3, value: 0.5},
        {type:'q', id: 2, pos: 4, neg: 0, value: 0.5},
        {type:'d', id: 1, pos: 3, neg: 0, value: 0.5},
        {type:'d', id: 2, pos: 4, neg: 2, value: 0.5},
        {type:'l', id: 1, pos: 1, neg: 2, value: 15},
        {type:'c', id: 1, pos: 3, neg: 4, value: 15},
        {type:'r', id: 1, pos: 3, neg: 4, value: 10}
    ];

    watkinsJohnson: PerksListObject[] = [
        //Watkins-Johnson
        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 1, neg: 2, value: 0.5},
        {type:'q', id: 2, pos: 3, neg: 4, value: 0.5},
        {type:'d', id: 1, pos: 2, neg: 0, value: 0.5},
        {type:'d', id: 2, pos: 1, neg: 3, value: 0.5},
        {type:'l', id: 1, pos: 2, neg: 3, value: 15},
        {type:'c', id: 1, pos: 4, neg: 0, value: 15},
        {type:'r', id: 1, pos: 4, neg: 0, value: 10}
    ];


    inverseWatkinsJohnson: PerksListObject[] = [
        //Inverse Watkins-Johnson
        {type:'v', id: 1, pos: 1, neg: 0, value: 20},
        {type:'q', id: 1, pos: 1, neg: 2, value: 0.5},
        {type:'q', id: 2, pos: 3, neg: 4, value: 0.5},
        {type:'d', id: 1, pos: 3, neg: 0, value: 0.5},
        {type:'d', id: 2, pos: 2, neg: 4, value: 0.5},
        {type:'l', id: 1, pos: 2, neg: 3, value: 15},
        {type:'c', id: 1, pos: 4, neg: 0, value: 15},
        {type:'r', id: 1, pos: 4, neg: 0, value: 10}

    ];
    util: Util = new Util();

    render() {
        {var buckR = this.util.mainFunction(this.buck)}
        {
            if (buckR.errorLog == "") {
                return (
                    <div style={{color: "white"}}>
                        Test<br/>
                        IVSB: 0 = {buckR.IVSB}<br/>
                        CCB:  0 = {buckR.CCB}<br/><br/>
                    </div>
                )
            }
            else {
                return (
                    <div style={{color: "white"}}>
                        Test<br/>
                        Error: {buckR.errorLog}<br/><br/>
                    </div>
                )
            }
        }
    };
}

export class Util {

    nodes:WireNode[] = [];

    mainFunction = (perksList:PerksListObject[]) => {
        this.nodes = [];
        try {
            for (let i = 0; i < perksList.length; i++) {
                if (this.searchForNodeExistance(perksList[i].pos)) {
                    //find the index of "that node" in the nodes list
                    let newPerksComp = new PerksComponent(perksList[i]);
                    let index = this.searchForNode(perksList[i].pos);
                    this.nodes[index].positives.push(newPerksComp);
                } else {
                    let newNode = new WireNode();
                    newNode.id = perksList[i].pos;
                    var newPerksComp = new PerksComponent(perksList[i]);
                    newNode.positives.push(newPerksComp);
                    this.nodes.push(newNode);
                }
                if (this.searchForNodeExistance(perksList[i].neg)) {
                    let newPerksComp = new PerksComponent(perksList[i]);
                    let index = this.searchForNode(perksList[i].neg);
                    this.nodes[index].negatives.push(newPerksComp);
                } else {
                    let newNode = new WireNode();
                    newNode.id = perksList[i].neg;
                    var newPerksComp = new PerksComponent(perksList[i]);
                    newNode.negatives.push(newPerksComp);
                    this.nodes.push(newNode);
                }
            }

            //console.log(this.nodes);

            this.sortNodes(this.nodes);
            this.assignVariables();
            this.assignBaseState();
            this.assignOnState();
            this.assignOffState();


        var errLog = this.interruptCatch("l1");
            let temp = this.energyCatch("l1");
            if (temp != ""){
                errLog = temp;
            }


            // IVSB
            if (errLog == ""){
                let ivsbPosOn = this.calcPosOnVoltage("l1");
                let ivsbNegOn = this.calcNegOnVoltage("l1");
                // Needs a way to compare values, remove cancellations, and sum multiples
                // let ivsbOn = this.removeCancellations(ivsbPosOn,ivsbNegOn);
                let ivsbPosOff = this.calcPosOffVoltage("l1");
                let ivsbNegOff = this.calcNegOffVoltage("l1");
                // let ivsbOff = this.removeCancellations(ivsbPosOff,ivsbNegOff);
                // let ivsb = this.assembleIVSB(ivsbOn,ivsbOff);

                // Assemble IVSB
                var ivsb = "D(";
                if ((ivsbPosOn != "0")&&(ivsbPosOn)) {
                    ivsb = ivsb + ivsbPosOn;
                }
                if ((ivsbNegOn != "0")&&(ivsbNegOn)) {
                    if (ivsbNegOn.charAt(0) === '-') {
                        ivsb = ivsb + " + " + ivsbNegOn.substr(1);
                    }
                    else {
                        ivsb = ivsb + " - " + ivsbNegOn;
                    }
                }
                ivsb = ivsb + ") + D'(";
                if ((ivsbPosOff != "0")&&(ivsbPosOff)) {
                    ivsb = ivsb + ivsbPosOff;
                }
                if ((ivsbNegOff != "0")&&(ivsbNegOff)) {
                    if (ivsbNegOff.charAt(0) === '-') {
                        ivsb = ivsb + " + " + ivsbNegOff.substr(1);
                    }
                    else {
                        ivsb = ivsb + " - " + ivsbNegOff;
                    }
                }
                ivsb = ivsb + ")";
            }


            //CCB

            temp = this.shortCatch("c1");
            if (temp != ""){
                errLog = temp;
            }
            temp = this.massCatch("c1");
            if (temp != ""){
                errLog = temp;
            }
            if (errLog == ""){
                let ccbPosOn = this.calcPosOnCurrent("c1");
                let ccbNegOn = this.calcNegOnCurrent("c1");
                let ccbPosOff = this.calcPosOffCurrent("c1");
                let ccbNegOff = this.calcNegOffCurrent("c1");
                // // Assemble CCB
                var ccb = "D(";
                if ((ccbPosOn != "0")&&(ccbPosOn)) {
                    ccb = ccb + ccbPosOn;
                }
                if ((ccbNegOn != "0")&&(ccbNegOn)) {
                    if (ccbNegOn.charAt(0) === '-') {
                        ccb = ccb + ccbNegOn;
                    }
                    else {
                        ccb = ccb + " + " + ccbNegOn;
                    }
                }
                ccb = ccb + ") + D'(";
                if ((ccbPosOff != "0")&&(ccbPosOff)) {
                    ccb = ccb + ccbPosOff;
                }
                if ((ccbNegOff != "0")&&(ccbNegOff)) {
                    if (ccbNegOff.charAt(0) === '-') {
                        ccb = ccb + ccbNegOff;
                    }
                    else {
                        ccb = ccb + " + " + ccbNegOff;
                    }
                }
                ccb = ccb + ")";
            }



            let r = new Results();
            r.CCB = ccb;
            r.IVSB = ivsb;
            r.errorLog = errLog;

            return r;
        } catch (error) {
            return null;
        }
    };


    searchForNodeExistance = (id:number):boolean => {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return true;
            }
        }
        return false;
    };

    searchForNode = (id:number):number => {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return i;
            }
        }
        return -1;
    };

    sortNodes = (nodeList:WireNode[]):boolean => {
        for (let i = 0; i < nodeList.length; i++) {
            let x = nodeList[i];
            let j = i - 1;
            while ((j >= 0) && (nodeList[j].id > x.id)) {
                nodeList[j + 1] = nodeList[j];
                j = j - 1;
            }
            nodeList[j + 1] = x;

        }
        return true;
    };


    assignVariables = ():boolean => {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                //Assumes one source
                if (this.nodes[i].positives[i2].typeAndId.indexOf("v") > -1) {
                    this.nodes[i].positives[i2].variable = "Vs";
                    this.nodes[i].positives[i2].current = "Is";
                }
                else if (this.nodes[i].positives[i2].typeAndId.indexOf("r") > -1) {
                    //Assumes 1 resistor, will need to give more parameters when nonideal or multiple resistors are introduced
                    this.nodes[i].positives[i2].variable = "Vo";
                    this.nodes[i].positives[i2].current = "Vo/R";
                }
                //This will be used for multiple components
                //Need a way of removing unused variables from strings
                /*else if ((this.nodes[i].positives[i2].typeAndId.indexOf("q") == -1)&&(this.nodes[i].positives[i2].typeAndId.indexOf("d") == -1)){
                 this.nodes[i].positives[i2].variable = "V" + this.nodes[i].positives[i2].typeAndId;
                 this.nodes[i].positives[i2].current = "I" + this.nodes[i].positives[i2].typeAndId;
                 }*/
                else if (this.nodes[i].positives[i2].typeAndId.indexOf("l") > -1) {
                    // this.nodes[i].positives[i2].variable = "V" + this.nodes[i].positives[i2].typeAndId;
                    this.nodes[i].positives[i2].current = "I" + this.nodes[i].positives[i2].typeAndId;
                }
            }
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                //Assumes one source
                if (this.nodes[i].negatives[i2].typeAndId.indexOf("v") > -1) {
                    this.nodes[i].negatives[i2].variable = "Vs";
                    this.nodes[i].negatives[i2].current = "Is";
                }
                else if (this.nodes[i].negatives[i2].typeAndId.indexOf("r") > -1) {
                    //Assumes 1 resistor, will need to give more parameters when nonideal or multiple resistors are introduced
                    this.nodes[i].negatives[i2].variable = "Vo";
                    this.nodes[i].negatives[i2].current = "Vo/R";
                }
                /* else if ((this.nodes[i].negatives[i2].typeAndId.indexOf("q") == -1)&&(this.nodes[i].negatives[i2].typeAndId.indexOf("d") == -1)){
                 this.nodes[i].negatives[i2].variable = "V" + this.nodes[i].negatives[i2].typeAndId;
                 this.nodes[i].negatives[i2].current = "I" + this.nodes[i].negatives[i2].typeAndId;
                 }*/
                else if (this.nodes[i].negatives[i2].typeAndId.indexOf("l") > -1) {
                    // this.nodes[i].negatives[i2].variable = "V" + this.nodes[i].negatives[i2].typeAndId;
                    this.nodes[i].negatives[i2].current = "I" + this.nodes[i].negatives[i2].typeAndId;
                }
            }
        }

        return true;
    };


    assignBaseState = ():boolean => {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] == this.nodes[0]) {
                // console.log(this.nodes[i]);
                this.nodes[i].onVoltage = "0";
                this.nodes[i].onCurrent = "0";
                this.nodes[i].offVoltage = "0";
                this.nodes[i].offCurrent = "0";
            }
            else {
                for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                    if ((this.nodes[i].positives[i2].typeAndId.indexOf("q") == -1) && (this.nodes[i].positives[i2].typeAndId.indexOf("d") == -1)) {
                        if (this.nodes[i].positives[i2].variable) {
                            if (this.nodes[i].onVoltage == "0") {
                                this.nodes[i].onVoltage = this.nodes[i].positives[i2].variable;
                            }
                            else {
                                this.nodes[i].onVoltage = this.nodes[i].onVoltage + " +" + this.nodes[i].positives[i2].variable;
                            }
                        }
                        if (this.nodes[i].positives[i2].current) {
                            if (this.nodes[i].onCurrent == "0") {
                                this.nodes[i].onCurrent = "-" + this.nodes[i].positives[i2].current;
                            }
                            else {
                                this.nodes[i].onCurrent = this.nodes[i].onCurrent + " -" + this.nodes[i].positives[i2].current;
                            }
                        }
                        if (this.nodes[i].positives[i2].variable) {
                            if (this.nodes[i].offVoltage == "0") {
                                this.nodes[i].offVoltage = this.nodes[i].positives[i2].variable;
                            }
                            else {
                                this.nodes[i].offVoltage = this.nodes[i].offVoltage + " +" + this.nodes[i].positives[i2].variable;
                            }
                        }
                        if (this.nodes[i].positives[i2].current) {
                            if (this.nodes[i].offCurrent == "0") {
                                this.nodes[i].offCurrent = "-" + this.nodes[i].positives[i2].current;
                            }
                            else {
                                this.nodes[i].offCurrent = this.nodes[i].offCurrent + " -" + this.nodes[i].positives[i2].current;
                            }
                        }
                    }
                }
                for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                    if ((this.nodes[i].negatives[i2].typeAndId.indexOf("q") == -1) && (this.nodes[i].negatives[i2].typeAndId.indexOf("d") == -1)) {
                        //console.log(this.nodes[i]);
                        if (this.nodes[i].negatives[i2].variable) {
                            if (this.nodes[i].onVoltage == "0") {
                                this.nodes[i].onVoltage = "-" + this.nodes[i].negatives[i2].variable;
                            }
                            else {
                                this.nodes[i].onVoltage = this.nodes[i].onVoltage + " -" + this.nodes[i].negatives[i2].variable;
                            }
                        }
                        if (this.nodes[i].negatives[i2].current) {
                            if (this.nodes[i].onCurrent == "0") {
                                this.nodes[i].onCurrent = this.nodes[i].negatives[i2].current;
                            }
                            else {
                                this.nodes[i].onCurrent = this.nodes[i].onCurrent + " +" + this.nodes[i].negatives[i2].current;
                            }
                        }
                        if (this.nodes[i].negatives[i2].variable) {
                            if (this.nodes[i].offVoltage == "0") {
                                this.nodes[i].offVoltage = "-" + this.nodes[i].negatives[i2].variable;
                            }
                            else {
                                this.nodes[i].offVoltage = this.nodes[i].offVoltage + " -" + this.nodes[i].negatives[i2].variable;
                            }
                        }
                        if (this.nodes[i].negatives[i2].current) {
                            if (this.nodes[i].offCurrent == "0") {
                                this.nodes[i].offCurrent = this.nodes[i].negatives[i2].current;
                            }
                            else {
                                this.nodes[i].offCurrent = this.nodes[i].offCurrent + " +" + this.nodes[i].negatives[i2].current;
                            }
                        }
                    }
                }
            }
        }
        //console.log(this.nodes);
        return true;
    };

    assignOnState = ():boolean => {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId.indexOf("q") > -1) {
                    let temp = this.nodes[i].positives[i2];
                    if (temp.pos == 0) {
                        this.nodes[temp.neg].onVoltage = "0";
                    }
                    else if (temp.neg == 0) {
                        this.nodes[temp.pos].onVoltage = "0";
                    }
                    else if ((this.nodes[temp.pos].onVoltage) && (this.nodes[temp.neg].onVoltage)) {
                        if (this.nodes[temp.pos].onVoltage == "0") {
                            this.nodes[temp.pos].onVoltage = this.nodes[temp.neg].onVoltage;
                        }
                        else if (this.nodes[temp.neg].onVoltage == "0") {
                            this.nodes[temp.neg].onVoltage = this.nodes[temp.pos].onVoltage;
                        }
                        else if (this.nodes[temp.neg].onVoltage.charAt(0) === '-') {
                            this.nodes[temp.pos].onVoltage = this.nodes[temp.pos].onVoltage + " " + this.nodes[temp.neg].onVoltage;
                            this.nodes[temp.neg].onVoltage = this.nodes[temp.pos].onVoltage;
                        }
                        else {
                            this.nodes[temp.pos].onVoltage = this.nodes[temp.pos].onVoltage + " +" + this.nodes[temp.neg].onVoltage;
                            this.nodes[temp.neg].onVoltage = this.nodes[temp.pos].onVoltage;
                        }
                    }
                    else if (this.nodes[temp.neg].onVoltage) {
                        this.nodes[temp.pos].onVoltage = this.nodes[temp.neg].onVoltage;
                    }
                    else if (this.nodes[temp.pos].onVoltage) {
                        this.nodes[temp.neg].onVoltage = this.nodes[temp.pos].onVoltage;
                    }
                    if (temp.pos == 0) {
                        this.nodes[temp.neg].onCurrent = "0";
                    }
                    else if (temp.neg == 0) {
                        this.nodes[temp.pos].onCurrent = "0";
                    }
                    else if ((this.nodes[temp.pos].onCurrent) && (this.nodes[temp.neg].onCurrent)) {
                        if (this.nodes[temp.pos].onCurrent == "0") {
                            this.nodes[temp.pos].onCurrent = this.nodes[temp.neg].onCurrent;
                        }
                        if (this.nodes[temp.neg].onCurrent != "0") {
                            if (this.nodes[temp.neg].onCurrent.charAt(0) === '-') {
                                this.nodes[temp.pos].onCurrent = this.nodes[temp.pos].onCurrent + " " + this.nodes[temp.neg].onCurrent;
                                this.nodes[temp.neg].onCurrent = this.nodes[temp.pos].onCurrent;
                            }
                            else {
                                this.nodes[temp.pos].onCurrent = this.nodes[temp.pos].onCurrent + " +" + this.nodes[temp.neg].onCurrent;
                                this.nodes[temp.neg].onCurrent = this.nodes[temp.pos].onCurrent;
                            }
                        }
                    }
                    else if (this.nodes[temp.neg].onCurrent) {
                        this.nodes[temp.pos].onCurrent = this.nodes[temp.neg].onCurrent;
                    }
                    else if (this.nodes[temp.pos].onCurrent) {
                        this.nodes[temp.neg].onCurrent = this.nodes[temp.pos].onCurrent;
                    }
                }
            }
        }
        return true;
    };

    assignOffState = ():boolean => {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId.indexOf("d") > -1) {
                    let temp = this.nodes[i].positives[i2];
                    if (temp.pos == 0) {
                        this.nodes[temp.neg].offVoltage = "0";
                    }
                    else if (temp.neg == 0) {
                        this.nodes[temp.pos].offVoltage = "0";
                    }
                    else if ((this.nodes[temp.pos].offVoltage) && (this.nodes[temp.neg].offVoltage)) {
                        if (this.nodes[temp.pos].offVoltage == "0") {
                            this.nodes[temp.pos].offVoltage = this.nodes[temp.neg].offVoltage;
                        }
                        else if (this.nodes[temp.neg].offVoltage == "0") {
                            this.nodes[temp.neg].offVoltage = this.nodes[temp.pos].offVoltage;
                        }
                        else if (this.nodes[temp.neg].offVoltage.charAt(0) === '-') {
                            this.nodes[temp.pos].offVoltage = this.nodes[temp.pos].offVoltage + " " + this.nodes[temp.neg].offVoltage;
                            this.nodes[temp.neg].offVoltage = this.nodes[temp.pos].offVoltage;
                        }
                        else {
                            this.nodes[temp.pos].offVoltage = this.nodes[temp.pos].offVoltage + " +" + this.nodes[temp.neg].offVoltage;
                            this.nodes[temp.neg].offVoltage = this.nodes[temp.pos].offVoltage;
                        }
                    }
                    else if (this.nodes[temp.neg].offVoltage) {
                        this.nodes[temp.pos].offVoltage = this.nodes[temp.neg].offVoltage;
                    }
                    else if (this.nodes[temp.pos].offVoltage) {
                        this.nodes[temp.neg].offVoltage = this.nodes[temp.pos].offVoltage;
                    }
                    if (temp.pos == 0) {
                        this.nodes[temp.neg].offCurrent = "0";
                    }
                    else if (temp.neg == 0) {
                        this.nodes[temp.pos].offCurrent = "0";
                    }
                    else if ((this.nodes[temp.pos].offCurrent) && (this.nodes[temp.neg].offCurrent)) {
                        if (this.nodes[temp.pos].offCurrent == "0") {
                            this.nodes[temp.pos].offCurrent = this.nodes[temp.neg].offCurrent;
                        }
                        if (this.nodes[temp.neg].offCurrent != "0") {
                            if (this.nodes[temp.neg].offCurrent.charAt(0) === '-') {
                                this.nodes[temp.pos].offCurrent = this.nodes[temp.pos].offCurrent + " " + this.nodes[temp.neg].offCurrent;
                                this.nodes[temp.neg].offCurrent = this.nodes[temp.pos].offCurrent;
                            }
                            else {
                                this.nodes[temp.pos].offCurrent = this.nodes[temp.pos].offCurrent + " +" + this.nodes[temp.neg].offCurrent;
                                this.nodes[temp.neg].offCurrent = this.nodes[temp.pos].offCurrent;
                            }
                        }
                    }
                    else if (this.nodes[temp.neg].offCurrent) {
                        this.nodes[temp.pos].offCurrent = this.nodes[temp.neg].offCurrent;
                    }
                    else if (this.nodes[temp.pos].offCurrent) {
                        this.nodes[temp.neg].offCurrent = this.nodes[temp.pos].offCurrent;
                    }
                }
            }
        }
        return true;
    };


    calcPosOnVoltage = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId == typeAndId) {
                    var ivsbPosOn = this.nodes[i].onVoltage;
                }
            }
        }

        return ivsbPosOn;
    };

    calcNegOnVoltage = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId) {
                    var ivsbNegOn = this.nodes[i].onVoltage;
                }
            }
        }

        return ivsbNegOn;
    };

    calcPosOffVoltage = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId == typeAndId) {
                    var ivsbPosOff = this.nodes[i].offVoltage;
                }
            }
        }

        return ivsbPosOff;
    };

    calcNegOffVoltage = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId) {
                    var ivsbNegOff = this.nodes[i].offVoltage;
                }
            }
        }

        return ivsbNegOff;
    };

    calcPosOnCurrent = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId == typeAndId) {
                    var ccbPosOn = this.nodes[i].onCurrent;
                }
            }
        }

        return ccbPosOn;
    };

    calcNegOnCurrent = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId) {
                    var ccbNegOn = this.nodes[i].onCurrent;
                }
            }
        }

        return ccbNegOn;
    };

    calcPosOffCurrent = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId == typeAndId) {
                    var ccbPosOff = this.nodes[i].offCurrent;
                }
            }
        }

        return ccbPosOff;
    };

    calcNegOffCurrent = (typeAndId:string):string => {

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId) {
                    var ccbNegOff = this.nodes[i].offCurrent;
                }
            }
        }

        return ccbNegOff;
    };

    //Catch shorted capacitors
    //It's a mess
    shortCatch = (typeAndId:string):string => {

        var qCheck;
        var qCheck2;
        var dCheck;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId == typeAndId) {
                    var tempPos = this.nodes[i];
                }
            }
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId) {
                    var tempNeg = this.nodes[i];
                }
            }
        }

        if (tempPos) {
            for (let i = 0; i < tempPos.positives.length; i++) {
                if (tempPos.positives[i].typeAndId.indexOf("q") != -1) {
                    qCheck = tempPos.positives[i].typeAndId;
                }
                if (tempPos.positives[i].typeAndId.indexOf("d") != -1) {
                    dCheck = tempPos.positives[i].typeAndId;
                }
            }
            for (let i = 0; i < tempPos.negatives.length; i++) {
                if (tempPos.negatives[i].typeAndId.indexOf("q") != -1) {
                    qCheck2 = tempPos.negatives[i].typeAndId;
                }
            }
        }

        if (tempNeg) {
            for (let i = 0; i < tempNeg.negatives.length; i++) {
                if (tempNeg.negatives[i].typeAndId == qCheck) {
                    return "Closing a switch should not short circuit the voltage of a capacitor (KVL).";
                }
                if (tempNeg.negatives[i].typeAndId == dCheck) {
                    return "Closing a switch should not short circuit the voltage of a capacitor (KVL).";
                }
            }
            for (let i = 0; i < tempNeg.positives.length; i++) {
                if (tempNeg.positives[i].typeAndId == qCheck2) {
                    return "Closing a switch should not short circuit the voltage of a capacitor (KVL).";
                }
            }
        }

        return "";
    };

    //Catch interrupted current for inductors
    interruptCatch = (typeAndId: string):string => {

        for (let i=0; i<this.nodes.length; i++){
            for (let i2=0; i2<this.nodes[i].positives.length; i2++){
                if (this.nodes[i].positives[i2].typeAndId == typeAndId){
                    var tempPos = this.nodes[i];
                }
            }
            for (let i2=0; i2<this.nodes[i].negatives.length; i2++){
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId){
                    var tempNeg = this.nodes[i];
                }
            }
        }
        if (tempPos) {
            var posCount = tempPos.positives.length + tempPos.negatives.length;
        }
        if (tempNeg) {
            var negCount = tempNeg.positives.length + tempNeg.negatives.length;
        }

        if (posCount == 2) {
            for (let i = 0; i < tempPos.positives.length; i++) {
                if ((tempPos.positives[i].typeAndId.indexOf("q") != -1)) {
                    return "Opening a switch should not interrupt the current of an inductor (KCL)";
                }
            }

            for (let i = 0; i < tempPos.negatives.length; i++) {
                if ((tempPos.negatives[i].typeAndId.indexOf("q") != -1)) {
                    return "Opening a switch should not interrupt the current of an inductor (KCL)";
                }
            }
        }

        if (negCount == 2) {
            for (let i = 0; i < tempNeg.positives.length; i++) {
                if (tempNeg.positives[i].typeAndId.indexOf("q") != -1) {
                    return "Opening a switch should not interrupt the current of an inductor (KCL)";
                }
            }

            for (let i = 0; i < tempNeg.negatives.length; i++) {
                if ((tempNeg.negatives[i].typeAndId.indexOf("q") != -1)) {
                    return "Opening a switch should not interrupt the current of an inductor (KCL)";
                }
            }
        }

        return "";
    };

    massCatch = (typeAndId: string):string => {

        var vCheck;
        var vCheck2;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let i2 = 0; i2 < this.nodes[i].positives.length; i2++) {
                if (this.nodes[i].positives[i2].typeAndId == typeAndId) {
                    var tempPos = this.nodes[i];
                }
            }
            for (let i2 = 0; i2 < this.nodes[i].negatives.length; i2++) {
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId) {
                    var tempNeg = this.nodes[i];
                }
            }
        }

        if (tempPos) {
            for (let i = 0; i < tempPos.positives.length; i++) {
                if (tempPos.positives[i].typeAndId.indexOf("v") != -1) {
                    vCheck = tempPos.positives[i].typeAndId;
                }
            }
            for (let i = 0; i < tempPos.negatives.length; i++) {
                if (tempPos.negatives[i].typeAndId.indexOf("v") != -1) {
                    vCheck2 = tempPos.negatives[i].typeAndId;
                }
            }
        }

        if (tempNeg) {
            for (let i = 0; i < tempNeg.negatives.length; i++) {
                if (tempNeg.negatives[i].typeAndId == vCheck) {
                    return "• In steady state, the average current flow in a capacitor should be zero (conservation of mass)";
                }
            }
            for (let i = 0; i < tempNeg.positives.length; i++) {
                if (tempNeg.positives[i].typeAndId == vCheck2) {
                    return "• In steady state, the average current flow in a capacitor should be zero (conservation of mass)";
                }
            }
        }
        return "";
    };

    energyCatch = (typeAndId: string):string => {

        for (let i=0; i<this.nodes.length; i++){
            for (let i2=0; i2<this.nodes[i].positives.length; i2++){
                if (this.nodes[i].positives[i2].typeAndId == typeAndId){
                    var tempPos = this.nodes[i];
                }
            }
            for (let i2=0; i2<this.nodes[i].negatives.length; i2++){
                if (this.nodes[i].negatives[i2].typeAndId == typeAndId){
                    var tempNeg = this.nodes[i];
                }
            }
        }
        if (tempPos) {
            var posCount = tempPos.positives.length + tempPos.negatives.length;
        }
        if (tempNeg) {
            var negCount = tempNeg.positives.length + tempNeg.negatives.length;
        }

        if (posCount == 2) {
            for (let i = 0; i < tempPos.positives.length; i++) {
                if ((tempPos.positives[i].typeAndId.indexOf("l") != -1) && (tempPos.positives[i].typeAndId != typeAndId)) {
                    return "In steady state, the average voltage across an inductor should be zero (conservation of energy)";
                }
            }

            for (let i = 0; i < tempPos.negatives.length; i++) {
                if ((tempPos.negatives[i].typeAndId.indexOf("l") != -1)&&(tempPos.negatives[i].typeAndId!=typeAndId)) {
                    return "In steady state, the average voltage across an inductor should be zero (conservation of energy)";
                }
            }
        }

        if (negCount == 2) {
            for (let i = 0; i < tempNeg.positives.length; i++) {
                if ((tempNeg.positives[i].typeAndId.indexOf("l") != -1)&&(tempNeg.positives[i].typeAndId!=typeAndId)) {
                    return "In steady state, the average voltage across an inductor should be zero (conservation of energy)";
                }
            }

            for (let i = 0; i < tempNeg.negatives.length; i++) {
                if ((tempNeg.negatives[i].typeAndId.indexOf("l") != -1&&(tempNeg.negatives[i].typeAndId!=typeAndId))) {
                    return "In steady state, the average voltage across an inductor should be zero (conservation of energy)";
                }
            }
        }

        return "";
    };

}




class Results {
    IVSB: string = "0";
    CCB: string = "0";
    errorLog: string = "";
}

class WireNode {
    id: number;
    onVoltage: string = "0";
    onCurrent: string = "0";
    offVoltage: string = "0";
    offCurrent: string = "0";
    positives: PerksComponent[] = [];
    negatives: PerksComponent[] = [];
}

export class PerksListObject {
    type: string;
    id: number; //not unique
    pos: number;
    neg: number;
    value: number;
}

class PerksComponent {
    constructor (input: PerksListObject) {
        this.typeAndId = input.type +input.id;
        this.pos = input.pos;
        this.neg = input.neg;
        this.value = input.value;
    }

    typeAndId: string; //v1, r1, q1
    pos: number;
    neg: number;
    value: number;
    variable: string;
    current: string;
}

//this is just here to show extensions and
class Resistor extends PerksComponent {

}
