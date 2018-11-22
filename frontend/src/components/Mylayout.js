import React, { Component } from 'react';   
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './Mylayout.css'

import { Scrollbars } from 'react-custom-scrollbars';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

const styles = theme => ({
    table_view:{
        minWidth: '10%',
        maxWidth: 100,
        width: "10%",
        //backgroundColor:"#00FF00",
    },
    table_tab:{
        //backgroundColor:"#FF0000",
        height: "5%",
    },
    table_body:{
        //backgroundColor:"#00FFF0",
        height: "70%",
    },
    table_result:{
        // backgroundColor:"#000000",
    }
});
  
class Mylayout extends Component {
    state = {
        flag: false,
        val: '',
    }

    constructor(props) {
        super(props);

        this.select = this.select.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(newValue) {
        this.setState({val: newValue})
    }    

    componentDidMount(){
      
    }

    dragStart(e) {
        // Update our state with the item that is being dragged
        // e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData("text", e.target.id);
    }
    
    dragOver(e) {
        e.preventDefault()
    }
    
    dragEnd(e) {
    }

    allowdrop(e){
        e.preventDefault();
    }
    drop(e){
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
    }

    select(e){
        console.log(e.target.id)

        if(this.state.flag)
            this.setState({flag: false})
        else
            this.setState({flag: true})

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
            width="100vw"
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
            con = (<div>test</div>);
        }else{
            con = null;
        }

        return (
            <Scrollbars style={{ width: "100vw", height: "90vh" }}>
                <table className={classes.table}>
                    <tbody>
                        <tr onDragOver={this.dragOver}>
                            <td rowSpan="3" 
                            className={classes.table_view}
                            onDrop={this.drop}
                            onDragOver={this.allowdrop}
                            >
                                <a
                                href="#1"
                                className="item"
                                id={1}
                                draggable="true" 
                                onDragEnd={this.dragEnd} 
                                onDragStart={this.dragStart}                                
                                onClick={this.select}
                                >
                                    itme1
                                    {con}
                                </a>
                                <br/>
                                <a
                                href="#2"
                                className="item"
                                id={2}
                                draggable="true" 
                                onDragEnd={this.dragEnd} 
                                onDragStart={this.dragStart}                                
                                onClick={this.select}
                                >
                                    itme2
                                </a>
                                <br/>
                                <a
                                href="#3"
                                className="item"
                                id={3}
                                draggable="true" 
                                onDragEnd={this.dragEnd} 
                                onDragStart={this.dragStart}                                
                                onClick={this.select}
                                >
                                    itme3
                                </a>
                            </td>
                            <td className={classes.table_tab}
                            draggable="true" 
                            onDrop={this.drop}
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
                            result
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Scrollbars>
        );
  	}   
}

Mylayout.PropTypes = PropTypes;
export default withStyles(styles)(Mylayout);