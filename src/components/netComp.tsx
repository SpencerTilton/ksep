import * as React from 'react';

export function getRealList(perksList:PerksListObject[])  {
        var holdingL;
        var holdingC;
        var holdingD;
        var holdingT;
        var circuit = "Circuit z";
        for (let i = 0; i < perksList.length; i++) {
            let temp;
            if (perksList[i].type == "v") {
                temp = perksList[i].type + perksList[i].id + " "
                    + perksList[i].pos + " " + perksList[i].neg + " DC "
                    + perksList[i].value + "z";
                circuit = circuit.concat(temp);
            } else if (perksList[i].type == "q") {
                temp = "sw" + perksList[i].id + " "
                    + perksList[i].pos + " " + perksList[i].neg
                    + " 10 0 switch1z";
                circuit = circuit.concat(temp);
                holdingD = perksList[i].value;
            }else if (perksList[i].type == "l") {
                temp = perksList[i].type + perksList[i].id + " "
                    + perksList[i].pos + " " + perksList[i].neg + " "
                    + perksList[i].value + "z";
                circuit = circuit.concat(temp);
                holdingL = perksList[i].pos + "," + perksList[i].neg;
            } else if (perksList[i].type == "c") {
                temp = perksList[i].type + perksList[i].id + " "
                    + perksList[i].pos + " 100 "
                    + perksList[i].value + "z";
                circuit = circuit.concat(temp);
                if (perksList[i].pos != 0){
                    holdingC = perksList[i].pos;
                }
                else {
                    holdingC = perksList[i].neg;
                }
                temp = "V" + perksList[i].type + perksList[i].id
                    + " 100 " + perksList[i].neg + " DC 0 z";
                circuit = circuit.concat(temp);
            } else if (perksList[i].type == "d") {
                temp = perksList[i].type + perksList[i].id + " "
                    + perksList[i].pos + " " + perksList[i].neg
                    + " DSCHz";
                circuit = circuit.concat(temp);
                holdingT = perksList[i].value;
            } else {
                temp = perksList[i].type + perksList[i].id + " "
                    + perksList[i].pos + " " + perksList[i].neg + " "
                    + perksList[i].value + "z";
                circuit = circuit.concat(temp);
            }
        }
        let timing = holdingD*holdingT;
        let domain = 2*holdingT;
        let step = holdingT/100;
        let temp = "VCTRL 10 0 PULSE(0V 5V 0 0.01US 0.01US " + timing +"US " + holdingT +"US)z"
            + "R10 10 0 1MEGz.MODEL switch1 sw Vt=1 Vh=0.2 RON=0.01 ROFF=1MEGz"
            + ".MODEL DSCH D( IS=0.0002 RS=0.05 CJO=5e-10  )z.TRAN " + step + "US 5000US " + (5000-domain) +"US 0.1USz"
            + ".controlzset filetype=asciiz" + "runzPLOT V(" + holdingC + ") V(" + holdingL
            + ") I(Vc1) I(l1)zwrite coords.txt V(" + holdingC + ") V(" + holdingL+ ") I(Vc1) I(l1)z" + ".endcz.end";
        circuit = circuit.concat(temp);

        return circuit;
    }



export class PerksListObject {
    type: string;
    id: number; //not unique
    pos: number;
    neg: number;
    value: number;
}