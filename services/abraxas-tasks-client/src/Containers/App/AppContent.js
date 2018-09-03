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
      <div
        data-step="9"
        data-intro="Este boton te permitira crear 50 tareas aleatorias"
      >
        <div className="tasks-actions-container" style={{float: "right", marginTop: "10px", marginRight: "45px" }}>
          <DeleteAllTasks />
          <CreateRandomTasks style={{marginLeft: "5px"}} />
          <Button style={{marginLeft: "5px"}}
            type="primary" icon="plus"
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
                data-intro="Esta grafica te mostrara un resumen de tus tareas por dia de la semana."
              >
                <ChartTasksCompletenesContainer />
              </div>
              <div 
                className="task-selected-container"
                data-step="7"
                data-intro="Cuando des click sobre una tarea veras toda su informacion aqui."
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
            data-intro="Una vez creada la veras aqui"
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
