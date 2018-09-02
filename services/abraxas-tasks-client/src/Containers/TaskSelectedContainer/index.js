import { graphql } from 'react-apollo';

import TaskSelected from '../../Presentational/TaskSelected';
import {QUERY_DELETE_TASK, QUERY_UPDATE_TASK, QUERY_VISIBLE_TASKS} from "../Utils/Graphql";

const DeleteTasksMutation = (filter) => graphql(QUERY_DELETE_TASK, {
  props: ({ ownProps, mutate }) => ({
    onDelete: ({ duration, detail }) => {
      mutate({
        variables: { duration, detail },
        refetchQueries: [{
          query: QUERY_VISIBLE_TASKS,
          variables: filter
        }]
      })
    }
  })
})(TaskSelected);

export default (filter) => graphql(QUERY_UPDATE_TASK, {
  props: ({ ownProps, mutate }) => ({
    onChange: (task) => {
      mutate({
        variables: { ...task },
        refetchQueries: [{
          query: QUERY_VISIBLE_TASKS,
          variables: filter
        }]
      })
    }
  })
})(DeleteTasksMutation());
