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
  SelectInput,
  FormDataConsumer,
  Filter,
  required
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import BookIcon from '@material-ui/icons/Book';

import './style.css';

const articleTypes = [
  {id: 'news', name: 'News'},
  {id: 'event', name: 'Event'}
];

export const ArticleIcon = BookIcon;

const ArticleFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="_q" alwaysOn />
    <TextInput label="Title" source="title" />
    <BooleanInput label="Published" source="published" defaultValue={false} />
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

const WorkingAutocompleteArrayInput = props => {
  if (props.input.value === '') {
    props.input.value = [];
  } else if (props.input.value) {
    props.input.value = props.input.value.map(d => d.id || d);
  }
  
  // @TODO avoid duplicates

  return <AutocompleteArrayInput {...props} />;
}

export const ArticleEdit = (props) => (
  <Edit undoable={false} title={<ArticleTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="title" />
      <LongTextInput source="teaser" />
      <RichTextInput source="content" />
      <ImageInput source="image" label="Pictures" accept="image/*">
        <ImageField source="url" title="name" />
      </ImageInput>
      <ReferenceArrayInput label="Tags" reference="tags" source="tags">
        <WorkingAutocompleteArrayInput />
      </ReferenceArrayInput>
      <SelectInput source="type" choices={articleTypes} defaultValue={'news'} />
      <FormDataConsumer>
        {({ formData, ...rest }) => (formData.type === 'event') &&
          <DateInput source="event date" />
        }
      </FormDataConsumer>
      <DateInput label="Publication date" source="date" />
      <TextInput source="address" />
      <BooleanInput label="Published" source="published" />
    </SimpleForm>
  </Edit>
);

export const ArticleCreate = (props) => (
  <Create undoable={false} title="Create an Article" {...props}>
    <SimpleForm redirect="list">
      <TextInput source="title" validate={[required()]} />
      <LongTextInput source="teaser" />
      <RichTextInput source="content" />
      <ImageInput source="image" label="Pictures" accept="image/*">
        <ImageField source="url" title="name" />
      </ImageInput>
      <ReferenceArrayInput label="Tags" reference="tags" source="tags">
        <WorkingAutocompleteArrayInput />
      </ReferenceArrayInput>
      <SelectInput source="type" choices={articleTypes} defaultValue={'news'} />
      <FormDataConsumer>
        {({ formData, ...rest }) => (formData.type === 'event') &&
          <DateInput source="event date" />
        }
      </FormDataConsumer>
      <DateInput label="Publication date" source="date" defaultValue={new Date()} />
      <TextInput source="address" />
      <BooleanInput label="Published" source="published" defaultValue={true} />
    </SimpleForm>
  </Create>
);
