import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  test: {
    backgroundColor: 'red'
  }
});

class left extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };
  
  constructor(props){
    super(props)

    this.test = props.test
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {

    return (
      <div>

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
