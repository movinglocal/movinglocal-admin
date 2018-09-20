import React from 'react';
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    DisabledInput,
    TextInput,
    DateInput,
    ImageInput,
    ImageField,
    Filter,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import BookIcon from '@material-ui/icons/Book';
export const ArticleIcon = BookIcon;

const ArticleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Title" source="title" />
    </Filter>
);

export const ArticleList = (props) => (
    <List {...props} filters={<ArticleFilter />} sort={{ field: 'date', order: 'DESC' }}>
        <Datagrid>
            <TextField source="title" />
            <DateField source="date" />
            <EditButton basePath="/article" />
        </Datagrid>
    </List>
);

const ArticleTitle = ({ record }) => {
    return <span>Article {record ? `"${record.title}"` : ''}</span>;
};

export const ArticleEdit = (props) => (
    <Edit title={<ArticleTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <RichTextInput source="content" />
            <ImageInput source="image" label="Pictures" accept="image/*">
                <ImageField source="url" title="name" />
            </ImageInput>
            <DateInput label="Publication date" source="date" />
        </SimpleForm>
    </Edit>
);

export const ArticleCreate = (props) => (
    <Create title="Create an Article" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <RichTextInput source="content" />
            <ImageInput source="image" label="Pictures" accept="image/*">
                <ImageField source="url" title="name" />
            </ImageInput>
            <DateInput label="Publication date" source="date" />
        </SimpleForm>
    </Create>
);
