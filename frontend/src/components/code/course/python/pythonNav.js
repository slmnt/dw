import React, { Component } from 'react';   
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';

class pyNav extends Component {

  constructor(props){
    super(props)
    props.set('python')
  }

  render() {
    return (
      <div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >開く</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <Divider inset/>
            <a href="./1">
              1
            </a>
            <Divider inset/>
            <a href="./2">
              2
            </a>
            <Divider inset/>
            <a href="./3">
              3
            </a>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
      );
  }
}

export default pyNav;