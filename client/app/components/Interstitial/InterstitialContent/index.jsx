import React, { Component } from 'react';
import style from './style.css';

class InterstitialContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { locationName, blackText, windowHeight } = this.props;
    return (
      <div className={style.interstitialCardContent} style={{height: `${windowHeight}px`}}>
        <span className={style.locationName} data-black={blackText}>{locationName}</span>
      </div>
    )
  }
}


export default InterstitialContent;
