import React, { Component } from 'react';
import style from './style.css';
import Fade from 'react-reveal/Fade';

import PlayButton from 'images/play.svg';

class Video extends Component {
  constructor(props) {
    super(props);
    this.formatAsterisk = this.formatAsterisk.bind(this);
  }

  formatAsterisk(string) {
    const regex = new RegExp(/\*{1}(.*?)\*{1}/, 'g');
    const foundMatch = string.match(/\*([^*]*)\*/);
    const matchText = foundMatch ? foundMatch[1] : null;
    if (matchText) {
      const newHeadline = string.replace(regex, `<span style="color:#D62027">${matchText}</span>`);
      return {__html: newHeadline};
    } else {
      return {__html: string};
    };
  }

  get background() {
    const { bgUrl, heroUrl } = this.props;

    if (!bgUrl && heroUrl.endsWith(".mp4")) {
      return (
        <video autoPlay muted loop className={style.background}>
          <source src={heroUrl} type="video/mp4"/>
        </video>
      )
    } else if (!!bgUrl && bgUrl.endsWith(".mp4")) {
      return (
        <video autoPlay muted loop className={style.background}>
          <source src={bgUrl} type="video/mp4"/>
        </video>
      )
    } else {
      return (
        <img className={style.background} src={!!bgUrl ? bgUrl : heroUrl}/>
      )
    }
  }C

  render() {
    const { headline, description, heroUrl, videoUrl, bgUrl, windowHeight } = this.props;

    return (

      <div className={style.video} style={{height: `${windowHeight}px`}} ref={(c) => {this._videoElement = c;}}>
        <div className={style.backgroundWrapper}>
          <Fade>
            { this.background }
          </Fade>
        </div>
        <div className={style.contentContainer} onClick={() => this.props.videoHandler(videoUrl, this._videoElement)}>
          <div className={style.playVideoContainer}>
            <Fade bottom>
              <img className={style.playVideoIcon} src={PlayButton} />
              <h1 className={style.watch}>Watch the Video</h1>
            </Fade>
          </div>
          <Fade bottom>
          <h2 className={style.title} dangerouslySetInnerHTML={this.formatAsterisk(headline)}></h2>
          </Fade>

          <div className={style.flexRow}>
            <div className={style.descriptionWrapper}>
              <Fade bottom>
                <p className={style.description}>{description}</p>
              </Fade>
            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default Video;
