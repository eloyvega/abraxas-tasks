import React from 'react';

import { Button, Input, TimePicker, message } from 'antd';
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
        <p>Duración</p>
        <TimePicker defaultValue={moment('00:30:00', 'HH:mm:ss')}
          placeholder="Duración"
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
              const duration = this.state.newTaskDuration;
              console.log(duration);
              if (duration <= 7200) {
                const variables = {
                  duration,
                  detail: this.state.newTaskDetail
                };
                this.props.addTask(variables);
                message.info('Listo! Tarea creada 🎉🙌');
              } else {
                message.error('No puedes crear tareas de más de 2 horas 😅');
              }
            }}
        >
          Crear
        </Button>
      </div>
    );
  }
}
