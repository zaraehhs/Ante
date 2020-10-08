import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

export default function TotalAmount(props) {
  const classes = useStyles();
  const selected = props.props.selected;
  let subtotal = 0;
  for (let i = 0; i < selected.length; i++) {
    subtotal += selected[i].total;
  }

  if (selected.length === 0) return (<></>);
  return (
    <div align="right" className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        Subtotal: ${subtotal}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Sales Tax: ${3}
      </Typography>
      <Typography variant="h5" gutterBottom>
         Total: ${subtotal + 3}
      </Typography>
    </div>
  );
}
