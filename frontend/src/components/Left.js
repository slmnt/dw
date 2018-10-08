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
    val: ''
  };
  
  constructor(props){
    super(props)

    this.test = props.test
    this.onChange = this.onChange.bind(this)
    console.log(window.innerHeight)
    console.log(window.innerWidth)
  }

  onChange(newValue) {
    this.setState({val: newValue})
  }
  
  render() {

    return (
      <div>
        <AceEditor
      mode="python"
      theme="monokai"
      onChange={e => this.onChange}
      name="UNIQUE_ID_OF_DIV"
      fontSize={18}
      height={100}
      editorProps={{$blockScrolling: false}}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 4,
        }}      
      />
      <Button onClick={e => this.test('test')}>test</Button>

      </div>
    );
  }
}

left.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(left);
