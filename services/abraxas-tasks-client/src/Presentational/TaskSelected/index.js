import React from 'react';

import './index.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Card, Input, Button, Popconfirm, TimePicker, message } from 'antd';

import { prettyFormatSeconds } from '../Utils/Timeformat';

const { Meta } = Card;
const ButtonGroup = Button.Group;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      started: false,
      editable: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ task: nextProps.task });
  }

  componentDidMount() {
    this.setState({ task: this.props.task });
  }

  startButton(isTaskSelected, task) {
    return (
      <Button type="primary" icon="play-circle-o"
        disabled={!isTaskSelected || task.finished}
        onClick={() => {
          const startCount = () => {
            return setTimeout(() => {
              const consumedTime = this.state.task.consumedTime + 1;
              if (consumedTime > this.state.task.duration) {
                const task = {...this.state.task, finished: true};
                this.setState({task});
                this.props.onChange(task);
                clearTimeout(this.state.startTimeOut);
                this.setState({started: false});
              } else {
                const task = {...this.state.task, consumedTime};
                this.setState({task});
                this.props.onChange(task);
                this.setState({startTimeOut: startCount()});
              }
            }, 1000);
          }
          this.setState({started: true});
          startCount();
        }
      }/>
    );
  }

  stopButton(isTaskSelected, task) {
    return (
      <Button type="primary" icon="pause-circle-o" disabled={!isTaskSelected}
        onClick={() => {
          this.setState({started: false});
          clearTimeout(this.state.startTimeOut);
        }
      }/>
    );
  }

  getEditButton(isTaskSelected) {
    if (!this.state.editable) {
     return (
       <Button  icon="edit" disabled={!isTaskSelected}
        onClick={
          () => {
            this.setState({started: false});
            clearTimeout(this.state.startTimeOut);
            this.setState({editable: true,
              isTaskSelected: false,
              newTaskDuration: this.state.task.duration
            });
          }
        }
      >
      </Button>
     );
    } else {
      return (
        <Button  icon="save"
          onClick={ () => {
              const duration = this.state.newTaskDuration;
              console.log(duration);
              if (duration <= 7200) {
                clearTimeout(this.state.startTimeOut);
                const task = {...this.state.task, duration: this.state.newTaskDuration};
                this.props.onChange({...task});
                this.setState({started: false, editable: false, isTaskSelected: true, task: {...task}});
                message.info('Listo! Tarea modificada 🎉🙌');
              } else {
                message.error('No puede durar más de 2 horas 😅');
              }
            }
          }
        > Guardar </Button>
     );
    }
  }

  getTitle() {
    const detail = this.state.task.detail || "...";
    if (!this.state.editable) {
      return (
        <p className="taskselected-description"> {detail} </p>
      );
    } else {
      return (
        <Input.TextArea value={detail}
            style={{marginBottom: "10px"}}
            onChange={ (evt) => {
              this.setState({task: {...this.state.task, detail: evt.target.value}});
            }
          }
        />
      );
    }
  }

  getDeleteButton(isTaskSelected) {
    return (
      <Popconfirm title="¿Estás seguro de que quieres borrar esta tarea?"
        okText="Si"
        cancelText="No"
        onConfirm={
          () => {
            this.props.onDelete(this.state.task)
            this.setState({task: {}});
            this.setState({started: false});
            clearTimeout(this.state.startTimeOut);
          }
        }
      >
        <Button type="danger" icon="delete" disabled={!isTaskSelected} />
      </Popconfirm>
    );
  }

  getRestartButton(isTaskSelected) {
    return (
      <Popconfirm title="El contador regresará a su estado inicial, ¿estás seguro de esto?"
        onConfirm={
          () => {
            const task = {...this.state.task, consumedTime: 0};
              this.setState({task});
              this.props.onChange(task);
              this.setState({started: false});
              clearTimeout(this.state.startTimeOut);
            }
          }
        okText="Si"
        cancelText="No"
      >
        <Button icon="rollback" disabled={!isTaskSelected} />
      </Popconfirm>
    );
  }

  getMarkAsCompleteButton(isTaskSelected) {
    return (
      <Button  icon={this.state.task.finished ? "close" : "check"} style={{color: this.state.task.finished ? "#fd6f69" : "#83b6a4"}}
        disabled={!isTaskSelected}
        onClick={() =>{
          let task = {...this.state.task};
          task['finished'] = !task['finished'];
          this.setState({task});
          clearTimeout(this.state.startTimeOut);
          this.setState({started: false});
          this.props.onChange(task);
          }
        }
      />
    );
  }

  getTimePicker(timer) {
    const toSeconds = (time) => ((time.hours() * 60 * 60) + (time.minutes() * 60) + time.seconds());
    return (
      <div>
        <TimePicker defaultValue={moment(timer, 'HH:mm:ss')}
          placeholder="Duración"
          onChange={(time, timeString) => this.setState({newTaskDuration: toSeconds(time)})}
        />
      </div>
    );
  }

  getTimer() {
    return (
      <div>
        <p className="taskselected-title"
          style={{borderBottom: "unset", color: "#ffffff", marginBottom: "0px", float: "left"}}>
            {this.state.editable ? this.getTimePicker(prettyFormatSeconds(this.state.task.duration)) : "Duración: " + prettyFormatSeconds((this.state.task.duration))}
        </p>
        <p className="taskselected-title"
          style={{borderBottom: "unset", color: "#f06e67", float: "right"}}>
            Tiempo restante: {prettyFormatSeconds((this.state.task.duration - this.state.task.consumedTime))}
        </p>
      </div>
    );
  }

  render() {
    const isTaskSelected = typeof this.state.task !== 'undefined' && Boolean(Object.keys(this.state.task).length);
    const task = isTaskSelected ? this.state.task : {};
    return (
      <Card
        className="taskselected"
      >
        <Meta
          title={
            <div>
              <div style={{height: "45px"}}>
              <p className="taskselected-title" style={{float: "left"}}>
                Tarea actual
              </p>
              <p className="taskselected-title" style={{float: "right", borderBottomStyle: "unset", color: !this.state.task.finished ? "#fd6f69" : "#83b6a4"}}>
                {this.state.task.finished ? "Terminada" : "Pendiente"}
              </p>
              </div>
              {this.getTimer()}
            </div>
          }
          description={
            this.getTitle()
          }
        />
        <ButtonGroup style={{float: "right"}}>
          {this.getDeleteButton(isTaskSelected)}
          {this.getEditButton(isTaskSelected)}
          {this.getRestartButton(isTaskSelected)}

          {!this.state.started || this.state.task.finished ? this.startButton(isTaskSelected, task): this.stopButton(isTaskSelected, task)}

          {this.getMarkAsCompleteButton(isTaskSelected)}
        </ButtonGroup>
      </Card>
    )
  }
}
