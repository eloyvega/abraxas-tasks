import graphene

from tasks.model import Task as TaskModel

from tasks.schema.task import Task
from tasks.schema.mutations.create_task import CreateTask
from tasks.schema.mutations.create_tasks import CreateTasks
from tasks.schema.mutations.delete_tasks import DeleteTasks
from tasks.schema.mutations.update_task import UpdateTask

class Mutations(graphene.ObjectType):
  create_tasks = CreateTasks.Field()
  create_task = CreateTask.Field()
  delete_tasks = DeleteTasks.Field()
  update_task = UpdateTask.Field()

class Query(graphene.ObjectType):
  tasks = graphene.List(Task, args={
    'duration__gte': graphene.Int(), 
    'duration__lte': graphene.Int(), 
    'created_at__gte': graphene.DateTime(), 
    'created_at__lte': graphene.DateTime(), 
    'detail': graphene.String(),
    'finished': graphene.Boolean()
    }
  )

  def resolve_tasks(self, info, **kwargs):
    detail = None
    if 'detail' in kwargs.keys():
      detail = kwargs['detail']
      del kwargs['detail']

    return [task for task in TaskModel.objects(**kwargs) if not detail or detail in task.detail]

schema = graphene.Schema(query=Query, mutation=Mutations)
