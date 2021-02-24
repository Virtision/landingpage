import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './old.css';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Contact from './contact.js';
import Navbar from './Navbar.js';
const { detect } = require('detect-browser');
const smoothScroll = require('smoothscroll');

export class OldProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeDiv: 'intro',
            divNames: ['intro', 'about', 'video','client', 'quote', 'contact'],
            currImg: "desktop",
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidMount(){
        document.getElementById("loadingOverlay").classList.toggle('hidden', true);
        window.addEventListener("resize", this.updateOffsets);
        let _browser = detect();
        let _deviceData = {
            "platform": navigator.platform,
            "browser": _browser.name
        };
        console.log(JSON.stringify(_deviceData));
        let offsets = this.getOffsetTops(this.state.divNames);
        let activeDiv = this.getActiveDiv(offsets);
        this.setState({ divOffsets: offsets,
                        activeDiv: activeDiv
                        });
        setInterval(() => {
            let _currImg = this.state.currImg;
            let _nextImg = this.state.images[_currImg].next;
            let _newSrc = "url(" + this.state.images[_nextImg].src + ")";
            document.getElementById('multiPlatform').style.backgroundImage = _newSrc;
            this.setState({currImg: _nextImg});
        }, 4000)
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateOffsets);
    }

    updateOffsets = () => {
        let newOffsets = this.getOffsetTops(this.state.divNames);
        this.setState({divOffsets: newOffsets});
    }

    getOffsetTops = (divs) => {
        let result = [];
        divs.forEach(function(item){
            result.push(document.getElementById(item).offsetTop);
        });
        return result;
    }

    getActiveDiv = (divOffsets) => {
        let numDivs = this.state.divNames.length;
        let lastDiv = this.state.divNames[numDivs - 1];
        if(window.scrollY + window.innerHeight === document.body.scrollHeight || window.scrollY + window.innerHeight === document.documentElement.scrollHeight)
            return lastDiv;
        let bottom = divOffsets[numDivs - 1];
        for (let i = numDivs - 2; i >= 0; i--){
            let key = this.state.divNames[i];
            let top = divOffsets[i];
            if (window.scrollY >= top && window.scrollY <= bottom)
                return key;
            bottom = top;
        }
    }

    handleScroll = () => {
        let currActiveDiv = this.getActiveDiv(this.state.divOffsets);
        if (currActiveDiv !== this.state.activeDiv)
            this.setState({activeDiv: currActiveDiv});
    }

    generateNavButton = (divId) => {
        return (
            <RadioButton
                iconStyle={{
                    width: '90%',
                    fill: '#2e3192'
                }}
                value={divId}
            />
        )
    }

    onRadioButtonClick = (event, data) => {
        let dest = document.querySelector('#' + data);
        smoothScroll(dest);
    }

    render(){
        return (

          <div>

              <RadioButtonGroup className="navButtons" name="navigation"
                                valueSelected={this.state.activeDiv} onChange={this.onRadioButtonClick}
                                style={{
                                      width: '3vw'
                                }}>
                  {this.state.divNames.map(this.generateNavButton)}
              </RadioButtonGroup>
              <div id={this.state.divNames[0]} className="standardDiv background">
                    <Navbar />
                  <div className='verticalContent'>

                  <h4 className="branding">VIRTISION</h4>
                  <p className="sourceSansPro introPara">Step into your new home, anywhere, anytime.</p>
                  <Link to="/demo"><RaisedButton id="demoButton" label="Try Our Demo" primary={true}/></Link>
                  </div>
              </div>
              <div id={this.state.divNames[1]}>
                    <div className ="card">
              <h2 className="roboto aboutTitle sloganAboveTile">Immersive Virtual Tour Experience</h2>
                  <div className="row1">
                    <div className="col1">

                        <h2 className="sourceSansPro aboutText">Experience the future of searching for a house or apartment.</h2>
                        <p className="sourceSansPro"> Our 3D apartment scenes allow you to step into your new home, whether you are across the street or in a different country.</p>
                        <img className="visual" width="90%" src="https://s3.amazonaws.com/virtision-tech-assets/images/about1-01.png"/>

                      </div>

                    <div className="col1">

                        <h2 className="sourceSansPro aboutText">On average, visitors spend 307% longer on listings with Virtision scenes.</h2>
                        <p className="sourceSansPro"> Keep users engaged and increase visitor contact rates with Virtision 3D tours.</p>
                        <img className="visual" width="100%" src="https://s3.amazonaws.com/virtision-tech-assets/images/furniture-01.png"/>

                    </div>
                    <div className="col1">

                        <h2 className="sourceSansPro aboutText">Whether on desktop, mobile, or tablet, you can dive into Virtision 3D tours.</h2>
                        <p className="sourceSansPro">Easily share the listing with friends, family, and future roommates.</p>
                        <img className="visual" width="93%" src="https://s3.amazonaws.com/virtision-tech-assets/images/devices.png"/>
                      </div>
                    </div>
                  </div>
              </div>
              <div id={this.state.divNames[2]} className=" background">
                  <p className="white verticalBranding">VIRTISION</p>
                  <video width="100%" type="video/mp4" frameborder="0" allowfullscreen autoPlay loop muted src="https://s3.amazonaws.com/virtision-tech-assets/video/withmusic.mp4">
                  </video>
              </div>

                <div id={this.state.divNames[3]} className="clientLogo">
                <img src="https://s3.amazonaws.com/virtision-tech-assets/images/mhm.png"/>
                <img src="https://s3.amazonaws.com/virtision-tech-assets/images/jsm.png"/>
                <img src="https://s3.amazonaws.com/virtision-tech-assets/images/cpm.png"/>
                <img src="https://s3.amazonaws.com/virtision-tech-assets/images/bankier.png"/>
                </div>
                <div id={this.state.divNames[4]} className="clientQuote">
                <div className="quote">
                <div className="content">
                <div className="testimonial">
                <blockquote>
                Virtision was useful for our company since we have a large demographic on international students - it allowed our customers a great way to see and shop for their apartment virtually.
                The customer service and responsiveness we received from the Virtision Team set them above the rest. We were able to collaborate and brainstorm on further development through a continued conversation in person and via email. You will not regret working with the Virtision Team.
                </blockquote>
                <div></div>
                <p>
                Paige S., Senior Marketing Specialist, JSM Management
                </p>
                </div>
                </div>
                </div>
                </div>
              <div id={this.state.divNames[5]} className="clientLogo" >

                <h2 className="sourceSansPro sectionTitle sloganAboveImage">Contact Us</h2>
                <Contact />
              </div>
              <div class="footer">
              © 2018 Virtision. All Rights Reserved.
              </div>
          </div>
        )
    }
}

export default OldProduct;
