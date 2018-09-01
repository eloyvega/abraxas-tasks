import { graphql } from 'react-apollo'

import CreateTask from '../../Presentational/CreateTask';
import {QUERY_CREATE_TASK} from "../Utils/Graphql";
import {QUERY_VISIBLE_TASKS} from "../Utils/Graphql";

export default (filter) => graphql(QUERY_CREATE_TASK, {
  props: ({ ownProps, mutate }) => ({
    addTask: ({ duration, detail }) =>
      mutate({
        variables: { duration, detail },
        refetchQueries: [{
          query: QUERY_VISIBLE_TASKS,
          variables: filter
        }]
      })
  })
})(CreateTask);
