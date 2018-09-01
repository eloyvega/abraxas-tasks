import graphene

class Task(graphene.ObjectType):
  _id = graphene.String(name='id')
  detail = graphene.String()
  duration = graphene.Int()
  consumed_time = graphene.Int(default_value=0)
  created_at = graphene.types.datetime.DateTime()
  finished = graphene.types.Boolean()
