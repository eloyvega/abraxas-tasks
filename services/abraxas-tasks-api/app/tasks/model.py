from mongoengine import Document
from mongoengine.fields import StringField
from mongoengine.fields import LongField
from mongoengine.fields import DateTimeField
from mongoengine.fields import BooleanField

class Task(Document):
  meta = {'collection': 'task'}
  _id = StringField(primary_key=True)
  detail = StringField(unique=True, required=True)
  duration = LongField()
  consumed_time = LongField()
  created_at = DateTimeField()
  duration = LongField()
  finished = BooleanField()
