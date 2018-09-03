import React from 'react';

import { Query } from 'react-apollo';
import { QUERY_ALL_TASKS } from "../Utils/Graphql";
import moment from 'moment';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer}  from "recharts";

const TasksCompletenes = (props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={600} height={140} data={props.data} >
        <XAxis dataKey="date"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="Tareas terminadas" stroke="#83b6a4" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="Tareas pendientes" stroke="#ff6f69" activeDot={{r: 8}}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default () => {
  return(
    <Query
      query={QUERY_ALL_TASKS}
    >
      {({ loading, error, data }) => {
        let tasks = data.tasks || [];

        let completeTasksByDay = {}
        let incompleteTasksByDay = {}
        tasks.forEach((task) => {
          const date = moment(task.createdAt).format('dddd');
          if (task.finished) {
            completeTasksByDay[date] = completeTasksByDay[date] || 0;
            completeTasksByDay[date] += 1;
          } else {
            incompleteTasksByDay[date] = incompleteTasksByDay[date] || 0;
            incompleteTasksByDay[date] += 1;
          }
        });


        const weekdaysTranslate = {
          'Monday': "Lunes",
           'Tuesday': "Martes",
          'Wednesday': "Miércoles",
          'Thursday': "Jueves",
          'Friday': "Viernes",
          'Saturday': "Sábado",
          'Sunday': "Domingo",
        };
        const chartData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((key) => {
          return {"date": weekdaysTranslate[key], "Tareas terminadas": completeTasksByDay[key] || 0, "Tareas pendientes": incompleteTasksByDay[key] || 0};
        });

        return (
          <TasksCompletenes data={chartData} />
        );
      }
    }
    </Query>
  )
};
