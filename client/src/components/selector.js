import React, {Component} from "react";
import aframe from 'aframe';
//import aframeDraggableComponent from '../aframe/component/click-drag-component';
//aframeDraggableComponent(aframe);

export class Selector extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let clickDragValInner = AFRAME.utils.device.isMobile() ? "" : "stickToGround: true; enableTranslation: true; enableRotation: false; intersectRank: 2;";
        let clickDragValOuter = AFRAME.utils.device.isMobile() ? "" : "stickToGround: true; enableTranslation: false; enableRotation: true; rotateZOnly: true; intersectRank: 1;";
        return <a-image
            src={this.props.innerSrc}
            side="double"
            rotation={this.props.rotation}
            position={this.props.position}
            scale={this.props.scale}
            height={this.props.radius}
            width={this.props.radius}
            opacity="0"
            click-drag={clickDragValInner}>
            <a-image
                id={this.props.customKey}
                src={this.props.outerSrc}
                side="double"
                rotation="0 0 0"
                position="0 0 0.01"
                scale="1 1 1"
                height={this.props.radius * 1.5}
                width={this.props.radius * 1.5}
                opacity="0"
                click-drag={clickDragValOuter}>

                    {this.props.children}
                </a-image>
            </a-image>
    }
}
