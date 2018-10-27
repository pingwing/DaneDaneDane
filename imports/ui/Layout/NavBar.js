import React from "react";
import Button from "@material-ui/core/Button";
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
    justifyContent: "space-between"
  },
  navLinks: {
    display: "flex"
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
          <Tabs>
            <LinkTab label="Page One" href="page1" />
            <LinkTab label="Page Two" href="page2" />
            <LinkTab label="Page Three" href="page3" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(SimpleAppBar);
