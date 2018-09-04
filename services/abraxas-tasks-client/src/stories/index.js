import React from 'react';

import { storiesOf } from '@storybook/react';

import TasksGrid from "../Presentational/TasksGrid";
import TaskSelected from "../Presentational/TaskSelected";


storiesOf('Lista de tareas', module)
  .add('con duraciones y estados aleatorios', () => <TasksGrid
    tasks={[
      {detail: "Tarea corta", duration: 1800},
      {detail: "Tarea media", duration: 3600},
      {detail: "Tarea larga", duration: 7200},
      {detail: "Tarea terminada", finished: true},
      {detail: "Tarea ejemplo", duration: 1724},
      {detail: "Escribir README.md", finished: true},
    ]}
    onClick={(task) => alert(task.detail)}
  />);

storiesOf('Visor de tarea seleccionada', module)
  .add('Tarea seleccionada', () => <TaskSelected
    task={{detail: "Escribir README.md", finished: true, consumedTime: 60, duration: 6000}}
    onDelete={(task) => alert("Borrar " + task.detail)}
    onChange={(task) => console.log("Nuevo estado de la tarea " + JSON.stringify(task))}
  />);
