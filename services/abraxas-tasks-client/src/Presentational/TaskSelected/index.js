import React from 'react';

import './index.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Card, Input, Button, Popconfirm, TimePicker } from 'antd';

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
        disabled={!isTaskSelected}
        onClick={() => {
          const startCount = () => {
            return setTimeout(() => {
              const consumedTime = this.state.task.consumedTime + 1;
              if (consumedTime > this.state.task.duration) {
                const task = {...this.state.task, finished: true};
                this.setState({task});
                this.props.onChange(task);
                clearTimeout(this.state.startTimeOut);
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
            this.setState({editable: true,
              isTaskSelected: false
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
              this.setState({editable: false, isTaskSelected: true})
              this.props.onChange(this.state.task);
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
      <Popconfirm title="Estas seguro de borrar esta tarea"
        okText="Si"
        cancelText="No"
        onConfirm={
          () => {
            this.props.onDelete(this.state.task)
            this.setState({task: {}});
          }
        }
      >
        <Button type="danger" icon="delete" disabled={!isTaskSelected} />
      </Popconfirm>
    );
  }

  getRestartButton(isTaskSelected) {
    return (
      <Popconfirm title="El contador regresara a su estado inicial, estas seguro de esto?"
        onConfirm={
          () => {
            const task = {...this.state.task, consumedTime: 0};
              this.setState({task});
              this.props.onChange(task);
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
      <Button  icon={this.state.task.finished ? "check" : "close" }
        disabled={!isTaskSelected}
        onClick={() =>{
          let task = {...this.state.task};
          task['finished'] = !task['finished'];
          this.setState({task});
          this.props.onChange(task);
          }
        }
      />
    );
  }

  getTimePicker(timer) {
    const toSeconds = (time) => ((time.hours() * 60 * 60) + (time.minutes() * 60) + time.seconds());
    return (
      <div style={{float: "right"}}>
        <TimePicker defaultValue={moment(timer, 'HH:mm:ss')}
          placeholder="Duracion"
          onChange={(time, timeString) => this.setState({newTaskDuration: toSeconds(time)})}
        />
      </div>
    );
  }

  getTimer() {
    if (!this.state.editable) {
      return (
        <p className="taskselected-title"
          style={{borderBottomColor: "#fbc654", color: "#f06e67", float: "right"}}>
          {
            prettyFormatSeconds((this.state.task.duration - this.state.task.consumedTime))
          }
        </p>
      );
    } else {
      return this.getTimePicker(prettyFormatSeconds((this.state.task.duration - this.state.task.consumedTime)));
    }
  }

  render() {
    const isTaskSelected = typeof this.state.task !== 'undefined' && Boolean(Object.keys(this.state.task).length);
    const task = isTaskSelected ? this.state.task : {};
    return (
      <Card
        data-step="7"
        data-intro="Cuando des click sobre una de las tareas, la veras a detalle aqui y podras borrarla, editarla o iniciar la ejecucion. Eso es todo, ten un dia productivo ;)."
        className="taskselected"
      >
        <Meta
          title={
            <div>
              <p className="taskselected-title">  Tarea actual </p>
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

          {!this.state.started ? this.startButton(isTaskSelected, task): this.stopButton(isTaskSelected, task)}

          {this.getMarkAsCompleteButton(isTaskSelected)}
        </ButtonGroup>
      </Card>
    )
  }
}
