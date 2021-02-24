global.activeFurniture/* VR Scene component. May be abstracted, similar to others in /routes */
global.dynamicSceneVersion = "0.0.6";
import React, {Component} from "react";
import 'platform';
import aframe from 'aframe';
import axios from 'axios';
require('aframe-extras').registerAll();
import 'aframe-physics-system';
import '../aframe/component/kinematic-body'
import '../aframe/component/aframe-always-fullscreen-component';
import '../aframe/component/camera-height-fix';
import '../aframe/component/multitouch-look-controls'
import '../aframe/component/gamma-fix';
import '../components/scene-logger';
import './home.css';

// import '../aframe/component/touch-controls';
import {Entity, Scene} from 'aframe-react';
import aframeDraggableComponent from '../aframe/component/click-drag-component';
aframeDraggableComponent(aframe);
import {Selector} from '../components/selector.js';
import {Furniture} from '../components/furniture.js';
import Mailto from '../components/react-mailto.js';


export class DynamicScene extends Component{
    constructor(props) {
        super();
        this.state = {
            debug: false,
            loading: false,
            data: {},
            furnitures: {},
            client_data: {}
        };
    }

    async getSceneJSON(){
        let request_url = '/api/scene'
        let id = this.props.match.params.id;
        if(id){
            request_url = request_url.concat('/' + id);
        }

        try{
            const res = await axios(request_url);
            let data = await res.data;
            return data;
        } catch(e){
            console.log(e);
            return null;
        }
    };

    async getClientJSON(){
        let request_url = '/api/client'
        let id = this.state.data.info.client_id;
        if (id) {
          request_url = request_url.concat('/' + id);
        }
        console.log(request_url)

        try {
            const res = await axios(request_url);
            let data = await res.data;
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async componentDidMount () {
        if (this.state.debug) {
            alert("Warning!  Debug mode is on.  Disable before production. Dynamic Scene version " +
                global.dynamicSceneVersion + ".");
        }
        console.log("Virtision Engine Version 0.0.1");

        // Fixes keyboard listener so that arrow keys don't scroll the page that embeds our iframe.
        // Audit this in the future to check for accessibility issues.
        window.addEventListener("keydown", (e) => {
            e.preventDefault();
            e.stopPropagation();
        })
    }

    /**
     * Loads data from api, if valid.
     * If not valid, null is returned to
     * display an error in render().
     * TODO: Update to componentDidMount in React 17 */
     async componentWillMount(){
         console.log("Dynamic Scene will mount");
         this.setState({loading: true});
         await this.getSceneJSON()
             .then(async (data) =>{
                 if(data.length != 0){
                     let seen = [];
                     let promises = [];
                     let component = this;
                     if(data['0'].rooms.layout){
                         Object.keys(data['0'].rooms.layout).forEach(function(key){
                             let id = data['0'].rooms.layout[key].id;
                             if (seen.includes(id))
                                 return;
                             seen.push(id);
                             let request_url = '/api/furniture/'.concat(id);
                             promises.push(axios.get(request_url));
                         });
                         await axios.all(promises).then(function(results){
                             let furnitures = {};
                             results.forEach(function(res){
                                 furnitures[res.data[0]._id] = res.data[0];
                             });
                             component.setState({
                                 data: data['0'],
                                 loading: false,
                                 furnitures: furnitures
                             });
                         });
                     }else{
                         component.setState({
                             data: data['0'],
                             loading: false
                         });
                     }
                     await this.getClientJSON()
                         .then((data) =>{
                             if(data.length != 0){
                                 this.setState({
                                     client_data: data[0],
                                     loading:false
                                 });
                             }
                         })
                 } else {
                    this.setState({
                         data: null,
                        loading: false
                     });
                 }
             });
     }

     importFurnitureModels = (key) => {
         let _id = this.state.data.rooms.layout[key].id;
         if(document.getElementById(_id) != null)
             return null;
         let data = this.state.furnitures[_id];
         return <a-asset-item
                     id={_id + "-obj"}
                     src={data.model}
                 />;
     }

     importFurnitureMaterials = (key) =>{
         let _id = this.state.data.rooms.layout[key].id;
         if(document.getElementById(_id) != null)
             return null;
         let data = this.state.furnitures[_id];
         return <a-asset-item
                     id={_id + "-mtl"}
                     src={data.material}
                 />;
     }

     renderFurniture = (key) => {
         // console.log('rendering ' + key);
         let furniture_data = this.state.data.rooms.layout[key];
         let model_src = "obj: #" + furniture_data.id + "-obj;" + " mtl: #" + furniture_data.id + "-mtl";

         return <Selector
                     innerSrc="#selector_inner"
                     outerSrc="#selector_outer"
                     rotation={furniture_data.rotation}
                     position={furniture_data.position}
                     scale="1 1 1"
                     radius={furniture_data.radius}
                     customKey={key}
                 >
                     <Furniture
                         customKey={key}
                         src={model_src}
                         scale="1 1 1"
                         rotation={furniture_data.inner_rotation}
                         position={furniture_data.inner_position}
                     />
                 </Selector>
     }

    render(){

        if(this.state.loading){
            return <div/>;
        }

        let scene_data = this.state.data;
        if(this.state.data == null || this.state.data.length == 0 || scene_data == null){
            console.log("ERROR: Requested scene does not exist.");
            return <div class="sceneError">Requested Scene Does Not Exist.  Return to <a href="https://virtision.com">Virtision homepage</a>.</div>
        }

        let client_data = this.state.client_data;

        // const camera_position = "-1.65 0 -5.3";

        const model_scale = 1;
        const ground_scale = model_scale * 5;
        const ground_repeat = ground_scale * 50;
        const sky_scale = ground_scale * 40;
        const model_width = scene_data.rooms.model_width;
        const model_length = scene_data.rooms.model_length;
        const model_height = scene_data.rooms.height;
        const fl_cl_rel_x = scene_data.rooms.ceiling_rel_x;
        const fl_cl_rel_z = scene_data.rooms.ceiling_rel_z;
        const fl_cl_repeat = scene_data.rooms.floor_repeat;
        const ceiling_depth = scene_data.rooms.ceiling_depth;
        const ceiling_uri = scene_data.rooms.ceiling_uri;
        const ceiling_height = scene_data.rooms.ceiling_height;
        const ceiling_width = scene_data.rooms.ceiling_width;
        const ceiling_position = scene_data.rooms.ceiling_position;
        const landscape_uri = scene_data.exterior.landscape_uri;
        const sky_uri = scene_data.exterior.sky_uri;
        const floor_uri = scene_data.rooms.floor_uri;
        const floor_length = scene_data.rooms.length;
        const floor_height = scene_data.rooms.floor_height;
        const floor_width = scene_data.rooms.floor_width;
        const floor_position = scene_data.rooms.floor_position;
        const model_mtl_uri = scene_data.rooms.model_mtl_uri;
        const model_obj_uri = scene_data.rooms.model_obj_uri;
        const model_position = scene_data.exterior.position;
        const model_rotation = scene_data.exterior.rotation;
        const user_position = scene_data.user.position;
        const user_rotation = scene_data.user.rotation;
        const user_height = scene_data.user.height;
        const camera_position = "-1.65 0 -5.3";
        const email_addr = client_data.email;
        const email_content = {
            "subject":"[Virtision] Interested in " + scene_data.info.address,
            "body":"Dear " + client_data.full_name + ", " +
                "\r\n I'm interested in leasing your unit at " + scene_data.info.address +"." +
                "\r\n Can you send me more details about it? " +
                "\r\n Thank you!"
        };

        var wrapperDivStyle = {
            height: '100%',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '100%'
        }

        let furniture_keys = []
        if(this.state.data.rooms.layout){
            furniture_keys = Object.keys(this.state.data.rooms.layout);
        }

        window.activeFurniture = undefined;

        return(
            <div style={wrapperDivStyle}>
                <a-scene
                    embedded /* Necessary for iOS Safari/Chrome scroll-to-fullscreen */
                    physics="debug: false"
                    always-fullscreen="platform: all; debug: false"
                    vr-mode-ui="enabled: true"
                    gamma-fix
                >

                    <a-entity light="type: ambient;
                                color: #FFFFFF;
                               intensity: 1.0;
                               shadowCameraVisible: false"></a-entity>
                    <a-entity light="type: directional;
                                color: #DFEFFF;
                               intensity: 0.7;
                               shadowCameraVisible: false"
                        position="-0.5 1 1"></a-entity>


                    <a-assets>
                        <img
                            id="floorTexture"
                            src={floor_uri}
                        />
                        <img
                            id={"grassTexture"}
                            src={landscape_uri}
                        />
                        <img
                            id={"ceilingTexture"}
                            src={ceiling_uri}
                        />
                        <img
                            id="skyTexture"
                            src={sky_uri}
                        />
                        <img
                            id="selector"
                            src="https://s3.amazonaws.com/virtision-tech-assets/images/furniture_selector.png"
                        />
                        <img
                            id="dpad_outer"
                            src="https://s3.amazonaws.com/virtision-tech-assets/images/selector_outer.png"
                        />
                        <img
                            id="dpad_inner"
                            src="https://s3.amazonaws.com/virtision-tech-assets/images/selector_inner.png"
                        />
                        <img
                            id="selector_outer"
                            src="https://s3.amazonaws.com/virtision-tech-assets/images/selector_outer.png"
                        />
                        <img
                            id="selector_inner"
                            src="https://s3.amazonaws.com/virtision-tech-assets/images/selector_inner.png"
                        />
                        <a-asset-item
                            id="unit-mtl"
                            src={model_mtl_uri}
                        />
                        <a-asset-item
                            id="unit-obj"
                            src={model_obj_uri}
                        />

                        {furniture_keys.map(this.importFurnitureModels)}
                        {furniture_keys.map(this.importFurnitureMaterials)}

                    </a-assets>
                    {/* The Sky */}
                    <Entity
                        visible={sky_uri != ''}
                        primitive={"a-sky"}
                        src={"#skyTexture"}
                        radius={sky_scale}
                    />

                    {/* The Floor */}
                    <Entity
                        visible={landscape_uri != ''}
                        primitive={"a-plane"}
                        src={"#grassTexture"}
                        rotation={"-90 0 0"}
                        repeat={`${ground_repeat} ${ground_repeat}`}
                        height={"100"}
                        opacity="0"
                        width={"100"}
                        scale={`${ground_scale} ${ground_scale} 1`}
                        shadow="receive: true"
                    />

                    {/* Model Unit */}
                    <Entity
                        obj-model={"obj: #unit-obj; mtl: #unit-mtl;"}
                        position={model_position}
                        rotation={model_rotation}
                        scale={"1 1 1"}
                        shadow="receive: true"
                    >
                        <a-box
                            src="#ceilingTexture"
                            color="#FFFFFF"
                            depth={ceiling_depth}
                            width={ceiling_width}
                            height={ceiling_height}
                            rotation="-90 0 0"
                            side="double"
                            position={ceiling_position}
                            repeat={`${fl_cl_repeat} ${fl_cl_repeat}`}
                        />
                        <a-plane
                            src="#floorTexture"
                            width={floor_width}
                            height={floor_height}
                            rotation="-90 0 0"
                            side="double"
                            position={floor_position}
                            repeat={`${fl_cl_repeat} ${fl_cl_repeat}`}
                        >
                        </a-plane>
                    </Entity>

                    {furniture_keys.map((key) => this.renderFurniture(key))}

                {/* Player Camera View */}
                  <a-entity
                      position="0 0 0"
                  >
                        <a-camera
                            universal-controls="movementAcceleration: 25;"
                            multitouch-look-controls
                            look-controls-enabled="false"
                            camera-height-fix
                            scene-logger
                            user-height={user_height}
                            position={user_position}
                            rotation={user_rotation}
                            daydream-controls="hand: right"
                        >
                            <a-cursor
                                cursor="fuse: false"
                                material="color: white; shader: flat; opacity: 0.75"
                                geometry="radiusInner: 0.005; radiusOuter: 0.007"
                            />
                        </a-camera>
                    </a-entity>
                </a-scene>
                <Mailto email={email_addr} className="mailbtn" headers={email_content}>
                    <img src="https://s3.amazonaws.com/virtision-tech-assets/images/emailicon.png"/>
                </Mailto>
            </div>
        )
    };

}

export default DynamicScene;
