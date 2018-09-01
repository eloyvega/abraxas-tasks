import graphene

from tasks.model import Task as TaskModel
from tasks.schema.task import Task

class DeleteTasks(graphene.Mutation):
  class Arguments:
    detail = graphene.String()
    duration = graphene.Int()
  
  tasks = graphene.Field(graphene.List(Task))

  def mutate(self, info, **kwargs):
    tasks = TaskModel.objects(**kwargs)
    deleted_tasks = [Task(detail=task.detail, duration=task.duration) for task in tasks]
    tasks.delete()
    return DeleteTasks(tasks=deleted_tasks)
