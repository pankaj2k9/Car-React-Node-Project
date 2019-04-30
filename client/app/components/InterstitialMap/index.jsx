import React, { Component } from 'react';
import style from './style.css';
import Fade from 'react-reveal/Fade'

class InterstitialMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, milesTraveled, degrees, weather, blackText, windowHeight } = this.props;
    const removeAstericks = !!title ? title.replace(/\*/g, '') : title;

    return (
      <div className={style.interstitialMap} data-black={blackText} style={{height: `${windowHeight}px`}}>
        <div className={style.header}>
          <Fade bottom>
            <h3 className={style.upNext}>Up Next</h3>
          </Fade>
          <Fade bottom>
            <h2 className={style.title}>{removeAstericks}</h2>
          </Fade>
        </div>
        <div className={style.stats}>
          <div className={style.row}>
          <Fade bottom>
            <span className={style.label}><span className={style.desktopBreak}>Distance Traveled</span></span>
            <span className={style.value}>{milesTraveled} Miles</span>
          </Fade>
          </div>
          <div className={style.row}>
          <Fade bottom>
            <span className={style.label}>Weather</span>
            <span className={style.value}>{degrees}° {weather}</span>
          </Fade>
          </div>
        </div>
      </div>
    )
  }
}


export default InterstitialMap;
