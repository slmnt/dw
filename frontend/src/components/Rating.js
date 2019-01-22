import React, { Component } from 'react';   
import styles from './Rating.module.css';

import { ReactComponent as Star } from '../img/star.svg';
import { ReactComponent as StarBorder } from '../img/star-border.svg';
import { ReactComponent as StarHalf } from '../img/star-half.svg';

class Rating extends Component {
  getStars(value) {
    let a = [];
    for (let i = 0; i < 5; i++) {
      if (value >= 1)
        a.push(<Star key={i} className={styles.star}/>);
      else if (value >= 0.5)
        a.push(<StarHalf key={i} className={styles.star}/>);
      else
        a.push(<StarBorder key={i} className={styles.star}/>);
      value -= 1;
    }
    return a;
  }
  render() {
    return (
      <div className={styles.main}>
        {
          this.getStars(this.props.value)
        }
      </div>
    )
  }
}

export default Rating;