import React, { Component } from 'react';   
import PropTypes from 'prop-types';
import axios from 'axios';

class Courseinfo extends Component {
    state = {
        contents: "",
        info: ""
    }

    constructor (props) {
        super(props);

    }

    componentDidMount(){
        var u = '/api/getCourseInfoContentsInfo/' + this.props.match.params.id
        axios.get(u).then(response => {
            this.setState({contents: response.data})
        }).catch(e => console.log(e))
    }


    render() {

        const err = <div>No Such Contents</div>
        let meg;

        if(this.state.contents === "")
            meg = err;
        else
            meg = null;

        return (
            <div>
                Q&A
                {meg}
            </div>
        );
  	}
}

Courseinfo.PropTypes = PropTypes;

export default Courseinfo;