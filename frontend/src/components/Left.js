import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';



const styles = theme => ({
  test: {
    backgroundColor: 'red'
  }
});

class left extends React.Component {
  state = {
    val: '',
    h: 0,
    w: 0
  };
  
  constructor(props){
    super(props)

    this.test = props.test
    this.onChange = this.onChange.bind(this)
    console.log(props.glContainer.height)
    console.log(props.glContainer.width)
    this.setState({
      h: props.glContainer.height,
      w: props.glContainer.width
    })
  }
  

  onChange(newValue) {
    this.setState({val: newValue})
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <AceEditor
      mode="python"
      theme="monokai"
      value={this.state.val}
      onChange={(e) => this.onChange(e)}
      name="UNIQUE_ID_OF_DIV"
      fontSize={18}
      height={100}
      editorProps={{$blockScrolling: Infinity}}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 4,
        }}      
      />
      <Button onClick={e => this.test(this.state.val)}>test</Button>
      {this.state.val}
      </div>
    );
  }
}

left.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(left);
