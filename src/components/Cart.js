import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export default function Cart(props) {
  const classes = useStyles();
  const cart_props = props.props;
  //
  // const a = items.map((item) => ({
  //   img: "",
  //   title: item.name,
  //   author: "andrew"
  // }));
  // const tileData = [
  //   {
  //     img: "",
  //     title: 'Image',
  //     author: 'author',
  //   },
  // ];

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Total: {cart_props.items.length} items</ListSubheader>
        </GridListTile>
        {cart_props.items.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.image} alt={tile.name} />
            <GridListTileBar
              title={tile.name }
              subtitle={<span>${tile.price.toFixed(2)} | {tile.quantity}</span>}
              actionIcon={
                <>
                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon} onClick={tile.add}>
                  <AddIcon />
                </IconButton>
                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon} onClick={tile.remove}>
                  <RemoveIcon />
                </IconButton>
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
