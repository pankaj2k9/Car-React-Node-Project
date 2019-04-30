import React, { Component } from 'react';
import style from './style.css';
import { get, each, toArray, mapKeys, filter } from 'lodash';
import { regions, host } from 'utilities/constants';
import WhiteArrow from 'images/arrow.svg';

class RegionSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegion: "California",
      runningAnimation: false
    }

    this.regionHover = this.regionHover.bind(this);
    this.swapTitles = this.swapTitles.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setInitialPos();
    }, 500);
  }

  setInitialPos() {
    const placeName = this.state.currentRegion.replace(' ', '').toLowerCase();
    TweenMax.set(this[`_${placeName}`], {bottom: 0, zIndex: 100});
    TweenMax.set(this[`_${placeName}Title`], {top: 0});
    TweenMax.set(this[`_${placeName}Subtitle`], {top: 0});
  }

  regionHover(region) {
    if (this.state.runningAnimation) return;
    const {regions} = this.props;;
    const placeName = region.replace(' ', '').toLowerCase();
    this.swapTitles(this.state.currentRegion, placeName);
    this.setState({
      runningAnimation: true,
      currentRegion: region
    }, () => {
      TweenMax.fromTo(this[`_${placeName}`], 1, {bottom: '-105vh'}, {bottom: 0, zIndex: 100});
      // move the rest of them to the bottom
      const keys = [];
      mapKeys(regions, (val, key) => {
        keys.push(key);
      });
      const allOtherKeys = filter(keys, (regionKey) => {
        return regionKey !== region;
      });
      allOtherKeys.map((regionKey, i) => {
        const regionPlaceName = regionKey.replace(' ', '').toLowerCase();
        TweenMax.set(this[`_${regionPlaceName}`], {zIndex: 1});
      });
      setTimeout(() => {
        allOtherKeys.map((regionKey, i) => {
          const regionPlaceName = regionKey.replace(' ', '').toLowerCase();
          TweenMax.set(this[`_${regionPlaceName}`], {bottom: '-105vh'});
        });
        this.setState({runningAnimation: false});
      }, 1000);
    });
  }

  swapTitles(oldRegion, newRegionName) {
    const {regions} = this.props;
    const oldRegionName = oldRegion.replace(' ', '').toLowerCase();
    TweenMax.to(this[`_${oldRegionName}Title`], 1, {top: '-31vw'});
    TweenMax.fromTo(this[`_${newRegionName}Title`], 1, {top: '31vw'}, {top: 0});
    TweenMax.to(this[`_${oldRegionName}Subtitle`], 1, {top: '-8vw'});
    TweenMax.fromTo(this[`_${newRegionName}Subtitle`], 1, {top: '8vw'}, {top: 0});
    const keys = [];
    mapKeys(regions, (val, key) => {
      keys.push(key);
    });
  }

  get titles() {
    const { regions } = this.props;
    const keys = [];
    mapKeys(regions, (val, key) => {
      keys.push(key);
    });
    return keys.map((region, i) => {
      const placeName = keys[i].replace(' ', '').toLowerCase();
      return <h1 className={style.titleText} ref={(c) => {this[`_${placeName}Title`] = c;}} key={`regiontitle-${i}`}>{get(regions[region], '[0][2]', '')}</h1>
    });
  }

  get subtitles() {
    const { regions } = this.props;
    const keys = [];
    mapKeys(regions, (val, key) => {
      keys.push(key);
    });
    return keys.map((region, i) => {
      const placeName = keys[i].replace(' ', '').toLowerCase();
      return <span  key={`regionsubtitle-${i}`} className={style.subtitleText} ref={(c) => {this[`_${placeName}Subtitle`] = c;}}>{get(regions[region], '[0][9]', '')}</span>
    });
  }

  get regions() {
    return regions.map((region, i) => {
      const prettyUrl = region.toLowerCase().replace(' ', '-');
      const regionLink = `${host}/adventurerx/${prettyUrl}`;
      return (
        <a className={style.regionLink} href={regionLink} key={`region-${i}`} onMouseEnter={() => this.regionHover(region)} target='_top' rel='noopener'>
          <span className={style.place}>{region}</span>
        </a>
      )
    })
  }


  get backgrounds() {
    const { regions } = this.props;
    const currentRegion = regions[this.state.currentRegion];
    const regionArr = toArray(regions);
    const keys = [];
    mapKeys(regions, (val, key) => {
      keys.push(key);
    });
    return regionArr.map((region, i) => {
      const regionUrl = get(regions[keys[i]], '[0][7]');
      const placeName = keys[i].replace(' ', '').toLowerCase();
      if (!!regionUrl && regionUrl.endsWith(".mp4")) {
        return (
          <div className={style.backgroundSlide} ref={(c) => {this[`_${placeName}`] = c;}} key={`region-${i}`}>
            <video autoPlay muted loop className={style.image}>
              <source src={regionUrl} type="video/mp4" />
            </video>
          </div>
        );
      } else {
        return (
          <div className={style.backgroundSlide} ref={(c) => {this[`_${placeName}`] = c;}} key={`region-${i}`}>
            <img className={style.image} src={regionUrl} />
          </div>
        );
      }
    });

  }

  render() {
    const { regions, windowHeight } = this.props;
    const currentRegion = regions[this.state.currentRegion];
    const prettyUrl = this.state.currentRegion.toLowerCase().replace(' ', '-');

    return (
      <div className={style.regionSelector} style={{height: `${windowHeight}px`}}>
        <div className={style.imageWrapper}>
          { this.backgrounds }
        </div>
        <div className={style.contentContainer}>
          <a href={`${host}/adventurerx/${prettyUrl}`} className={style.textWrapper} target='_top' rel='noopener'>
            <div className={style.headline}>Explore</div>
            <div className={style.titleBox}>
              { this.titles }
            </div>
            <div className={style.subtitle}>
            <p className={style.line}></p>
            <div className={style.subtitleBox}>
              { this.subtitles }
            </div>
            </div>
            <div className={style.linkWrapper}>
              <div className={style.startJourney}>Start Journey</div>
              <img className={style.arrow} src={WhiteArrow} />
            </div>
          </a>
          <div className={style.regionsList}>
            { this.regions }
          </div>
        </div>
      </div>
    )
  }
}

export default RegionSelector;
