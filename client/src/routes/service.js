import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import './subpage.css';
import Navbar from './Navbar.js';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export class Service extends Component {

  constructor(props){
      super(props);
  }

  render(){

      return (
        <div className="">


            <div className="navBar">
            <Navbar />
            </div>
            <div className="subpage service">
            <div className="sub_container">

                  <h2 className="roboto aboutTitle sloganAboveTile">
                    Virtual Tour Plans
                  </h2>

                    <div className="card">
                    <div className="row2 noMargin ">
                    <div className="col2">

                        <h2 className="sourceSansPro aboutText"></h2>

                      </div>
                      <div className="col2">

                          <h2 className="sourceSansPro planName">Lite Plan</h2>


                        </div>
                      <div className="col2 blueBG">

                          <h2 className="sourceSansPro planName">Business Plan</h2>


                      </div>
                      <div className="col2">

                          <h2 className="sourceSansPro planName">Enterprise Plan</h2>

                        </div>
                          </div>
                          <div className="row2 rowBorder">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                    Who it's for



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro aboutText">

                        For the hobbyist and small presentations



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro aboutText">

                    Perfect for Most Companies



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro aboutText">

                      For Enterprise-level service



                          </p>

                          </div>
                          </div>

                          <div className="row2 rowBorder">
                          <div className="col2 ">
                          <p className="sourceSansPro tableTitle">

                      Price per Floor Plan

                      </p>



                          </div>
                          <div className="col2">
                          <h2 className="roboto sloganAboveTile plan">$1,199.99</h2>


                          </div>
                          <div className="col2">
                          <h2 className="roboto sloganAboveTile plan">$1,499.99</h2>


                          </div>
                          <div className="col2">
                          <h2 className="roboto sloganAboveTile plan">$4,999.99</h2>


                          </div>
                          </div>

                          <div className="row2 rowBorder">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                    Platform Fee



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                        $50/month + (1$ per thousand views)



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                      $50/month + (1$ per thousand views)



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                        $50/month + (1$ per thousand views)



                          </p>

                          </div>
                          </div>

                                                    <div className="row2 rowBorder">
                                                    <div className="col2">
                                                    <p className="sourceSansPro tableTitle">

                                            Platform Restrictions



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro">

                                                Up to 20 Spaces


                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro">

                                                Up to 50 Spaces



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro">

                                                  Up to 50 Spaces



                                                    </p>

                                                    </div>
                                                    </div>
                                                    <div className="row2 rowBorder">
                                                    <div className="col2">
                                                    <p className="sourceSansPro tableTitle">

                                              Photorealistic Rendering



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro">

                                                No



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro">

                                                High Quality



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro">

                                                High Quality



                                                    </p>

                                                    </div>
                                                    </div>
                          <div className="row2 rowBorder">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                    Scene Size



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro scenesize">

                      750 ft&#178;



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro scenesize">

                    1500 ft&#178;



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro scenesize">

                    2000 ft&#178;



                          </p>

                          </div>
                          </div>
                          <div className="row2 rowBorder">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                    Turnaround Time



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                      4 Weeks



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                      4 Weeks



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro green">

                      2 Weeks



                          </p>

                          </div>
                          </div>
                          <div className="row2 rowBorder">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                      Specialized Tech Support



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro red">

                      No



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro red">

                      No



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro green">

                      Yes ($100/hr)



                          </p>

                          </div>
                          </div>
                          <div className="row2 rowBorder">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                      Revisions **



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro red">

                      No



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                      2**



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro">

                      10**



                          </p>

                          </div>
                          </div>

                                                    <div className="row2 rowBorder">
                                                    <div className="col2">
                                                    <p className="sourceSansPro tableTitle">

                                              Desktop

                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro green">

                                                Yes

                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro green">

                                                Yes
                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro green">

                                                Yes

                                                    </p>

                                                    </div>
                                                    </div>

                                                    <div className="row2 rowBorder">
                                                    <div className="col2">
                                                    <p className="sourceSansPro tableTitle">

                                              Mobile



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro green">

                                                Yes



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro green">

                                                Yes



                                                    </p>

                                                    </div>
                                                    <div className="col2">
                                                    <p className="sourceSansPro green">

                                                Yes



                                                    </p>

                                                    </div>
                                                    </div>
                          <div className="row2">
                          <div className="col2">
                          <p className="sourceSansPro tableTitle">

                    VR



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro green">

                      Yes



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro green">

                      Yes



                          </p>

                          </div>
                          <div className="col2">
                          <p className="sourceSansPro green">

                      Yes



                          </p>

                          </div>
                          </div>
                        <div className="row">  <p className="sourceSansPro">* Prices are estimations; factors such as furniture selection, square footage, etc. may affect true price. A precise quote can be requested by <a href="/contact">contacting us</a><br /> <br />
** Revisions are not included in the estimated Turnaround Time. All revisions are subject to approval by Virtision. <br /><br /> <br /><br />
                        </p>

                      </div>
                      </div>


                    </div>
            </div>


        </div>
      )
  }
}

export default Service;
