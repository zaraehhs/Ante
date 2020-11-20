import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Dashboard from '../pages/Dashboard'
import { Link } from 'react-router-dom';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ViewListIcon from '@material-ui/icons/ViewList';
import { UserContext } from "../firebase/auth-provider";

function ListItemLink(props) {

  return <ListItem button component="a" {...props} />;
}



// const business = useContext(UserContext).business;
// const user = useContext(UserContext).user;



export function mainListItems(admin) {
  return (<>
    {admin ?
      <ListItemLink href="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemLink> : <></>}


    <ListItemLink href="/new_order">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Checkout" />
    </ListItemLink>

    {admin ? <ListItemLink href="/orders">
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Sales" />
    </ListItemLink> : <></>}

    <ListItemLink href="/userprofile">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemLink>

    {admin ? <ListItemLink href="/inventory">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemLink> : <></>}
  </>);
}

// export const mainListItems = (
//   <>
//     {useContext(UserContext).business === useContext(UserContext).user ?
//       <ListItemLink href="/dashboard">
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItemLink> : <></>}


//     <ListItemLink href="/new_order">
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Checkout" />
//     </ListItemLink>

//     <ListItemLink href="/orders">
//       <ListItemIcon>
//         <MonetizationOnIcon />
//       </ListItemIcon>
//       <ListItemText primary="Sales" />
//     </ListItemLink>

//     <ListItemLink href="/userprofile">
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Profile" />
//     </ListItemLink>

//     <ListItemLink href="/inventory">
//       <ListItemIcon>
//         <ViewListIcon />
//       </ListItemIcon>
//       <ListItemText primary="Inventory" />
//     </ListItemLink>
//   </>
// );

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>More reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
