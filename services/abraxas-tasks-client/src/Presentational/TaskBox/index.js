import React from 'react';

import './index.css';
import 'antd/dist/antd.css';
import { Icon } from 'antd';

import { prettyFormatSeconds } from '../Utils/Timeformat';

export default class extends React.Component {

  render() {
    const durationInMinutes = prettyFormatSeconds(this.props.task.duration);
    const consumedTimeInMinutes = prettyFormatSeconds(this.props.task.consumedTime);
    let taskStatus = "close-circle-o";
    if (this.props.task.finished)
      taskStatus = "check-circle-o";

    return (
      <div className="taskbox"
        style={this.props.task.finished ? {backgroundColor: "#2e3e50"}: {}}
        onClick={() => this.props.onClick(this.props.task)}
      >
        <div className="taskbox-info">
          <div style={{ "height": "160px" }}>

            <div style={{borderBottomStyle: "solid", borderBottomColor: "#fccc5b", height: "35px"}}>
              <div style={{height: "35px", float: "left"}}>
                <p style={{display: "inline-block", fontSize: "18px"}}>
                  {consumedTimeInMinutes}
                </p>
                <p style={{display: "inline-block", fontSize: "20px"}}>
                  /{durationInMinutes}
                </p>
              </div>
              <div style={{height: "35px", float: "right"}}>
                <p style={{display: "inline-block", fontSize: "22px", fontWeight: "bold"}}>
                  <Icon type={taskStatus} style={{fontSize: "25px", marginTop: "-5px"}}/>
                </p>
              </div>
            </div>

            <div>
              <p style={{fontSize: "15px"}}>
                {this.props.task.detail}
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
