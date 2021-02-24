global.demoVersion = "0.0.2";
global.debug = true;
/* Just a friendly note from your resident doofus: if testing on localhost, be sure to enable
 * the debug flag, because otherwise the iframe will use the production version.  Just saving you some hairs.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './demo.css';
import Navbar from './Navbar.js';

export class Demo extends Component {

    constructor(props){
        super(props);
        this.state = {
            debug: false,
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render(){
        let iconURI = "https://i.pinimg.com/originals/eb/7a/a2/eb7aa226dd0172a3a2c12b20c7bd07cc.png";

        let debugSrc = "scene/g5jeh";
        let productionSrc = "https://www.virtision.com/scene/g5jeh";
        let iframeSrc = this.state.debug ? debugSrc : productionSrc;

        if (this.state.debug) {
            alert("Warning!  Debug mode is on.  Disable before production.  Demo version " + global.demoVersion +
                ". Dynamic Scene version " + global.dynamicSceneVersion + ".");
        }
        return (
          <div>
              <div className="navBar">

                  <Navbar />
              </div>
              <div id="note">
                Below is a demo showing how a Virtision scene can be displayed on your Real Estate website. <a href ="/#contact">Contact us</a> for more.
              </div>
              <div className="content_demo">
                  <div className="row">
                      <div className="column-10">
                          <img src="https://s3.amazonaws.com/virtision-tech-assets/images/demo1.jpg"></img>
                      </div>
                      <div className="column">
                          <img src="https://s3.amazonaws.com/virtision-tech-assets/images/demo2.jpg"></img>
                          <img src="https://s3.amazonaws.com/virtision-tech-assets/images/demo3.jpg"></img>
                          <img src="https://s3.amazonaws.com/virtision-tech-assets/images/demo4.jpg"></img>
                          <img src="https://s3.amazonaws.com/virtision-tech-assets/images/demo5.jpg"></img>
                      </div>
                  </div>
              </div>
              <div className="unitLocation">

                    <h1 className="unitName">Golden Corn Apartments</h1>
                  <div className="row">
                      <h3 className="unitAddress"><i class="material-icons">location_on</i> 615 S Wright St, Champaign IL, 61820</h3>
                  </div>
                  <div className="row ">
                    <h3 className="sub-title"> 2 Bed / 2 Bath</h3>
                  </div>
                  <div className="content_demo aboutdemo">
                      <p>Brand new building with one of the best locations on campus. Located across the street from University Campus and just a short stride to any restaurant on Green street. Many of these apartments and the rooftop patio have great views of Campus.</p>
                  </div>

                                <div className="content_demo">
                                        <iframe className="embeddedTour" src={iframeSrc} allowfullscreen="true"></iframe>
                                </div>

                                <div className="content_demo aboutdemo">
                                    <h3 className=" headings"><i class="material-icons">lightbulb_outline</i> Utilities Included</h3>
                                  <div className="row">
                                    <div className="col">
                                      <p>• Electricity</p>
                                      <p>• Water</p>
                                      <p>• High Speed Wired Internet</p>
                                    </div>
                                    <div className="col">
                                      <p>• Trash Removal</p>
                                      <p>• Pest Control</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="content_demo aboutdemo">
                                    <h3 className=" headings"><i class="material-icons">build</i> Amenities Included</h3>
                                      <div className="row">
                                        <div className="col">
                                          <p>• Wire Shelving in each Closet</p>
                                          <p>• Wall Mounted Bookcases</p>
                                          <p>• Plank Flooring</p>
                                        </div>
                                        <div className="col">
                                          <p>• On-Site Laundry Facilities</p>
                                          <p>• Granite Countertops</p>
                                          <p>• Furnished</p>
                                        </div>
                                      </div>
                                </div>

              </div>


          </div>
        )
    }
}

export default Demo;
