import React, { Component } from 'react';
import image from './images/Pizza.jpg';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div class="home">
        <img src={image} alt="Pizza" />
        <h1>Pizza Company</h1>
        <p>We serve the best pizza in town!</p>
      </div>
    );
  }
}