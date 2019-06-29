import React from 'react';

import { Layout } from 'antd';

const { Header } = Layout;

export default class extends React.Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#2e3e50"}} >
        <a className="appheader-title"> Tasker </a>
      </Header>
    );
  }
}
