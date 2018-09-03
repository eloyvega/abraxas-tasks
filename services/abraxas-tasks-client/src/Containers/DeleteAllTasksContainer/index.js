import React from 'react';

import { Button  } from 'antd';
import { graphql } from 'react-apollo';

import { QUERY_VISIBLE_TASKS, QUERY_DELETE_ALL_TASKS, QUERY_ALL_TASKS } from "../Utils/Graphql";

export default (filter, callback) => graphql(QUERY_DELETE_ALL_TASKS, {
  props: ({ ownProps, mutate }) => ({
    deleteTasks: () => {
      mutate({
        refetchQueries: [{
            query: QUERY_VISIBLE_TASKS,
            variables: filter
          },{
            query: QUERY_ALL_TASKS
          }
        ]
      })
    }
  })
})((props) => {
  return (
    <Button size="large"
    onClick={() => {
        props.deleteTasks();
        callback();
     }
    }>
      Borrar las tareas
    </Button>
  );
});
