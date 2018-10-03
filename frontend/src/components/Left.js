import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
  render() {

    return (
      <div>
        test
      </div>
    );
  }
}

left.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(left);
