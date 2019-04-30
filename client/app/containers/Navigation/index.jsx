import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map, get } from 'lodash';
import style from './style.css';
import RegionSelector from '../../components/RegionSelector';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      color: 'light'
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleHamburgerButton = this.toggleHamburgerButton.bind(this);
  }

  toggleNav() {
    if(this.state.open) {
      this.setState({
        open: !this.state.open
      });
    }
  }
  toggleHamburgerButton() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { windowHeight } = this.props;
    const data = get(this.props, 'regions');

    return (
      <nav className={style.navigation} data-active={this.state.open}>
        <div className={style.hamburgerWrapper} onClick={this.toggleHamburgerButton}>
          <div className={style.hamburger}>
            <div className={style.hamburgerBox}>
              <div className={style.hamburgerInner} data-active={this.state.open}  />
            </div>
          </div>
        </div>
        <ul className={style.menuList} data-active={this.state.open} style={{height: `${windowHeight}px`}}>
          <RegionSelector windowHeight={windowHeight} regions={data}/>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    regions: state.region.data,
    windowHeight: state.ui.windowData.height,
  };
}

export default connect(mapStateToProps, {  })(Navigation);
