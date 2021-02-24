import React, {Component} from "react";
import aframe from 'aframe';

import {Entity} from 'aframe-react';

export class Furniture extends Component{

    constructor(props){
        super(props);
    }

    toggleSelector = (ele, val) => {
        ele.setAttribute("opacity", val);
        ele.setAttribute('click-drag', 'isActive', Boolean(val));
    }

    deselect = () => {
        this.toggleState();
    }

    toggleState = () => {
        if(AFRAME.utils.device.isMobile()){
            return;
        }
        if (window.activeFurniture != this){
            window.activeFurniture ? window.activeFurniture.deselect() : undefined ;
            window.activeFurniture = this;
        }
        const outerCirc = document.getElementById(this.props.customKey);
        const innerCirc = outerCirc.parentEl;
        let val = parseInt(outerCirc.getAttribute("opacity"));
        this.toggleSelector(outerCirc, Math.abs(val - 1));
        this.toggleSelector(innerCirc, Math.abs(val - 1));
        if(val>0){
            window.activeFurniture = undefined;
        }
    }

    render(){
        return <Entity
            obj-model={this.props.src}
            scale={this.props.scale}
            rotation={this.props.rotation}
            position={this.props.position}
            events={{click: (event) => {this.toggleState()}}}
        />
    }
}
