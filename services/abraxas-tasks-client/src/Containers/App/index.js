import React from 'react';

import './index.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';

const { Footer } = Layout;

export default class extends React.Component {

  render() {
    return (
      <Layout style={{
        height: "100%", 
        backgroundColor: "#d9d9d9d4"
      }}
        data-step="1"
        data-intro="Bienvenido a Tasker, te dare un tour rapido por la herramienta."
      >
        <AppHeader />

        <AppContent />

        <Footer style={{
          textAlign: 'center',
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: "100"
        }}>
          Tasker by Marco
        </Footer>
      </Layout>
    )
  }
}
