import React from 'react';

import './index.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';

export default class extends React.Component {

  render() {
    return (
      <Layout style={{
        height: "100%",
        backgroundColor: "#d9d9d9d4"
      }}
        data-step="1"
        data-intro="Bienvenido a Tasker, te daré un tour rápido por la herramienta 👋"
      >
        <AppHeader />

        <AppContent />
      </Layout>
    )
  }
}
