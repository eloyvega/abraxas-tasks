import datetime
import hashlib
import graphene

from tasks.model import Task as TaskModel
from tasks.schema.task import Task

class CreateTask(graphene.Mutation):
  class Arguments:
    detail = graphene.String(required=True)
    duration = graphene.Int()
    finished = graphene.Boolean(default_value=False)
    consumed_time = graphene.Int(default_value=0)
  
  task = graphene.Field(Task)

  def mutate(self, info, **kwargs):
    _id = hashlib.sha224(kwargs['detail'].encode()).hexdigest()
    created_at = datetime.datetime.now()

    TaskModel(**kwargs, _id=_id, created_at=created_at).save()

    task = Task(**kwargs, _id=_id, created_at=created_at)
    return CreateTask(task=task)
