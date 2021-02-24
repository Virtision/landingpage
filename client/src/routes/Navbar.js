import React, {Component} from "react";
import './Navbar.css';

const navbar = probs => (
  <header className="navbar">
    <nav className="navbar_nav">
      <div>
      </div>
      <div className="navbar_logo">
        <a href="/"><img className="logo" src="https://s3.amazonaws.com/virtision-tech-assets/images/logo.png"/></a>
      </div>
      <div className="spacer" />
      <div className="navbar_items">
        <ul>
          <li>
            <a href="./service">Services</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default navbar;
