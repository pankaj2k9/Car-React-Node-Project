import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from 'modules/ui/actions';
import style from './style.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {openModal, type, closeModal, url, windowHeight, position} = this.props;
    return (
      <div className={openModal ? style.openModal : style.modal} style={{height: `${windowHeight}px`, top: position }} onClick={()=> closeModal(this._iframe)} >
        <div className={style.body} data-type={type}>
          <iframe src={url} width="640" height="360" allow="autoplay; fullscreen" allowFullScreen ref={(c) => { this._iframe = c; }}></iframe>
        </div>
      </div>
    );
  }
}

export default connect(undefined, { toggleModal })(Modal);
