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
      <div>
        <div className="tasks-actions-container" style={{float: "right", marginTop: "10px", marginRight: "45px" }}>
          <div
            style={{
              float: "right"
            }}
          >
            <Button style={{marginLeft: "5px"}}
              type="primary" icon="plus"
              data-step="2"
              data-intro="Aquí puedes crear tareas. Cuéntame qué quieres hacer y cuánto ⏰ te tomará"
              onClick={() => this.setState({visibleCreateTask: true})}
            >
              Nueva tarea
            </Button>
          </div>

          <div
            style={{
              float: "right"
            }}
            data-step="9"
            data-intro="Con este botón podrás crear 50 tareas 〰️〰️"
          >
            <CreateRandomTasks style={{marginLeft: "5px"}} />
          </div>

          <div
            style={{
              float: "right"
            }}
          >
            <DeleteAllTasks />
          </div>

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
        <Content>
          {this.getCreateTaskDrawer()}

          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "73px",
            }}
          >
            <div className="tasks-header-container">
              <div
                style={{ height: "150px", marginTop: "22px" }}
                className="chart-tasks-completenes-container"
                data-step="8"
                data-intro="Esta gráfica te mostrará un resumen de tus tareas por día 📈"
              >
                <ChartTasksCompletenesContainer />
              </div>
              <div
                className="task-selected-container"
                data-step="7"
                data-intro="Cuando des clic sobre una tarea, podrás ver todos los detalles aquí 👆"
              >
                <TaskSelected task={this.state.selectedTask} />
              </div>
            </div>

            <div style={{marginTop: "35px", width: "90%"}}>
              {this.getNewTaskButton()}

              <TasksFilter onClickSearch={(filter) => {
                this.setState({filter})
              }}/>
            </div>

          </div>
          <div
            data-step="3"
            data-intro="Una vez creada, podrás ver tu tarea aquí 👀"
            style={{
              borderBottomColor:" #fccc5b",
              borderBottomStyle: "solid",
              color: "#2e3e4f",
              fontWeight: "bold",
              marginBottom: "7px"
            }}
          > Mis tareas </div>
          {TasksGridContainer({...this.state.filter, onClick: (task) => this.setState({selectedTask: task})})}
        </Content>
      </ApolloProvider>
    )
  }
}
