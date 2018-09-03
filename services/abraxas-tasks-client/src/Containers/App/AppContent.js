import React from 'react';

import 'intro.js/introjs.css';
import introJs from 'intro.js/intro.js';
import { ApolloProvider } from 'react-apollo'
import { Button, Layout, Drawer } from 'antd';

import { client } from "../Utils/Graphql";
import TasksFilter from '../../Presentational/TasksFilter';
import TasksGridContainer from "../TasksGridContainer";
import TaskSelectedContainer from "../TaskSelectedContainer";
import CreateTasksContainer from "../CreateTaskContainer";
import CreateRandomTasksContainer from "../CreateRandomTasksContainer";
import DeleteAllTasksContainer from "../DeleteAllTasksContainer";
import ChartTasksCompletenesContainer from "../ChartTasksCompletenesContainer";

const { Content } = Layout;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCreateTask: false,
      filter: {},
      selectedTask: {},
    };
  }

  componentDidMount() {
    this.setState({tasks: this.state.tasks});
    introJs().start();
  }

  getNewTaskButton() {
    const CreateRandomTasks = CreateRandomTasksContainer(this.state.filter);
    const DeleteAllTasks = DeleteAllTasksContainer(this.state.filter, () => this.setState({selectedTask: {}}));
    return (
      <div style={{ padding: "17px", width: "90%"}}>
        <div style={{float: "right", marginTop: "10px"}}>
          <DeleteAllTasks />
          <CreateRandomTasks style={{marginLeft: "5px"}} />
          <Button style={{marginLeft: "5px"}}
            type="primary" icon="plus" size="large"
            data-step="2"
            data-intro="Lo primero que debes saber es que aqui puedes crear tareas. Cuentame que quieres hacer y cuanto tiempo te tomara."
            onClick={() => this.setState({visibleCreateTask: true})}
          >
            Nueva tarea
          </Button>
        </div>
      </div>
    );
  }

  getCreateTaskDrawer() {
    const CreateTask = CreateTasksContainer(this.state.filter, () => this.setState({visibleCreateTask: false}));
    return (
      <Drawer
        title="Crear tarea"
        placement="right"
        closable={true}
        visible={this.state.visibleCreateTask}
        onClose={() => {this.setState({visibleCreateTask: false})}}
      >
        {<CreateTask/>}
      </Drawer>
    );
  }

  render() {
    const TaskSelected = TaskSelectedContainer(this.state.filter);
    return (
      <ApolloProvider client={client}>
        <Content style={{
          padding: '0 50px',
          marginTop: "300px",
          overflow: "overlay",
          marginBottom: "78px"
        }}>
          {this.getCreateTaskDrawer()}

          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "73px",
            }}
          >
            <div style={{display: "flex"}}>
              <div style={{ height: "140px", width: "39%", marginTop: "22px" }}>
                <ChartTasksCompletenesContainer />
              </div>
              <div style={{ height: "140px", width: "50%" }}>
                <TaskSelected task={this.state.selectedTask} />
              </div>
            </div>

            <div>
              {this.getNewTaskButton()}

              <TasksFilter onClickSearch={(filter) => {
                this.setState({filter})
              }}/>
            </div>

          </div>
          {TasksGridContainer({...this.state.filter, onClick: (task) => this.setState({selectedTask: task})})}
        </Content>
      </ApolloProvider>
    )
  }
}
