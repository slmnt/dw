import React, { Component } from 'react';   
import { GoldenLayoutComponent } from "./goldenLayoutComponent";
import PropTypes from 'prop-types';
import coursemain from './course/context'
import python from './python'
import result from './result'

// react-paginatge is crash react meterial-ui
class Codeman extends Component {
    state = { 
        contextValue: "default value",
        val: ''
    };

    constructor(props){
        super(props)
        this.test = this.test.bind(this)
        this.getval = this.getval.bind(this)
        this.set = props.set
        this.get = props.get
    }

    componentDidCatch(error, info){
        console.log('error')
    }

    getval(){
        return this.state.val
    }
    
    test(e){ 
        // console.log(e)
        this.setState({val: e})
    }

    render() {

        return (
            <div>
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
                        component: "main",
                        isClosable: false,
                        props: {location: this.props.location, set: this.set}
                    },
                    {
                        type: "column",
                        content: [{
                            title: "Main Code",
                            type: "react-component",
                            component: "code",
                            isClosable: false,
                            props: { set: this.test, get: this.get }
                        },{
                            title: "Main result",
                            type: "react-component",
                            component: "result",
                            isClosable: false,
                            props: { get: this.getval, getlen: this.get}
                        }]
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
                myLayout.registerComponent("main", coursemain);
                myLayout.registerComponent("result", result);
                myLayout.registerComponent("code", python);
            }}
            />        
            </div>
        );
  	}
}

Codeman.PropTypes = PropTypes;

export default Codeman;