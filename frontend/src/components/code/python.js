import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

const styles = theme => ({
  test: {
    backgroundColor: 'red'
  }
});

class Python extends React.Component {
  state = {
    val: '',
  };
  
  constructor(props){
    super(props)

    this.get = props.get
    this.onChange = this.onChange.bind(this)
  }
  
  onChange(newValue) {
    this.setState({val: newValue})
    this.props.set(this.state.val)
  }

  render() {
    const editor = (
      <AceEditor
      //mode="java"
      //mode="python"
      mode={this.get()}
      theme="monokai"
      value={this.state.val}
      onChange={(e) => this.onChange(e)}
      name="UNIQUE_ID_OF_DIV"
      fontSize={18}
      width={(this.props.glContainer.width)}
      height={(this.props.glContainer.height)}
      editorProps={{$blockScrolling: Infinity}}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 4,
      }}      
      />  
    );

    return (
      <div>
        {editor}
      </div>
    );
  }
}

Python.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Python);
