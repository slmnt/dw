import React, { Component } from 'react';   
import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import Left from '../Left'
import python from './python'
import PropTypes from 'prop-types';
import right from '../Right'
// react-paginatge is crash react meterial-ui
class Codeman extends Component {
    state = { 
        contextValue: "default value",
        val: 'init'
    };

    constructor(props){
        super(props)

        this.test = this.test.bind(this)
    }

    test(e){ 
        this.setState({val: e})
        console.log(this.state.val)
    }
    render() {

        return (
            <div>
                {this.state.val}
            <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
            htmlAttrs={{ style: { height: window.innerHeight, width: window.innerWidth } }}
            config={{
              content: [
                {
                type: "row",
                content: [
                    {
                        title: "Main contents",
                        type: "react-component",
                        component: "right",
                    },
                    {
                        type: "column",
                        content: [{
                            title: "Main Code",
                            type: "react-component",
                            component: "python"
                        },{
                            title: "Main result",
                            type: "react-component",
                            component: "testItem",
                            props: { test: this.test, val: this.state.val }
                        }]
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
                myLayout.registerComponent("right", right);
                myLayout.registerComponent("testItem", Left);
                myLayout.registerComponent("python", python);
            }}
            />        
            </div>

        );
  	}
}

Codeman.PropTypes = PropTypes;

export default Codeman;
