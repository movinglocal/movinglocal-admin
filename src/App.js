import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Admin, Resource } from 'react-admin';
import Layout from './Layout';
import strapiProvider from './providers/strapi';
import authProvider from './providers/authProvider';
import addUploadFeature from './providers/addUploadFeature';

import { ArticleList, ArticleEdit, ArticleCreate, ArticleIcon } from './resources/Article';
import { UserEdit, UserIcon } from './resources/User';

const uploadCapableDataProvider = addUploadFeature(strapiProvider);

class App extends PureComponent {
  render() {
    return (
      <Admin appLayout={Layout} authProvider={authProvider} dataProvider={uploadCapableDataProvider}>
          <Resource name="article" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon}/>
          <Resource name="tag"/>
          <Resource name="user" edit={UserEdit} icon={UserIcon}/>
      </Admin>
    );
  }
}

export default App;
