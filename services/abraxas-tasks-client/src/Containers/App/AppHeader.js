import React from 'react';

import { Icon, Layout } from 'antd';

const { Header } = Layout;

export default class extends React.Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#2e3e50"}} >
        <a className="appheader-title"> Tasker </a>

        <div style={{ float: "right" }} >
          <a className="appheader-link"
            style={{ marginRight: "10px" }}
          >
            <Icon type="calendar" /> Tareas
          </a>

          <a className="appheader-link">
            <Icon type="line-chart" /> Estadisticas
          </a>
        </div>
      </Header>
    );
  }
}
