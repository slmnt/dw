import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'

import Bottom from './components/Bottom';
import Left from './components/Left';
import Main from './components/Main';
import Right from './components/Right';
import Top from './components/Top';
import { ListItem } from '@material-ui/core';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    width: '100%',
    left: '0%',
    top: '0%'
  },
  appBar: {
    backgroundColor: '#212121',
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '1px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 3,
  },
  'contentShift-right': {
    marginRight: 3,
  },
});

class App extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  constructor(props){
    super(props)
    this.clicked = this.clicked.bind(this);
  }


  handleDrawerOpen = () => {
    console.log('open')
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    console.log('close')
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  clicked(e){
    this.props.history.push(e)
  }

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('/top')}><Typography>top</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('/right')}><Typography>right</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('/left')}><Typography>left</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('/main')}><Typography>main</Typography></ListItem></List>
        <Divider />
        <List><ListItem button onClick={e => this.clicked('/bottom')}><Typography>bottom</Typography></ListItem></List>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            sition='sticky'
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                our service
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Route exact path="/" component={Main}/>
            <Route path="/top" component={Top} />
            <Route path="/right" component={Right} />
            <Route path="/left" component={Left} />
            <Route path="/main" component={Main}/>
            <Route path="/bottom" component={Bottom} />
          </main>
          {after}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

App = withRouter(App);
export default withStyles(styles, { withTheme: true })(App);


/*
<Route path="*" component={} />
<div>
    <header>
      <h1>React Splitter Layout</h1>
      <p>A split layout for React and modern browsers.</p>
    </header>
    <div className="main">
      <nav className="navigation-bar">
        <ul className="navigation">
          <li><NavLink to="/bottom">bottom </NavLink></li>
          <li><NavLink to="/top">top</NavLink></li>
          <li><NavLink to="/right">right</NavLink></li>
          <li><NavLink to="/left">left</NavLink></li>
          <li><NavLink to="/main">main</NavLink></li>
        </ul>
      </nav>
      <div className="child-content">
        {this.props.children}
      </div>
    </div>
  <footer>Licensed under MIT</footer>
  </div>
 */