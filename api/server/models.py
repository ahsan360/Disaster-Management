from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)


    class Meta:
        db_table = 'users' 