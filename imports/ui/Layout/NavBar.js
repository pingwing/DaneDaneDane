import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const styles = {
  root: {
    flexGrow: 1
  },
  toolbar: {
    height: 80,
    minHeight: 0,
    justifyContent: "space-between"
  },
  navLinks: {
    display: "flex",
    height: "100%",
    alignItems: "flex-end"
  }
};

const LinkTab = props => (
  <Tab component="a" onClick={event => event.preventDefault()} {...props} />
);

const SimpleAppBar = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            Otwarte dane na 5
          </Typography>
          <Tabs value={location.pathname} className={classes.navLinks}>
            <Tab
              label="Po co dobre dane?"
              value="/about"
              component={Link}
              to="/about"
            />
            <Tab
              label="Dobre praktyki"
              value="/best_practices"
              component={Link}
              to="/best_practices"
            />
            <Tab
              label="Stwórz szablon"
              value="/creator"
              component={Link}
              to="/creator"
            />
            <Tab
              label="Udostępnij dane"
              value="/upload"
              component={Link}
              to="/upload"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(SimpleAppBar);
