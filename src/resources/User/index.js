import React from 'react';
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput
} from 'react-admin';
import IdentityIcon from '@material-ui/icons/PermIdentity';
export const UserIcon = IdentityIcon;

const UserTitle = () => (<span>User Profile</span>);

const validateChangePassword = (values) => {
  const errors = {};
  if (values.newPassword !== values.confirmPassword) {
    errors.newPassword = ['The passwords don\'t match'];
    errors.confirmPassword = ['The passwords don\'t match'];
  }
  return errors
};

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props} undoable={false}>
    <SimpleForm redirect="/" validate={validateChangePassword}>
      <DisabledInput source="_id" />
      <TextInput source="username" />
      <TextInput source="email" type="email" />
      <TextInput source="newPassword" type="password" />
      <TextInput source="confirmPassword" type="password" />
    </SimpleForm>
  </Edit>
);
