import React, { PureComponent } from 'react';
import { Admin, Resource } from 'react-admin';

import Layout from '../Layout';
import Login from '../resources/Login';
import strapiProvider from '../providers/strapi';
import authProvider from '../providers/authProvider';
import addUploadFeature from '../providers/addUploadFeature';
import { ArticleList, ArticleEdit, ArticleCreate, ArticleIcon } from '../resources/Article';
import { OrganisationEdit, OrganisationIcon } from '../resources/Organisation';

const uploadCapableDataProvider = addUploadFeature(strapiProvider);

class App extends PureComponent {
  render() {
    return (
      <Admin appLayout={Layout} loginPage={Login} authProvider={authProvider} dataProvider={uploadCapableDataProvider}>
        <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon} />
        <Resource name="tags" />
        <Resource name="organisations" edit={OrganisationEdit} icon={OrganisationIcon} />
      </Admin>
    );
  }
}

export default App;
