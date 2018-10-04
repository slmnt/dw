import React, { Component } from 'react';   
import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import Left from '../Left'
import python from './python'
import PropTypes from 'prop-types';

// react-paginatge is crash react meterial-ui
class Codeman extends Component {
    state = { 
        contextValue: "default value" 
    };
    render() {

        return (
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
                        component: "testItem",
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
                            component: "testItem"
                        }]
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
              myLayout.registerComponent("testItem", Left);
              myLayout.registerComponent("python", python);
            }}
            />        
        );
  	}
}

Codeman.PropTypes = PropTypes;

export default Codeman;
