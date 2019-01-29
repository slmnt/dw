import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from 'history';

import styles from './Drawer.module.css'
import { ReactComponent as Arrow } from '../img/arrow-back.svg';


class Drawer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            items: [
                // [name, url] or [name & url]
                ['トップ', '/'],
                ['はじめる', '/getting-started'],
                ['-'],
                ['コース検索', '/search/course'],
                ['ユーザ検索', '/search/user'],
                ['コースを作る', '/'],
                ['-'],
                ['マイページ','/mypage'],
                ['ログアウト', '/'],
                ['掲示板', '/board'],
                ['-'],
                //['text editor (right)', '/right'],
                //['courseSearch','/search/course'],
                //['test course get', '/course/123/'],
                //['test course edit', '/course/123/edit'],
                //['test'],
            ],
        }
    }
    
    open = e => {
        /*
            let rect = element.getBoundingClientRect();
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
        */
        this.setState({isDrawerOpen: true});
    }
    close = e => {
        this.setState({isDrawerOpen: false});
    }
    onClickDrawerItem = (e) => {
        // this.close();
        this.setState({
          isDrawerOpen: false
        })
    }
      
    render() {

        return (
            <div className={styles.main}>
                <div
                    onClick={this.close}
                    style={{
                        display: this.state.isDrawerOpen ? "block" : "none"
                    }}
                    className={styles["drawer-bg"]}>
                </div>
                <div className={styles.panel}
                    style={{
                        left: this.state.isDrawerOpen ? 0 : -1000 + "px"
                    }}
                >
                    <div className={styles["close-container"]}>
                        <div className={styles["close-button"]} onClick={this.close}>
                            <Arrow className={styles["close-img"]} />
                        </div>
                    </div>
                    {
                        this.state.items.map((v, i) => {
                            if (v[0] == '-') {
                                return (
                                    <div key={i} style={{
                                        height: "0.5em",
                                        width: "80%",
                                        borderBottom: "1px solid var(--light-color)",
                                        margin: "0 auto 0.5em auto",
                                    }}></div>
                                )
                            }
                            return (
                                <Link key={i} to={v[1] || v[0]} className={styles.item} onClick={this.onClickDrawerItem}>
                                    {v[0]}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        );
  	}
}

Drawer.propTypes = {};
export default Drawer;