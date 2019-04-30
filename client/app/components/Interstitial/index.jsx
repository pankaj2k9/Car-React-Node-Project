import React, { Component } from 'react';
import { get } from 'lodash';

import TitleCardContent from 'components/Interstitial/TitleCardContent';
import InterstitialContent from 'components/Interstitial/InterstitialContent';
import InterstitialMap from 'components/InterstitialMap';

import Map from 'images/sample-map.svg';

import style from './style.css';
let lastScrollTop = 0;

class Interstitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    }
    this.checkForMapPos = this.checkForMapPos.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkForMapPos);
    this.setInitialMapPos();
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.checkForMapPos);
  }

  setInitialMapPos() {
    const windowHeight = window.innerHeight;
    const isDesktop = window.innerWidth >= 1024;
    const startingMapPos = isDesktop ? windowHeight * .545 : windowHeight * .765;
    TweenMax.set(this._map, {top: startingMapPos});
  }

  checkForMapPos() {
    // scroll the image down
     const scrollTop = window.pageYOffset;
     const bgTopOffset = this[`_interstitial${this.props.slideNumber}`].offsetTop;
     const bgBottomOffset = bgTopOffset + (this.props.windowHeight * 2);
     const stoppingPoint = bgBottomOffset - this.props.windowHeight;
     const background = this[`_background${this.props.slideNumber}`];
     const topVal = parseInt(background.style.top);
     const newTopVal = scrollTop - bgTopOffset;
     if (scrollTop >= bgTopOffset && scrollTop <= stoppingPoint) {
       if (scrollTop > lastScrollTop) {
         background.style.top = (newTopVal) + "px";
       } else {
         background.style.top = (newTopVal) + "px";
       }
       lastScrollTop = scrollTop;
     } else if (lastScrollTop <= stoppingPoint && scrollTop >= stoppingPoint) {
       const newTopValBottom = this.props.windowHeight;
       background.style.top = (newTopValBottom) + "px";
     }

    const windowHeight = window.innerHeight;
    const isDesktop = window.innerWidth >= 1024;
    const slideNumber = this.props.slideNumber === 1 ? 0 : this.props.slideNumber;
    const scrollSectionStart = slideNumber * windowHeight;
    const scrollSectionEnd = (slideNumber + 1) * windowHeight;

    const maxScroll = windowHeight;

    const isInSection = window.scrollY > scrollSectionStart && window.scrollY < scrollSectionEnd;

    /* if not in the section return */
    if (!isInSection) return;

    let mapPercScrolled = (window.scrollY - scrollSectionStart) / maxScroll;
    if (mapPercScrolled > 1) mapPercScrolled = 1;
    let overlayPercScrolled = (window.scrollY - scrollSectionStart) / (maxScroll / 2);
    if (overlayPercScrolled > 1) overlayPercScrolled = 1;

    const startingMapPos = isDesktop ? windowHeight * .545 : windowHeight * .765;
    const endingMapPos = isDesktop ? windowHeight * 1.08 : windowHeight * 1.135;
    const mapDistanceBetween = endingMapPos - startingMapPos;
    const newMapY = mapPercScrolled * mapDistanceBetween + startingMapPos;
    TweenMax.set(this._map, {top: newMapY});
    TweenMax.set(this._overlay, {alpha: overlayPercScrolled * .8});
  }

  get content() {
    const { data, slideNumber } = this.props;
    const bgType = get(data, `[${slideNumber}][6]`);
    if (slideNumber === 1) {
      return (
        <TitleCardContent
          windowHeight={this.props.windowHeight}
          title={get(data, '[0][2]', '')}
          tagline={get(data, '[0][9]', '')}
          description={get(data, '[0][3]', '')}
          locationName={get(data, '[1][11]', '')}
        />
      );
    } else {
      return (
        <InterstitialContent
          windowHeight={this.props.windowHeight}
          blackText={!!bgType && bgType.toLowerCase() === 'white'}
          locationName={get(data, `[${slideNumber}][11]`, '')}
        />
      )
    }
  }

  get background() {
    const { data, slideNumber } = this.props;
    const backgroundSlideNumber = slideNumber === 1 ? 0 : slideNumber;
    const backgroundImage = get(data, `[${backgroundSlideNumber}][7]`, '');


    if (backgroundImage.endsWith(".mp4")) {
      return (
        <video autoPlay muted loop className={style.background}>
          <source src={backgroundImage} type="video/mp4"/>
        </video>
      )
    } else {
      return (
        <img className={style.background} src={backgroundImage}/>
      )
    }
  }

  render() {
    const { data, slideNumber, windowHeight } = this.props;
    const latStart = get(data, `[${slideNumber}][12]`, '');
    const lonStart = get(data, `[${slideNumber}][13]`, '');
    const latEnd = get(data, `[${slideNumber}][14]`, '');
    const lonEnd = get(data, `[${slideNumber}][15]`, '');
    const title = get(data, `[${slideNumber + 1}][2]`);
    const bgType = get(data, `[${slideNumber}][6]`);
    const backgroundSlideNumber = slideNumber === 1 ? 0 : slideNumber;
    const bgUrl = get(data, `[${backgroundSlideNumber}][7]`);

    return (
      <div className={style.interstitial} ref={(c) => {this[`_interstitial${slideNumber}`] = c;}} data-black={!!bgType && bgType.toLowerCase() === 'black'} data-white={!!bgType && bgType.toLowerCase() === 'white'}>
        {!!bgUrl ?
          <div className={style.backgroundWrapper} style={{height: `${windowHeight}px`, top: '0px'}} ref={(c) => {this[`_background${slideNumber}`] = c;}}>
            { this.background }
          </div>
        : null }
        { !bgType || (!!bgType && bgType.toLowerCase() !== 'white') ?
          <div className={style.overlay} ref={(c) => {this._overlay = c;}} />
        : null }
        <div className={style.map} ref={(c) => {this._map = c;}}>
          <span className={style.coordinates}>{latStart}°N, {lonStart}°W</span>
          <img src={Map} className={style.mapImage} />
          <span className={style.coordinates}>{latEnd}°N, {lonEnd}°W</span>
        </div>
        { this.content }
        <InterstitialMap
          windowHeight={this.props.windowHeight}
          title={title}
          blackText={!!bgType && bgType.toLowerCase() === 'white'}
          milesTraveled={get(data, `[${slideNumber}][18]`, '')}
          degrees={get(data, `[${slideNumber}][16]`, '')}
          weather={get(data, `[${slideNumber}][17]`, '')}
        />
      </div>
    )
  }
}


export default Interstitial;
