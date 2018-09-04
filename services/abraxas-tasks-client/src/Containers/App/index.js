import React from 'react';

import './index.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

import AppHeader from './AppHeader.js';
import AppContent from './AppContent.js';

export default class extends React.Component {

  render() {
    return (
      <div style={{height: "100%"}}>
        <div className="mobile-view">
          <div>
            <div>
              <h1>Tasker</h1>
              <p>
                Aun no contamos con opción para pantallas de este tamaño. Entra desde una pantalla mas grande :)
              </p>
            </div>
          </div>
        </div>
      <Layout
        className="main-layout"
        style={{
          height: "100%",
          backgroundColor: "#d9d9d9d4"
      }}
        data-step="1"
        data-intro="Bienvenido a Tasker, te daré un tour rápido por la herramienta 👋"
      >
        <AppHeader />

        <AppContent />
      </Layout>
      </div>
    )
  }
}
