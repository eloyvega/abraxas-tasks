import React from 'react';

import { Button } from 'antd';
import { Input } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskDetail: "",
      newTaskDuration: 1800
    };
  }

  getTimePicker() {
    const toSeconds = (time) => ((time.hours() * 60 * 60) + (time.minutes() * 60) + time.seconds());
    return (
      <div>
        <p>Duracion</p>
        <TimePicker defaultValue={moment('00:30:00', 'HH:mm:ss')} 
          placeholder="Duracion" 
          onChange={(time, timeString) => this.setState({newTaskDuration: toSeconds(time)})}
        />
      </div>
    );
  }  

  render() {
    return (
      <div>
        <p>Descripcion</p>
        <TextArea placeholder="Programar un pacman" 
          style={{marginBottom: "6px"}} 
          onChange={(evt) => {this.setState({newTaskDetail: evt.target.value})}} 
        />
        
        {this.getTimePicker()}
        <br />

        <Button 
            type="primary" 
            style={{width: "100%", marginTop: "15px"}}
            onClick={() => {
              const variables = {
                duration: this.state.newTaskDuration,
                detail: this.state.newTaskDetail
              };
              this.props.addTask(variables);
            }}
        > 
          Crear 
        </Button>
      </div>
    );
  }
}
