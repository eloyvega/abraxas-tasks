import React from 'react';

import './index.css';
import 'antd/dist/antd.css';

import TaskBox from '../TaskBox';

export default class extends React.Component {
  render() {
    let tasks = this.props.tasks;
    if (typeof tasks === 'undefined')
      tasks = [];
    const tasksBoxes = tasks.map((task, index) => <TaskBox task={task} key={index} onClick={(task) => this.props.onClick(task)} />);
    return (
      <div
        className="taskgrid"
      >
        {tasksBoxes}
      </div>
    );
  }
}
