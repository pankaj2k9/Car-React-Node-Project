import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from 'modules/ui/actions';
import style from './style.css';

class RotateModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener('orientationchange',this.positionModal());
  }

  positionModal() {
    const scrollTop = window.pageYOffset;
    const newTopVal = (this.props.windowWidth - 200) / 2;
    this._modalBody.style.top = (newTopVal) + "px";
    this._rotateModal.style.top = "0px";
  }

  render() {
    const {openModal, type, closeModal, windowHeight, copy} = this.props;

    return (
      <div className={openModal ? style.openModal : style.modal}  style={{height: `${windowHeight}px`, top: '0px'}} onClick={()=> closeModal(this._rotateModal)} ref={(b) => {this._rotateModal = b;}}>
        <div className={style.body} data-type={type} style={{top: '0px'}} ref={(c) => {this._modalBody = c;}}>
          <span className={style.mainText}>{copy}</span>
        </div>
      </div>
    );
  }
}

export default connect(undefined, { toggleModal })(RotateModal);
