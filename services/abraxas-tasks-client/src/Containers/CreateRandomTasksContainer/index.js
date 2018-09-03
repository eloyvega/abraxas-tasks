import React from 'react';

import { Button } from 'antd';
import loremIpsum from 'lorem-ipsum';
import moment from 'moment';
import { graphql } from 'react-apollo';

import { QUERY_CREATE_RANDOM_TASK, QUERY_VISIBLE_TASKS, QUERY_ALL_TASKS } from "../Utils/Graphql";

export default (filter) => graphql(QUERY_CREATE_RANDOM_TASK, {
  props: ({ ownProps, mutate }) => ({
    addTasks: (tasks) => {
      mutate({
        variables: {tasks},
        refetchQueries: [{
            query: QUERY_VISIBLE_TASKS,
            variables: filter
          },{
            query: QUERY_ALL_TASKS,
          }
        ]
      });
    }
  })
})((props) => {
  return (
    <Button
    onClick={() =>{
      const tasks = Array.from({length: 50}).map(() => {
        let createdAt = moment().subtract(Math.floor(Math.random() * (7 + 1)), "days").toISOString();
        let duration = Math.floor(Math.random() * (7200 - 10 + 1) + 10);
        let consumedTime = Math.floor(Math.random() * (duration - (duration * 0.8) + 1) + (duration * 0.8));
        return {detail: loremIpsum(), createdAt, duration, consumedTime, finished: (Math.random() >= 0.5)};
      });
      props.addTasks(tasks);
    }}>
      Tareas aleatorias
    </Button>
  );
});
