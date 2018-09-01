import React from 'react';

import { storiesOf } from '@storybook/react';

import TasksGrid from '../Components/TasksGrid'

storiesOf('Lista de tareas', module)
  .add('con duraciones y estados aleatorios', () => <TasksGrid tasks={[
      {detail: "Tarea corta", duration: 1800},
      {detail: "Tarea media", duration: 3600},
      {detail: "Tarea larga", duration: 7200},
      {detail: "Tarea ejemplo", duration: 1724},
      {detail: "Ejemplo de una tarea con un descripcion muy larga", duration: 7080},
    ]} />);
