import React from 'react';
import {
    Edit,
    SimpleForm,
    DisabledInput,
    LongTextInput,
    ImageInput,
    ImageField
} from 'react-admin';
import FaceIcon from '@material-ui/icons/Face';
export const UserIcon = FaceIcon;

const UserTitle = () => (<span>Profile</span>);

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm redirect="/">
            <DisabledInput source="_id" />
            <DisabledInput source="username" />
            <DisabledInput source="email" />
            <LongTextInput source="description" />
            <ImageInput source="image" label="Pictures" accept="image/*">
                <ImageField source="url" title="name" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);
