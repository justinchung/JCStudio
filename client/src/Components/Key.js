import React from 'react';
import { withStyles } from '@material-ui/core/styles';

class Key extends React.Component {
  render() {
    const { classes, label, keyname, keycode, show } = this.props;
    const bgColor = {
    	backgroundColor: (show ? 'black' : 'grey')
    }
    return (
      <div className={classes.key} data-key={keyname} data-keycode={keycode} data-show={show} style={bgColor}>
        {label}
      </div>
    );
  }
}

const styles = {
  key: {
    height: 75, 
    width: 75,
    display: 'inline-block',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
    overflow: 'hidden',
    border: '1px solid white',
    backgroundColor: '#303235',
    transition: '0.07s',
    color: 'white',
    fontFamily: 'Comic Sans MS',
    fontSize: 19,
    fontWeight: 'lighter',
    borderRadius: 5
  }
}

export default withStyles(styles)(Key);