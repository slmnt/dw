import React, { Component } from 'react';   
import PropTypes from 'prop-types';

import styles from './UserInfo.module.css';
import { ReactComponent as Logo } from '../../img/logo.svg';

class Userinfo extends Component {
    getUserData = () => {

    }
    render() {
        return (
            <div className={styles["main"]}>
                <div className={styles["container"]}>
                    <div className={styles["profile"]}>
                        <div className={styles["avatar"]}>
                            <Logo className={styles["avatar-img"]} />
                        </div>
                        <div className={styles["user-info"]}>
                            <div className={styles["name"]}>
                                name
                            </div>
                            <div className={styles["desc"]}>
                                desc wda dwa dwa wa dw adw a dwa aw w aw a
                            </div>
                        </div>
                    </div>
                    <div className={styles["overview"]}>
                        <div>overview</div>
                        <div className={styles["courses"]}>
                            <div>コース一覧</div>
                        </div>
                    </div>
                </div>
            </div>
        );
  	}
}

Userinfo.PropTypes = PropTypes;

export default Userinfo;