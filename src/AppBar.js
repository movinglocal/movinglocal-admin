import React from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

const CustomUserMenu = ({ translate, ...props }) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/user/me"
      primaryText="Profile"
      leftIcon={<SettingsIcon />}
    />
  </UserMenu>
);

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
