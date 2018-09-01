import graphene

class Mutations(graphene.ObjectType):
  create_task = CreateTask.Field()
  delete_tasks = DeleteTasks.Field()
  update_task = UpdateTask.Field()
