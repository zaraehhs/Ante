import React, { useContext, useEffect, useState, useReducer } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Name from "../userComponents/Name";
import Credentials from "../userComponents/Credentials";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Contact from "../userComponents/Contact";
import { auth } from "../firebase/firebase.utils";
import profile from '../images/profile.png';
import { UserContext } from "../firebase/auth-provider";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { firestore } from "../firebase/firebase.utils";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ANTE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const logout = () => {
  auth.signOut();
}

const deleteUser = (id) => {
  firestore.collection('employees').doc(id).delete();
}

const addEmployee = (email, bid, setShowForm) => {
  setShowForm(false);

  firestore.collection("employees").add({
    business: bid,
    email: email
  }).then(function (docRef) {
  });
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function UserProfile() {
  const name = useContext(UserContext).name;
  const email = useContext(UserContext).email;
  const bid = useContext(UserContext).business;
  const uid = useContext(UserContext).user;
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    const collectionRef = firestore.collection("employees").where("business", "==", bid);
    collectionRef.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
        const { email } = doc.data();
        return {
          id: doc.id,
          email: email
        }
      });
      setEmployees(list);
      forceUpdate();
    });

  });


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Profile
          </Typography>
          <IconButton color="inherit">
            <ExitToAppIcon id="clickTwo" onClick={logout} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>


          <br />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing="6"
          >
            <Grid item>
              <span>          <img src={profile} height="200px" /></span>
            </Grid>
            <Grid item>
              <h1>{name}</h1><h3><a href={"mailto:" + email}>{email}</a> - {bid === uid ? "Business Owner" : "Employee"}</h3>
            </Grid>
          </Grid>

          <br />
          <br />



          {bid === uid ?
            <>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee Email</TableCell>
                      <TableCell align="right">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.email}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="inherit">
                            <DeleteIcon onClick={() => deleteUser(row.id)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              {showForm ?
                <>
                  <br />
                  <TextField variant="outlined" required fullWidth label="Employee Email" autoFocus onChange={(event) => setAddEmail(event.target.value)} />
                  <br />
                  <center style={{ marginTop: "30px" }}>
                    <Button style={{ marginRight: "10px" }} variant="contained" color="warning" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button style={{ marginLeft: "10px" }} variant="contained" color="primary" onClick={() => addEmployee(addEmail, bid, setShowForm)}>Add</Button></center>
                </>
                : <center><Button variant="contained" color="primary" onClick={() => setShowForm(true)}>Add Employee</Button></center>}
            </> : <></>}

        </Container>
      </main>
    </div>
  );

  //   <Grid container spacing={3}>
  // {/* Chart */}
  // <Grid item xs={12} md={8} lg={6}>
  //   <Paper className={fixedHeightPaper}>
  //     <Name />
  //   </Paper>
  // </Grid>
  // {/* Recent Deposits */}
  // <Grid item xs={12} md={4} lg={6}>
  //   <Paper className={fixedHeightPaper}>
  //     <Credentials />
  //   </Paper>
  // </Grid>
  // {/* Recent Orders */}
  // <Grid item xs={12}>
  //   <Paper className={classes.paper}>
  //     <Contact />
  //   </Paper>
  // </Grid>
  // </Grid>
  // <Box pt={4}>
  // <Copyright />
  // </Box>
}

