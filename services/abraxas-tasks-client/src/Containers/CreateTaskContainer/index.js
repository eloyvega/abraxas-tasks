import { graphql } from 'react-apollo'

import CreateTask from '../../Presentational/CreateTask';
import {QUERY_CREATE_TASK, QUERY_ALL_TASKS, QUERY_VISIBLE_TASKS} from "../Utils/Graphql";

export default (filter, onCreateCallback) => graphql(QUERY_CREATE_TASK, {
  props: ({ ownProps, mutate }) => ({
    addTask: ({ duration, detail }) => {
      mutate({
        variables: { duration, detail },
        refetchQueries: [{
            query: QUERY_VISIBLE_TASKS,
            variables: filter
          }, {
            query: QUERY_ALL_TASKS
          }
        ]
      });
      onCreateCallback();
    }
  })
})(CreateTask);
