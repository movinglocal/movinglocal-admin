import React from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import IdentityIcon from '@material-ui/icons/PermIdentity';

const CustomUserMenu = ({ translate, ...props }) => {
  const userLink = `/users/me`;
  const organisationId = localStorage.getItem('organisation');
  const organisationLink = `/organisations/${organisationId}`;
  return (
    <UserMenu {...props}>
      <MenuItemLink
        to={userLink}
        primaryText="User Profile"
        leftIcon={<IdentityIcon />}
      />
      <MenuItemLink
        to={organisationLink}
        primaryText="Organisation Profile"
        leftIcon={<SettingsIcon />}
      />
    </UserMenu>
  )
};

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
