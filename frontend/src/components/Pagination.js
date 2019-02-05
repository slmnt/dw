import React, { Component } from 'react';   
import classNames from 'classnames';


import styles from './Pagination.module.css';

import Hamon from './helper/Hamon';

import { ReactComponent as PrevIcon } from '../img/arrow-back.svg';
import { ReactComponent as NextIcon } from '../img/arrow-right.svg';
import { ReactComponent as FirstIcon } from '../img/first-page.svg';
import { ReactComponent as LastIcon } from '../img/last-page.svg';


class Pagination extends Component {
  /*
  props
    currentPage
    from
    to
    maxButtons

    onclickpage
    onclickprev
    onclicknext
    onclickleft
    onclickright
  */
  constructor(props){
    super(props)
    this.state = {
    };
  }
  onClick = () => {

  }
  getButtons = (first, last, btns, current) => {
    current = Math.max(first, Math.min(last, current));
    
    let half = parseInt(btns / 2);
    let min = current - half;
    let max = current + half;

    if (min < first) {
      max += first - min;
      min = first;
    }
    if (max > last) {
      min = Math.max(first, min - (max - last));
      max = last;
    }

    let elems = [];
    let idx = 0;
    for (let i = min; i <= max; i++) {
      elems.push(
        <div key={idx} className={classNames(styles.btn, i == current ? styles["btn-selected"] : "")} onClick={() => this.onClickPage(i)}>
          {i}
        </div>
      );
      idx++;
    }
    return elems;
  }
  onClickFirst = e => {
    if (this.props.onClickFirst) this.props.onClickFirst();
  }
  onClickPrev = e => {
    if (this.props.onClickPrev) this.props.onClickPrev();
  }
  onClickNext = e => {
    if (this.props.onClickNext) this.props.onClickNext();
  }
  onClickLast = e => {
    if (this.props.onClickLast) this.props.onClickLast();
  }

  onClickPage = i => {
    if (this.props.onClickPage) this.props.onClickPage(i);
  }

  render() {
    return (
      <div className={styles.main}>
        <span className={styles["icon-btn"]} onClick={this.onClickFirst}>
          <FirstIcon />
        </span>
        <span className={styles["icon-btn"]} onClick={this.onClickPrev} style={{marginRight: "-1em"}}>
          <PrevIcon />
        </span>
        {
          this.getButtons(this.props.first, this.props.last, this.props.maxButtons, this.props.currentPage)
        }
        <span className={styles["icon-btn"]} onClick={this.onClickNext} style={{marginLeft: "-1em"}}>
          <NextIcon />
        </span>
        <span className={styles["icon-btn"]} onClick={this.onClickLast}>
          <LastIcon />
        </span>
      </div>
    )
  }
}

export default Pagination;