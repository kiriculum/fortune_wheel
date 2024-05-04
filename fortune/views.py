import json
import random

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from fortune.models import UserResult


# Create your views here.

@login_required
def home(request: HttpRequest):
    return render(request, 'fortune/home.html', context={'Title': 'Wheel of fortune'})


@csrf_exempt
@login_required
def spin(request: HttpRequest):
    user = request.user
    data = request.POST

    start_angle = int(data['start_angle'])
    rotate = random.randint(1 * 360, 2 * 360)

    res = (start_angle + rotate) % 360
    if res < 90:
        color = 'blue'
    elif res < 180:
        color = 'green'
    elif res < 270:
        color = 'red'
    elif res < 300:
        color = 'black'
    else:
        color = 'white'

    UserResult.objects.create(user=user, result=res)

    return HttpResponse(json.dumps({'rotate': rotate, 'result': color}), status=200)
