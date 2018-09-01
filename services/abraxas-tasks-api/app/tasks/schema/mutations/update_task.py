import graphene

from tasks.model import Task as TaskModel
from tasks.schema.task import Task

class UpdateTask(graphene.Mutation):
  class Arguments:
    id = graphene.String(required=True)
    detail = graphene.String()
    duration = graphene.Int()
    finished = graphene.Boolean()
    consumed_time = graphene.Int()
  
  task = graphene.Field(Task)

  def mutate(self, info, **kwargs):
    kwargs['_id'] = kwargs['id']
    del kwargs['id']
    
    update_query = {'set__' + key: value for key, value in kwargs.items()}
    task = TaskModel.objects.get(_id=kwargs['_id'])
    task.update(**update_query)
    
    task = Task(_id=task._id, detail=task.detail, duration=task.duration)
    return UpdateTask(task=task)
