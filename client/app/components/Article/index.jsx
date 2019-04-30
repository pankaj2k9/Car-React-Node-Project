import React, { Component } from 'react';
import style from './style.css';
import Fade from 'react-reveal/Fade';
import WhiteArrow from 'images/arrow.svg';
import BlackArrow from 'images/arrow-black.svg';

class Article extends Component {
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

  get content() {
    const { headline, description, photoUrl, bgType, ctaUrl } = this.props;
    if (bgType.toLowerCase() === 'white') {
      return (
        <a href={ctaUrl} target="_blank" className={style.contentContainer} data-white='true'>
          { !!photoUrl ?
            <Fade>
              <img className={style.photo} data-white='true' src={photoUrl}/>
            </Fade>
          : null }
          <div className={style.flexCenter}>
            <Fade bottom>
              <h2 className={`${style.title} ${style.articleWht}`} data-white='true' dangerouslySetInnerHTML={this.formatAsterisk(headline)}></h2>
            </Fade>
            <Fade bottom>
            <div className={style.descriptionWrapper} data-white='true' data-photo={!!photoUrl}>
              <p className={style.description} data-white='true' data-photo={!!photoUrl}>{description}</p>
              <div className={style.linkWrapper}>
                <div className={style.readArticle} data-white='true'>Read Article</div>
                <img className={style.arrow} src={BlackArrow} />
              </div>
            </div>
            </Fade>
          </div>
        </a>
      )
    } else {
      return (
        <a href={ctaUrl} target="_blank" className={style.contentContainer}>
          <Fade bottom>
            <h2 className={style.title} dangerouslySetInnerHTML={this.formatAsterisk(headline)}></h2>
          </Fade>
          <div className={style.flexRow}>
            { !!photoUrl ?
              <Fade>
                <img className={style.photo} src={photoUrl}/>
              </Fade>
            : null }
            <div className={style.descriptionWrapper} data-photo={!!photoUrl}>
              <Fade bottom>
                <p className={style.description} data-photo={!!photoUrl}>{description}</p>
              </Fade>
              <div className={style.linkWrapper}>
                <div className={style.readArticle}>Read Article</div>
                  <img className={style.arrow} src={WhiteArrow} />
              </div>
            </div>
          </div>
        </a>
      )
    }
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
  }

  render() {
    const { heroUrl, bgType, bgUrl, windowHeight } = this.props;
    return (
      <div className={style.article} style={{height: `${windowHeight}px`}}>
        <div className={style.backgroundWrapper} data-black={bgType.toLowerCase() === 'black'} data-white={bgType.toLowerCase() === 'white'}>
          { this.background }
        </div>
        { this.content }
      </div>
    )
  }
}


export default Article;
