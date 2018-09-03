import ApolloClient, { createNetworkInterface } from 'apollo-client';

import gql from "graphql-tag";

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHQL_URI
})

export const client = new ApolloClient({
  networkInterface
})

export const QUERY_VISIBLE_TASKS = gql`
  query VisibleTasks($duration_Gte: Int, $duration_Lte: Int, $detail: String, $finished: Boolean) {
    tasks(duration_Gte: $duration_Gte, duration_Lte: $duration_Lte, detail: $detail, finished: $finished) {
      id
      duration
      detail
      finished
      consumedTime
    }
  }
`;

export const QUERY_ALL_TASKS = gql`
  query {
    tasks {
      id
      duration
      detail
      finished
      consumedTime
      createdAt
    }
  }
`;

export const QUERY_DELETE_TASK = gql`
  mutation DeleteTask($detail: String!) {
    deleteTasks(detail: $detail) {
      tasks {
        duration
        detail
        createdAt
        finished
      }
    }
  }
`;

export const QUERY_DELETE_ALL_TASKS = gql`
  mutation DeleteTask {
    deleteTasks {
      tasks {
        duration
        detail
        createdAt
        finished
      }
    }
  }
`;

export const QUERY_UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $detail: String, $duration: Int, $finished: Boolean, $consumedTime: Int) {
    updateTask(detail: $detail, id: $id, duration: $duration, finished: $finished, consumedTime: $consumedTime) {
      task {
        duration
        detail
      }
    }
  }
`;

export const QUERY_CREATE_TASK = gql`
  mutation CreateTask($detail: String!, $duration: Int) {
    createTask(detail: $detail, duration: $duration) {
      task {
        id
        duration
        detail
        finished
      }
    }
  }
`;

export const QUERY_CREATE_RANDOM_TASK = gql`
  mutation CreateTasks($tasks: [TaskInput]) {
    createTasks (tasks: $tasks) {
      tasks {
        detail
      }
    }
  }
`;
