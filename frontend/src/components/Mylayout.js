import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './Mylayout.css'

import { Scrollbars } from 'react-custom-scrollbars';
import AceEditor from 'react-ace';
import axios from 'axios';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
/*
fix view / tab management system
*/
const styles = theme => ({
    root:{
        //position: 'relative',
        //top: -25
    },
    table_view:{
        minWidth: '10%',
        maxWidth: 100,
        width: "10%",
        textAlign: "left",
    },
    table_tab:{
        height: "2vw",
        backgroundColor: '#FFF',
    },
    table_body:{
        height: "70%",
    },
    table_result:{
    }
});
  
class Mylayout extends Component {
    state = {
        flag: false,
        val: '',
        result: '',
        views: [],
        tabs: [],
    }

    constructor(props) {
        super(props);

        this.select = this.select.bind(this)
        this.run_code = this.run_code.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(newValue) {
        this.setState({val: newValue})
    }    

    componentDidMount(){
    }

    componentWillUnmount(){

    }

    dragStart(e) {
        // Update our state with the item that is being dragged
        e.dataTransfer.effectAllowed = 'copy'
        e.dataTransfer.setData("tab", e.target.id);
    }
    
    dragOver(e) {
        e.preventDefault()
    }
    
    dragEnd(e) {
    }

    allowdrop(e){
        e.preventDefault();
    }
    tabdrop(e){
        e.preventDefault();
        var data = e.dataTransfer.getData("tab");
        var dump = document.getElementById(data).cloneNode(true)

        // check current items
        if(dump.textContent === "item1")
            console.log(dump.textContent)
        // dump.innerHTML = '<div><a href="#" className="run" onClick={this.run_code} >execute</a><a href="#" onClick={this.select} >x</a></div>'
        e.target.appendChild(dump);

        console.log(e.target)
    }

    select(e){
        console.log(e.target.id)
        if(this.state.flag)
            this.setState({flag: false})
        else
            this.setState({flag: true})
    }

    tab_cloas(e){
    }

    run_code(){

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        // console.log(this.state.value)
        /*
        */
        axios.post('/api/python/',{contents: this.state.val}).then(response => {
            this.setState({ result: response.data})
            // console.log(response.data)
        }).catch(e => {
            // console.log(e)
        })

    }
    
    render() {
        const { classes } = this.props;
        const editor = (
            <AceEditor
            //mode="java"
            mode="python"
            theme="monokai"
            value={this.state.val}
            onChange={(e) => this.onChange(e)}
            name="UNIQUE_ID_OF_DIV"
            fontSize={15}
            width="89.5vw"
            height="70vh"
            editorProps={{$blockScrolling: Infinity}}
            setOptions={{
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 4,
            }}
            />
          );
              
        let con;

        if(this.state.flag){
            con = (<ul><li>test</li></ul>);
        }else{
            con = null;
        }

        return (
            <div className={classes.root}>
            <Scrollbars  disablehorizontalscrolling="true" style={{ width: "100vw", height: "94vh" }}>
                <table className={classes.table}>
                    <tbody>
                        <tr onDragOver={this.dragOver}>
                            <td rowSpan="3" 
                            className={classes.table_view}
                            >
                            <ul className="view">
                                <li>
                                    <a
                                    href="#"
                                    id={1}
                                    draggable="true" 
                                    onDragEnd={this.dragEnd} 
                                    onDragStart={this.dragStart}                                
                                    onClick={this.select}
                                    >
                                        item1
                                        {con}
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    className="item"
                                    id={2}
                                    draggable="true" 
                                    onDragEnd={this.dragEnd} 
                                    onDragStart={this.dragStart}                                
                                    onClick={this.select}
                                    >
                                        itme2
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    className="item"
                                    id={3}
                                    draggable="true" 
                                    onDragEnd={this.dragEnd} 
                                    onDragStart={this.dragStart}                                
                                    onClick={this.select}
                                    >
                                        itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3itme3
                                    </a>
                                </li>

                            </ul>
                            </td>
                                <td className={'tab'}
                                onDrop={this.tabdrop}
                                onDragOver={this.allowdrop}                                
                                >
                                    tab
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.table_body}>
                            {editor}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.table_result}>
                                <div>
                                    <a href="#" className="run" onClick={this.run_code} >execute</a>
                                    <a href="#" onClick={this.tab_cloas('tab')} >x</a>
                                </div>
                                <br/>
                                <textarea value={this.state.result} disabled/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Scrollbars>
        </div>
        );
  	}   
}

Mylayout.PropTypes = PropTypes;
export default withStyles(styles)(Mylayout);