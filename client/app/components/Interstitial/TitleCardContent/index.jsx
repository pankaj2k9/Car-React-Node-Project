import React, { Component } from 'react';
import style from './style.css';

class TitleCardContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, tagline, description, locationName, windowHeight } = this.props;

    return (
      <div className={style.titleCardContent} style={{height: `${windowHeight}px`}}>
        <div className={style.contentWrapper}>
          <h1 className={style.title}>{title}</h1>
          <div className={style.subtitle}>
            <span className={style.subtitleLine}></span>
            <h2 className={style.subtitleText}>{tagline}</h2>
          </div>
          <p className={style.description}>{description}</p>
        </div>
        <span className={style.locationName}>{locationName}</span>
      </div>
    )
  }
}


export default TitleCardContent;
