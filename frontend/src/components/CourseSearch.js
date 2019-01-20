import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import Loading from './Loading'
import './CourseSearch.css'
import Divider from '@material-ui/core/Divider';

class CourseSearch extends Component {
    state = {
        keyword: 'test'
    }

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }
    
    handleChange(event) {
        this.setState({keyword: event.target.value});
    }

    onSearch(e){
        var select = document.getElementById('type')
        console.log(select.selectedIndex)
    }
    
    render() {
        return (
            <div className="coursesearchbody">
            <br/>
                <select id="type" className="boards_search-select">
                    <option value="">--Please choose an option--</option>
                    <option value="c">C</option>
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                </select>
                &nbsp;
                <input 
                onKeyPress={(e) => e.nativeEvent.key === "Enter" ? this.onSearch(e)  : void(0)} 
                className="boards_search-textarea" 
                value={this.state.keyword} 
                onChange={this.handleChange} ></input>
                &nbsp;
                <a className="Sbuttom" href="javascript:void(0)"
                    onClick={this.onSearch}>Search</a>
                <br/>
                Searching....
                <br/>
                <div>
                    <table className="CourseSearchbody">
                        <tbody className="boards_body">
                    <div>
                    <Divider/>
                        <tr>
                            <td className="boards_line">
                                123
                                <div className="board_cap">
                                    count
                                </div>
                            </td>
                            <td className="boards_title">
                                title
                                <div className="board_type">
                                    python
                                </div>
                            </td>
                            <td className="boards_auth">
                                <span>
                                username
                                </span>
                                <div className="boards_date">
                                    time
                                </div>
                                <br/>
                            </td>
                        </tr>
                    </div>
                    </tbody>
                    </table>
                </div>
                
                <div className="Sloading">
                    <Loading/>
                </div>                
            </div>
        );
  	}
}

CourseSearch.PropTypes = PropTypes;

export default CourseSearch;