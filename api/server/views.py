from django.http import JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from .forms import RegisterForm
import json
from django.contrib.auth.models import User
from .models import Donation,UserActivity,Crisis
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum
from rest_framework.decorators import api_view, permission_classes
@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.create_user(
                username=data['username'],
                email=data.get('email', ''),
                password=data['password1']
            )
            user_activity = UserActivity.objects.create(
                user=user,
                age=data.get('age'),
                phon_number=data.get('phon_number'),
                avprola_status=data.get('avprola_status'),
                crisis=data.get('crisis'),
                location=data.get('location'),
                task=data.get('task'),
                active_status=data.get('active_status'),
            )
            return JsonResponse({"success": True})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debug print
            form = AuthenticationForm(request, data=data)

            if form.is_valid():
                user = form.get_user()
                login(request, user)
                return JsonResponse({"success": True, "username": user.username})
            else:
                print("Form errors:", form.errors)  # Debug print for errors
                return JsonResponse({"error": form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def logout_view(request):
    logout(request)
    return JsonResponse({"success": True})

def check_auth_view(request):
    if request.user.is_authenticated:
        return JsonResponse({"authenticated": True, "username": request.user.username})
    else:
        return JsonResponse({"authenticated": False})
@csrf_exempt
def donate_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        crisis = Crisis(id=data.get('crisis_id'))
        # Create a donation directly from the unpacked data
        donation = Donation.objects.create(
            crisis=crisis,
            username=data.get('username'),
            phone_number=data.get('phone_number'),
            amount=data.get('amount'),
        )
        
        return JsonResponse({"success": True, "donation_id": donation.id})

    return JsonResponse({"error": "Invalid request method"}, status=400)
@csrf_exempt
def crisis_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        crisis = Crisis.objects.create(
           name = data.get('name'),
           location = data.get('location'),
           status = data.get('status'),
        )
        return JsonResponse({"success": True, "donation_id": crisis.id})

    return JsonResponse({"error": "Invalid request method"}, status=400)

def get_crisis_view(request):
    if request.method == 'GET':
        crises = Crisis.objects.all().order_by('-id').values()
        data = list(crises)  
        return JsonResponse(data, safe=False) 

    return JsonResponse({"error": "Invalid request method"}, status=400)

from django.http import JsonResponse
from .models import User, UserActivity

def get_volunteer_view(request):
    if request.method == 'GET':
        volunteered = UserActivity.objects.select_related('user').order_by('-id')
        data = []
        for activity in volunteered:
            data.append({
                'id': activity.id,
                'user_id': activity.user.id,
                'username': activity.user.username,
                'email': activity.user.email,
                'age': activity.age,
                'phon_number': activity.phon_number,
                'avprola_status': activity.avprola_status,
                'crisis': activity.crisis,
                'location': activity.location,
                'task': activity.task,
                'expense': activity.expense,
                'active_status': activity.active_status
            })
        
        # Return the JSON response
        return JsonResponse(data, safe=False)
    
    return JsonResponse({"error": "Invalid request method"}, status=400)

# @csrf_exempt
# def ahsan_view(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         donation = Ahsan.objects.create(
#             username=data.get('username'),
#         )
#         return JsonResponse({"success": True, "donation_id": donation.id})

#     return JsonResponse({"error": "Invalid request method"}, status=400)
@api_view(['GET'])
def get_auth_user_view(request):
    if request.user.is_authenticated:
        user = request.user
        return JsonResponse({
            'username': user.username,
            'email': user.email,
            'admin':user.is_superuser
        })
    return JsonResponse({'error': 'User not authenticated'}, status=401)
def signout_view (request):
    logout(request)
    return JsonResponse({"success": True})
@csrf_exempt
def update_task_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_activity = UserActivity.objects.get(id=data.get('user_id'))
        user_activity.task = data.get('task')
        user_activity.location = data.get('location')
        user_activity.expense = data.get('expense')
        user_activity.save()
        return JsonResponse({"success": True})

    return JsonResponse({"error": "Invalid request method"}, status=400)
def get_chart_data_view(request):
    if request.method == 'GET':
         total_expense = UserActivity.objects.aggregate(Sum('expense'))['expense__sum'] or 0
         total_donation = Donation.objects.aggregate(Sum('amount'))['amount__sum'] or 0
         return JsonResponse({
            'total_expense': total_expense,
            'total_donation': total_donation
        })
    return JsonResponse({"error": "Invalid request method"}, status=400)