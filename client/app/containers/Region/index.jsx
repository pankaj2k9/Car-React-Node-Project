import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { get, isEmpty, map} from 'lodash';

import EndCard from 'components/EndCard';
import RotateModal from 'components/shared/RotateModal';
import Modal from 'components/shared/Modal';
import Interstitial from 'components/Interstitial';
import Navigation from 'containers/Navigation';
import WhiteUproxx from 'images/uproxx-logo.svg';
import WhiteAdrx from 'images/adrx-logo.svg';
import WhiteToyota from 'images/rav4-hybrid-white.svg';

import { toggleModal, updateWindowData } from 'modules/ui/actions';
import { getRegionData } from 'modules/region/actions';
import { formatUrl } from 'utilities/helpers';
import { app } from 'css/main';
import { regions, host } from 'utilities/constants'
import style from './style.css';

const Article = lazy(() => import('components/Article'));
const Video = lazy(() => import('components/Video'));

class Region extends Component {
  constructor(props) {
    super(props);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateWindowSize = this.updateWindowSize.bind(this);
  }

  state = {
    url: '',
    orientation: 0,
    position: ''
  }

  componentDidMount() {
    this.props.getRegionData();
    // set window size data on initial load
    const windowData = {
      height: window.innerHeight,
      width: window.innerWidth,
      outerHeight: window.outerHeight,
      outerWidth: window.outerWidth
    }
    this.props.updateWindowData(windowData);
    const htmlEl =  document.querySelector('html');
    // update window size on resize
    window.addEventListener('resize', this.updateWindowSize)
    window.addEventListener("orientationchange", () => {
      this.setState({orientation: window.orientation})
      if (this.state.orientation == 90) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        htmlEl.style.overflow = 'hidden';
        htmlEl.style.height = '100%';
        document.querySelector('iframe').scrolling = 'no';
      } else {
        document.body.style.overflow = 'unset';
        document.querySelector('iframe').scrolling = 'yes';
        htmlEl.style.overflow = 'unset';
        htmlEl.style.height = null;
        this.props.toggleModal(false, '');
        window.removeEventListener('touchmove', this.handleTouchMove, {passive: false});

      };
    });

  }

  updateWindowSize() {
    if (window.innerWidth >= 1024) {
      const windowData = {
        height: window.innerHeight,
        width: window.innerWidth
      }
      this.props.updateWindowData(windowData);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  get content() {
    const page = this.props.location.pathname;
    const key = formatUrl(page);
    const data = get(this.props, `regions[${key}]`, []);
    const heroUrl = get(data, `[0][7]`);

    /* skip the first two slides since they are handled separately */
    let contentData = data.slice(2, data.length);
    /* filters out unpublished sections */
    contentData = contentData.filter((section) => {
      const visibility = get(section, '[0]', '');
      return visibility.toLowerCase() === 'published';
    })

    if (!isEmpty(contentData)) {
      return map(contentData, (value, i) => {
        if (!!value[1] && value[1].toLowerCase() === 'article') {
          return (
            <Suspense key={`article-loader-${i}`} fallback={<div></div>}>
              <Article
                windowHeight={this.props.windowHeight}
                key={`article-${i}`}
                heroUrl={heroUrl}
                headline={get(value, '[2]', '')}
                description={get(value, '[3]', '')}
                photoUrl={get(value, '[4]', '')}
                bgType={get(value, '[6]', '')}
                bgUrl={get(value, '[7]', '')}
                ctaUrl={get(value, '[8]', '')}
                />
            </Suspense>
          )
        } else if (!!value[1] && value[1].toLowerCase() === 'video') {
          return (
            <Suspense key={`video-loader-${i}`} fallback={<div></div>}>
              <Video
                windowHeight={this.props.windowHeight}
                key={`video-${i}`}
                heroUrl={heroUrl}
                headline={get(value, '[2]', '')}
                description={get(value, '[3]', '')}
                videoUrl={get(value, '[5]', '')}
                bgType={get(value, '[6]', '')}
                bgUrl={get(value, '[7]', '')}
                videoHandler={this.handlePlayVideo}
                />
            </Suspense>
          )
        } else if (value[1].toLowerCase() === 'interstitial') {
          return <Interstitial windowHeight={this.props.windowHeight} key={`interstitial-${i}`} data={data} slideNumber={i + 2} />
        }
      })

    }

    return null;
  }
  // prevent scroll on ios
  handleTouchMove(e) {
    e.preventDefault();
  }

  handlePlayVideo(video, el) {
    this.setState({url: video, position: `${el.offsetTop}px` })
    this.props.toggleModal(true, '');
    //prevent scroll
    const htmlEl =  document.querySelector('html');
    document.body.style.overflow = 'hidden';
    htmlEl.style.overflow = 'hidden';
    window.addEventListener('touchmove', this.handleTouchMove, {passive: false});

    el.scrollIntoView(); // scroll to the video element
  }

  handleCloseModal(video) {
    video.setAttribute('src', video.src)
    this.setState({url: ''})
    this.props.toggleModal(false, '');
    // allow scroll
    const htmlEl =  document.querySelector('html');
    document.querySelector('iframe').scrolling = 'yes';
    document.body.style.overflow = 'unset';
    htmlEl.style.overflow = 'unset';
    htmlEl.style.height = null;
    this.props.toggleModal(false, '');

    window.removeEventListener('touchmove', this.handleTouchMove, {passive: false});
  }

  render() {
    const page = this.props.location.pathname;
    const key = formatUrl(page);
    const data = get(this.props, `regions[${key}]`)
    const currentRegionIndex = regions.indexOf(key);
    const nextRegionIndex = currentRegionIndex >= regions.length - 1 ? 0 : currentRegionIndex + 1;
    const nextRegionKey = regions[nextRegionIndex];
    const nextRegionData = get(this.props, `regions[${nextRegionKey}]`);
    return (
      <div className={style.region}>
        <Helmet>
          <title>Toyota RAV4 2019</title>
          <meta name='description' content='Let us point you in the right direction.' />
        </Helmet>
        <Navigation data={data} windowHeight={this.props.windowHeight}/>
        <a href="https://uproxx.com/" target='_blank'>
          <img className={style.uproxxLogo} src={WhiteUproxx} />
        </a>
        <a href="https://www.toyota.com/rav4hybrid/" target='_blank'>
          <img className={style.toyotaLogo} src={WhiteToyota} />
        </a>
        <a href={`${host}/adventurerx`} target='_top' rel='noopener'>
          <img className={style.adrxLogo} src={WhiteAdrx} />
        </a>
        <Interstitial windowHeight={this.props.windowHeight} data={data} slideNumber={1} />
        { this.content }
        <Modal openModal={this.props.isToggled} url={this.state.url} closeModal={this.handleCloseModal} windowHeight={this.props.windowHeight} position={this.state.position} />
        <EndCard regionData={nextRegionData} regionName={nextRegionKey} windowHeight={this.props.windowHeight}/>
        { this.state.orientation !== 0  ? <RotateModal openModal={true}  windowWidth={this.props.windowOuterWidth} closeModal={this.handleCloseModal} type='text' copy='Please rotate your phone for an optimal viewing experience'/> : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    regions: state.region.data,
    isToggled: state.ui.modal.toggled,
    isDesktop: state.ui.isDesktop,
    windowHeight: state.ui.windowData.height,
    windowWidth: state.ui.windowData.width,
    windowOuterHeight: state.ui.windowData.outerHeight,
    windowOuterWidth: state.ui.windowData.outerWidth
  }
}

export default connect(mapStateToProps, {getRegionData, toggleModal, updateWindowData})(Region);
