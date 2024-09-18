from django.http import JsonResponse
from .models import User

def dashboard(request):
    # Fetching all users and selecting specific fields (id, email, fname, lname)
    users = User.objects.all().values('id', 'email', 'fname', 'lname')

    # Return the users as a JSON response
    return JsonResponse(list(users), safe=False)
