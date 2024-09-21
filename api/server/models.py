# models.py
from django.db import models

from django.contrib.auth.models import User 

class Crisis(models.Model):
    name = models.CharField(max_length=100, null=True, default="No Crisis") 
    location = models.CharField(max_length=255, null=True, default="Unknown Location") 
    status = models.CharField(max_length=100, null=True, default="No Status")

class Donation(models.Model):
    crisis = models.ForeignKey(Crisis, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    charge_id = models.CharField(max_length=100)
    def __str__(self):
        
        return f'Donation of {self.amount} by {self.username}'
class UserActivity(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField(null=True)
    phon_number = models.CharField(null=True, max_length=20)
    avprola_status = models.CharField(null=True, max_length=100) 
    crisis = models.CharField(null=True, max_length=100)   
    location = models.CharField(null=True, max_length=255)       
    task = models.CharField(null=True, max_length=255)
    expense = models.CharField(null=True, max_length=255)
    active_status = models.CharField(null=True, max_length=255)  
   