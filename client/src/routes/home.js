import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Contact from './contact.js';
import Navbar from './Navbar.js';
const { detect } = require('detect-browser');
const smoothScroll = require('smoothscroll');

export class Home extends Component {

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


    render(){
        return (

          <div>
              <div id={this.state.divNames[0]} className="standardDiv background">
                    <Navbar />
                  <div className='verticalContent'>

                  <h4 className="branding">VIRTISION</h4>
                  <p className="sourceSansPro introPara">Easily create, share and enjoy immersive content together</p>
                  <Link to="/"><RaisedButton id="demoButton" label="Get Early Access" primary={true}/></Link>
                  </div>
              </div>
                <div id={this.state.divNames[3]} className="clientLogo">
                <h2 className="sourceSansPro sectionTitle sloganAboveImage">Available On</h2>
                <img src=""/>
                <img src=""/>
                <img src=""/>
                </div>

              <div id={this.state.divNames[5]} className="clientLogo" >

                <h2 className="sourceSansPro sectionTitle sloganAboveImage">Contact Us</h2>
                <Contact />
              </div>
              <div class="footer">
              © 2021 Virtision. All Rights Reserved.
              </div>
          </div>
        )
    }
}

export default Home;
