import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import './NavMenu.css';
import './Custom.css'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      menuAnchor: null, // Added missing state for the menu anchor
    };
  }

  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar style={{ flexWrap: 'wrap' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.handleMenuOpen}
          >
        
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              PizzaOrdersCalculation
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/pizza-list" style={{ textDecoration: 'none', color: 'white' }}>
              Pizza List
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/pizza-order" style={{ textDecoration: 'none', color: 'white' }}>
              Create Order
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/order-list" style={{ textDecoration: 'none', color: 'white' }}>
              Order List
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}