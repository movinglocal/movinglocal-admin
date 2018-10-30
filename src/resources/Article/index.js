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
  LongTextInput,
  DateInput,
  ImageInput,
  ImageField,
  BooleanInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  Filter,
  required
} from 'react-admin';

import TagQuickCreateButton from '../Tag/TagQuickCreateButton';
import RichTextInput from 'ra-input-rich-text';
import BookIcon from '@material-ui/icons/Book';
export const ArticleIcon = BookIcon;

const ArticleFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="_q" alwaysOn />
    <TextInput label="Title" source="title" />
    <BooleanInput label="Published" source="isVisible" format={invert} parse={invert} defaultValue={false} />
  </Filter>
);

export const ArticleList = (props) => (
  <List {...props} filters={<ArticleFilter />} sort={{ field: 'date', order: 'DESC' }}>
    <Datagrid>
      <TextField source="title" />
      <DateField source="date" showTime />
      <EditButton basePath="/articles" />
    </Datagrid>
  </List>
);

const ArticleTitle = ({ record }) => {
  return <span>Article {record ? `"${record.title}"` : ''}</span>;
};

const invert = v => !v;

export const ArticleEdit = (props) => (
  <Edit title={<ArticleTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="title" />
      <LongTextInput source="teaser" />
      <RichTextInput source="content" />
      <ImageInput source="image" label="Pictures" accept="image/*">
      <ImageField source="url" title="name" />
      </ImageInput>
      <ReferenceArrayInput label="Tags" reference="tags" source="tags">
      <AutocompleteArrayInput />
      </ReferenceArrayInput>
      <TagQuickCreateButton />
      <DateInput label="Publication date" source="date" />
      <BooleanInput label="Published" source="isVisible" format={invert} parse={invert} />
    </SimpleForm>
  </Edit>
);

export const ArticleCreate = (props) => (
  <Create title="Create an Article" {...props}>
    <SimpleForm redirect="list">
      <TextInput source="title" validate={[required()]} />
      <LongTextInput source="teaser" />
      <RichTextInput source="content" />
      <ImageInput source="image" label="Pictures" accept="image/*">
      <ImageField source="url" title="name" />
      </ImageInput>
      <ReferenceArrayInput label="Tags" reference="tags" source="tags">
      <AutocompleteArrayInput />
      </ReferenceArrayInput>
      <TagQuickCreateButton />
      <DateInput label="Publication date" source="date" defaultValue={new Date()} />
      <BooleanInput label="Published" source="isVisible" format={invert} parse={invert} defaultValue={true} />
    </SimpleForm>
  </Create>
);
