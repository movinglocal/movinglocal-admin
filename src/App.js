import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Admin, Resource } from 'react-admin';
import strapiProvider from './providers/strapi';
import authProvider from './providers/authProvider';
import addUploadFeature from './providers/addUploadFeature';

import { ArticleList, ArticleEdit, ArticleCreate, ArticleIcon } from './resources/Article';

const uploadCapableDataProvider = addUploadFeature(strapiProvider);

class App extends PureComponent {
  render() {
    return (
      <Admin authProvider={authProvider} dataProvider={uploadCapableDataProvider}>
          <Resource name="article" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon}/>
      </Admin>
    );
  }
}

export default App;
