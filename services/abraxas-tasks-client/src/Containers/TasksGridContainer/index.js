import React from 'react';
import { Query } from "react-apollo";

import TasksGrid from "../../Presentational/TasksGrid";
import {QUERY_VISIBLE_TASKS} from "../Utils/Graphql";

export default ({duration_Gte, duration_Lte, detail, finished, onClick}) => {
  return(
    <Query
      query={QUERY_VISIBLE_TASKS}
      variables={{duration_Gte, duration_Lte, detail, finished}}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        return (
          <TasksGrid tasks={data.tasks} onClick={(task) => onClick(task)} />
        );
      }}
    </Query>
  )
};
