import React from 'react';

import { Button } from 'antd';
import loremIpsum from 'lorem-ipsum';
import moment from 'moment';
import { graphql } from 'react-apollo';

import { QUERY_CREATE_RANDOM_TASK, QUERY_VISIBLE_TASKS, QUERY_ALL_TASKS } from "../Utils/Graphql";

export default (filter) => graphql(QUERY_CREATE_RANDOM_TASK, {
  props: ({ ownProps, mutate }) => ({
    addTask: ({ duration, detail, consumedTime, createdAt, finished }) => {
      mutate({
        variables: { duration, detail, consumedTime, createdAt, finished },
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
    <Button size="large"
    onClick={() =>{
      Array.from({length: 50}).forEach(() => {
        let createdAt = moment().subtract(Math.floor(Math.random() * (7 + 1)), "days").toISOString();
        let duration = Math.floor(Math.random() * (7200 - 10 + 1) + 10);
        let consumedTime = Math.floor(Math.random() * (duration - (duration * 0.8) + 1) + (duration * 0.8));

        props.addTask({detail: loremIpsum(), createdAt, duration, consumedTime, finished: (Math.random() >= 0.5)});
      });
    }}>
      Crear tareas aleatorios
    </Button>
  );
});
