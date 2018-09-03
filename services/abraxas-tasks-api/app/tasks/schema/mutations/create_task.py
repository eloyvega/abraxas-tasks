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
    created_at = graphene.DateTime(default_value=datetime.datetime.now())
  
  task = graphene.Field(Task)

  def mutate(self, info, **kwargs):
    _id = hashlib.sha224(kwargs['detail'].encode()).hexdigest()

    TaskModel(**kwargs, _id=_id).save()

    task = Task(**kwargs, _id=_id)
    return CreateTask(task=task)
