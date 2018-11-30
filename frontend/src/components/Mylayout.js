import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes, { string } from 'prop-types';
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
        tabs: ["1", "2"],
    }

    constructor(props) {
        super(props);

        this.select = this.select.bind(this)
        this.tabdrop = this.tabdrop.bind(this)
        this.run_code = this.run_code.bind(this)
        this.onChange = this.onChange.bind(this)
        this.tab_close = this.tab_close.bind(this)
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
        // console.log('start')
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

        try{
            //when mouse up, get mouse position data -> check target tab position => adjust tab elemenets  =>rebuild tabs render
            //console.log(e.clientX)
            var dump = document.getElementById(e.target.id)
            var temp = []
            var origin = this.state.tabs
            var inn = this.state.tabs.length + 1
            inn = inn.toString()

            for(var i = 0; i < origin.length;i++){
                temp.push(Number(origin[i]))
            }
            temp = temp.sort()            
            
            for(var i = 0; i < temp.length;i++){
                if(temp[i] !== (i + 1)){
                    inn = (i + 1).toString()
                    break
                }
            }

            temp = []

            if(e.target.id === ""){
                data = data.split("tab")
                if(data[1]){
                    inn = data[1].toString()
                    while(true){
                        var t = origin.pop()
                        if(t == inn)
                            break;
                        temp.push(t)
                    }

                    var times = temp.length
                    for(var i = 0; i < times;i++)
                        origin.push(temp.pop())

                    temp = []
                }
                origin.push(inn)

            }else{
                var rect = dump.getBoundingClientRect();
                var checkx = (2 * rect.x + rect.width) / 2 
                var id = e.target.id
                id = id.split("tab")
                data = data.split("tab")
                if(data[1]){
                    inn = data[1].toString()
                    while(true){
                        var t = origin.pop()
                        if(t == inn)
                            break;
                        temp.push(t)
                    }

                    var times = temp.length
                    for(var i = 0; i < times;i++)
                        origin.push(temp.pop())

                    temp = []
                }

                if(inn !== id[1]){
                    while(true){
                        var t = origin.pop()
                        if(t === id[1]){
                            origin.push(t)
                            break
                        }                    
                        temp.push(t)
                    }
                    if(checkx > e.clientX){
                        var t = origin.pop()
                        temp.push(t)
                    }
                }

                origin.push(inn)
    
                //console.log(temp)
                var times = temp.length
                for(var i = 0; i < times;i++)
                    origin.push(temp.pop())
            }
                
            this.setState({
                tabs: origin
            })
            
        }catch(e){
            console.log('error')
        }

    }

    intab(e){
        e.preventDefault();
        var data = e.dataTransfer.getData("tab");
        e.target.appendChild(data);
    }

    select(e){
        console.log(e.target.id)
        if(this.state.flag)
            this.setState({flag: false})
        else
            this.setState({flag: true})
    }

    tab_close(e){
        //let dump = document.getElementById(e.target.id)
        //dump.remove()
        var origin = this.state.tabs
        var data = e.target.id
        var temp = []
        
        data = data.split("tab")
        if(data[1]){
            var inn = data[1].toString()
            while(true){
                var t = origin.pop()
                if(t == inn)
                    break;
                temp.push(t)
            }

            var times = temp.length
            for(var i = 0; i < times;i++)
                origin.push(temp.pop())

            this.setState({
                tabs: origin
            })
        }
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
        let tabb = null;
        if(this.state.flag){
            con = <ul><li>{this.state.tabs[0]}</li></ul>;
        }else{
            con = null;
        }

        if(this.state.tabs.length > 0){
            tabb = this.state.tabs.map(e =>{
                return(
                    <div id={"tab" + e} className="tab_item"
                    draggable="true" 
                    onDragStart={this.dragStart}
                    >{e}
                    <span
                    id={"tab" + e}
                    className="closer"
                    onClick={this.tab_close}
                    >x</span></div>
                )
            })
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
                                    <div id="view3"
                                    draggable="true" 
                                    onDragEnd={this.dragEnd} 
                                    onDragStart={this.dragStart}                                
                                    >
                                        item3
                                    </div>
                                </li>

                            </ul>
                            </td>
                                <td className={'tab'}
                                onDrop={this.tabdrop}
                                onDragOver={this.allowdrop}
                                >
                                    {tabb}
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
                                    <a href="#" onClick={this.tab_close} >x</a>
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