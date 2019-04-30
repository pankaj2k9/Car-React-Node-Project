import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';

import RegionSelector from 'components/RegionSelector';
import WhiteUproxx from 'images/uproxx-logo.svg';
import WhiteAdrx from 'images/adrx-logo.svg';
import WhiteToyota from 'images/rav4-logo.svg';
import { getRegionData } from 'modules/region/actions';
import { updateWindowData } from 'modules/ui/actions';
import { host } from 'utilities/constants';
import RotateModal from 'components/shared/RotateModal';
import { toggleModal } from 'modules/ui/actions';

import { app } from 'css/main';
import style from './style.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.updateWindowSize = this.updateWindowSize.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  state = {
    orientation: 0
  }

  handleCloseModal() {
    this.props.toggleModal(false, '');
    document.body.style.overflow = 'unset';
  }

  componentDidMount() {
    const htmlEl =  document.querySelector('html');

    window.addEventListener("orientationchange", () => {
      this.setState({orientation: window.orientation })
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
        htmlEl.style.height = '100%';
        this.props.toggleModal(false, '');
      };
    });
    this.props.getRegionData();
    // set window size data on initial load
    const windowData = {
      height: window.innerHeight,
      width: window.innerWidth,
      outerHeight: window.outerHeight,
      outerWidth: window.outerWidth
    }
    this.props.updateWindowData(windowData);

    // update window size on resize
    window.addEventListener('resize', this.updateWindowSize)
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

  render() {
    const data = get(this.props, 'regions')
    return (
      <div className={style.home}>
        <Helmet>
          <title>Toyota RAV4 2019</title>
          <meta name='description' content='Let us point you in the right direction.' />
        </Helmet>

        <a href="https://uproxx.com/">
          <img className={style.uproxxLogo} src={WhiteUproxx} />
        </a>
        <a href="https://www.toyota.com/rav4hybrid/">
          <img className={style.toyotaLogo} src={WhiteToyota} />
        </a>
        <a href={`${host}/adventurerx`} target='_top' rel='noopener'>
          <img className={style.adrxLogo} src={WhiteAdrx} />
        </a>
        <RegionSelector windowHeight={this.props.windowHeight} regions={data}/>
        { this.state.orientation !== 0  ? <RotateModal openModal={true}  windowWidth={this.props.windowOuterWidth} closeModal={this.handleCloseModal} type='text' copy='Please rotate your phone for an optimal viewing experience'/> : null }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  regions: state.region.data,
  windowHeight: state.ui.windowData.height,
  windowWidth: state.ui.windowData.width,
  windowOuterHeight: state.ui.windowData.outerHeight,
  windowOuterWidth: state.ui.windowData.outerWidth
});

export default connect(mapStateToProps, {getRegionData, updateWindowData, toggleModal})(Home);
