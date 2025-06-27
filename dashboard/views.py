from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import UserProfile, Dustbin
import json

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        user_type = request.POST.get('user_type')  # 'admin', 'driver', or 'citizen'

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        UserProfile.objects.create(user=user, user_type=user_type)

        return redirect('login')  # Ensure 'login' is defined in urls.py
    return render(request, 'dashboard/auth/register.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            try:
                user_type = user.userprofile.user_type
                if user_type == 'admin':
                    return redirect('admin_dashboard')
                elif user_type == 'driver':
                    return redirect('driver_dashboard')
                else:
                    return redirect('citizen_dashboard')
            except UserProfile.DoesNotExist:
                user_type = 'citizen'
                UserProfile.objects.create(user=user, user_type='citizen')
        else:
            return render(request, 'dashboard/auth/login.html', {'error': 'Invalid credentials'})
    return render(request, 'dashboard/auth/login.html')


@login_required
def admin_dashboard(request):
    try:
        if request.user.userprofile.user_type != 'admin':
            raise PermissionDenied
    except UserProfile.DoesNotExist:
        raise PermissionDenied
    return render(request, 'dashboard/admin/dashboard.html')


@login_required
def citizen_dashboard(request):
    try:
        return render(request, 'dashboard/Citizen/dashboard.html')
    except Exception as e:
        from django.http import HttpResponse
        return HttpResponse(f"Template Error: {e}")


def dustbin_data(request):
    dustbins = Dustbin.objects.all()
    data = []
    for d in dustbins:
        data.append({
            'name': d.name,  # Fixed from d.location_name
            'lat': d.latitude,
            'lng': d.longitude,
            'fill': d.fill_level,
        })
    return JsonResponse(data, safe=False)


def home(request):
    return render(request, 'dashboard/index.html')

def reward_view(request):
    return render(request, 'dashboard/Citizen/reward.html')

def report_page(request):
    return render(request, 'dashboard/Citizen/report.html')

def recycling_view(request):
    return render(request, 'dashboard/Citizen/recycling.html')


@csrf_exempt
def get_dustbins(request):
    dustbins = Dustbin.objects.all()
    data = [
        {
            "id": dustbin.id,
            "name": dustbin.name,
            "lat": dustbin.latitude,
            "lng": dustbin.longitude,
            "fill": dustbin.fill_level,
            "status": dustbin.status,
            "last_updated": dustbin.last_updated.strftime("%Y-%m-%d %H:%M:%S")
        }
        for dustbin in dustbins
    ]
    return JsonResponse(data, safe=False)

def report_dustbin(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            fill = data.get('fill')  # fill in percent (0-100)

            dustbin = Dustbin.objects.get(id=4)  # Main Campus Dustbin's ID
            dustbin.fill_level = fill
            if fill >= 80:
                dustbin.status = 'overflowing'
            elif fill < 20:
                dustbin.status = 'good'
            else:
                dustbin.status = 'damaged'
            dustbin.save()

            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid method'},status=405)

def about_view(request):
    return render(request, 'dashboard/other/about.html')

def contact_view(request):
    return render(request, 'dashboard/other/contact.html')

def privacy_view(request):
    return render(request, 'dashboard/other/privacy-policy.html')

def update_dustbin_fill_level(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            dustbin_id = data.get('id')
            fill = data.get('fill')

            dustbin = Dustbin.objects.get(id=dustbin_id)
            dustbin.fill_level = fill
            dustbin.save()

            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)},
                                status=400)
    return JsonResponse({"status": "error", "message": "Invalid"}, 
              status=405)