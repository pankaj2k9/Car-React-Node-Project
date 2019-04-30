import React, { Component } from 'react';
import style from './style.css';
import { get, each } from 'lodash';
import { host } from 'utilities/constants';
import Fade from 'react-reveal/Fade'

import WhiteArrow from 'images/arrow.svg';

class EndCard extends Component {
  constructor(props) {
    super(props);
  }

  get background() {
    const { regionData, regionName } = this.props;
    const regionImg = get(regionData, '[0][7]');

    if (!!regionImg && regionImg.endsWith(".mp4")) {
      return (
        <video autoPlay muted loop className={style.image}>
          <source src={regionImg} type="video/mp4"/>
        </video>
      )
    } else {
      return (
        <img className={style.image} src={regionImg}/>
      )
    }
  }


  render() {
    const { regionData, regionName, windowHeight } = this.props;
    const prettyUrl = regionName.toLowerCase().replace(' ', '-');
    const regionImg = get(regionData, '[0][7]');
    return (
      <div className={style.endCard} style={{height: `${windowHeight}px`}}>
        <div className={style.imageWrapper}>
          <Fade>
            { this.background }
          </Fade>
        </div>
        <a href={`${host}/adventurerx/${prettyUrl}`} target="_top" rel='noopener' className={style.contentContainer}>
          <div className={style.textWrapper}>
            <div className={style.headline}>Next Adventure</div>
            <Fade bottom>
              <h1 className={style.title}>{get(regionData, '[0][2]', '')}</h1>
            </Fade>
            <div className={style.subtitle}>
              <Fade bottom>
                <p className={style.line}></p>
                <span>{get(regionData, '[0][9]', '')}</span>
              </Fade>
            </div>
            <div className={style.linkWrapper}>
              <Fade bottom>
                <div className={style.startJourney}>Start Journey</div>
                <img className={style.arrow} src={WhiteArrow} />
              </Fade>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default EndCard;
