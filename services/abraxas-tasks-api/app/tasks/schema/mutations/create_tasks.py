import datetime
import hashlib
import graphene

from tasks.model import Task as TaskModel
from tasks.schema.task import Task

class TaskInput(graphene.InputObjectType):
  detail = graphene.String()
  duration = graphene.Int()
  consumed_time = graphene.Int(default_value=0)
  created_at = graphene.types.datetime.DateTime()
  finished = graphene.types.Boolean()

class CreateTasks(graphene.Mutation):
  class Arguments:
    tasks = graphene.List(TaskInput)
  
  tasks = graphene.Field(Task)

  def mutate(self, info, **kwargs):
    tasks = kwargs['tasks']
    for task in tasks:
      task['_id'] = hashlib.sha224(task['detail'].encode()).hexdigest()

    TaskModel.objects.insert([TaskModel(**task) for task in tasks])

    tasks = [Task(task) for task in tasks]
    return CreateTasks(tasks=tasks)
