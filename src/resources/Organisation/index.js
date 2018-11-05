import React from 'react';
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    LongTextInput,
    ImageInput,
    ImageField
} from 'react-admin';
import FaceIcon from '@material-ui/icons/Face';
export const OrganisationIcon = FaceIcon;

const OrganisationTitle = () => (<span>Profile</span>);

export const OrganisationEdit = (props) => (
  <Edit title={<OrganisationTitle />} {...props}>
    <SimpleForm redirect="/">
      <DisabledInput source="_id" />
      <TextInput source="name" />
      <LongTextInput source="description" />
      <ImageInput source="image" label="Pictures" accept="image/*">
      <ImageField source="url" title="name" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
