from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.template import RequestContext
from django.http.response import HttpResponse
from django.http import StreamingHttpResponse
from wsgiref.util import FileWrapper
import mimetypes
import os
import create.views as globalviews

nameofthefile = "admin"

# Create your views here.


def home1(request):
    return render(request, 'index.html')


def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        phoneno = request.POST.get('phoneno')
        password = request.POST.get('password')
        myuser = User.objects.create_user(username, email, password)
        myuser.phoneno = phoneno
        myuser.save()
        messages.success(request, "Your account has been created")
        return redirect('/login')
    return render(request, 'signup.html')


def login_user(request):
    if request.method == 'POST':
        username1 = request.POST['username']
        password1 = request.POST['password']
        user = authenticate(username=username1, password=password1)
        if user is not None:
            global nameofthefile
            nameofthefile = username1
            login(request, user)
            # print(username)
            return redirect('/display')
        else:
            messages.error(request, "bad creditionals")
            return render(request, 'badCred.html')

    return render(request, 'login.html')


def acc_create(request):
    return render(request, 'thankyou.html')
    time.sleep(1000)
    return redirect('/create')


def logout(request):
    return render(request, 'logout.html')


def contactpage(request):
    return render(request, 'contactus.html')


def display(request):
    return render(request, 'index2.html')
    return response


def display2(request):
    return render(request, 'index.html')
    return response


def download_file(request):
    global nameofthefile
    srcc = f"static/resources/word_output/{nameofthefile}.docx"
    filepath = os.path.abspath(srcc)
    print('SLA FILE: ', filepath)
    if os.path.exists(filepath):
        with open(filepath, 'rb') as worddoc:  # read as binary
            content = worddoc.read()  # Read the file
            response = HttpResponse(
                content,
                content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
            response['Content-Disposition'] = 'attachment; filename=download_filename.docx'
            # calculate length of content
            response['Content-Length'] = len(content)
        return response
    else:
        return HttpResponse("Failed to Download SLA")


def download_pdf(request):
    global nameofthefile
    srcc = f"static/resources/word_output/{nameofthefile}.pdf"
    filepath = os.path.abspath(srcc)
    filename = f'{nameofthefile}.pdf'
    print('SLA FILE: ', filepath)
    if filename != srcc:
        # Define Django project base directory
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # Define the full file path
        filepath = BASE_DIR + '\\static\\resources\\word_output\\' + filename
        # Open the file for reading content
        path = open(filepath, 'rb')
        # Set the mime type
        mime_type, _ = mimetypes.guess_type(filepath)
        # Set the return value of the HttpResponse
        response = HttpResponse(path, content_type=mime_type)
        # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        # Return the response value
        return response
    else:
        return HttpResponse("Failed to Download SLA")


def download_file1(request):
    src = globalviews.nameofthefiledisplay1
    srcfile = f"static/resources/word_output/{src}.docx"
    filepath = os.path.abspath(srcfile)
    print('SLA FILE: ', filepath)
    if os.path.exists(filepath):
        with open(filepath, 'rb') as worddoc:  # read as binary
            content = worddoc.read()  # Read the file
            response = HttpResponse(
                content,
                content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
            response['Content-Disposition'] = 'attachment; filename=download_filename.docx'
            # calculate length of content
            response['Content-Length'] = len(content)
        return response
    else:
        return HttpResponse("Failed to Download SLA")


def download_pdf2(request):
    src = globalviews.nameofthefiledisplay1
    srcfile = f"static/resources/word_output/{src}."
    filename = f'{src}.pdf'
    filepath = os.path.abspath(srcfile)
    print('SLA FILE: ', filepath)
    if filename != srcfile:
        # Define Django project base directory
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # Define the full file path
        filepath = BASE_DIR + '\\static\\resources\\word_output\\' + filename
        # Open the file for reading content
        path = open(filepath, 'rb')
        # Set the mime type
        mime_type, _ = mimetypes.guess_type(filepath)
        # Set the return value of the HttpResponse
        response = HttpResponse(path, content_type=mime_type)
        # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        # Return the response value
        return response
    else:
        return HttpResponse("Failed to Download SLA")



