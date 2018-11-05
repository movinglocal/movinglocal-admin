import React from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

const CustomUserMenu = ({ translate, ...props }) => {
  const organisationId = localStorage.getItem('organisation');
  const organisationLink = `/organisations/${organisationId}`;
  return (
    <UserMenu {...props}>
      <MenuItemLink
        to={organisationLink}
        primaryText="Profile"
        leftIcon={<SettingsIcon />}
      />
    </UserMenu>
  )
};

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
