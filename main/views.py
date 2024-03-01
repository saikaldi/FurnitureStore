from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    context = {
        "title": "Home",
        "content": "Welcome to home page"
    }
    return render(request, 'main/index.html', context)

def about(request):
    context = {
        "title": "Home - about us",
        "content": "About us",
        "text_on_page": "Information about our online shop. lorem ipsum dolor sit.lorem ipsum dolor sit."
                        "lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor sit.lorem ipsum dolor sit."
                        "lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor sit.lorem ipsum dolor sit."
                        "lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor sit.lorem ipsum dolor sit."
                        "lorem ipsum dolor.lorem ipsum dolor.lorem ipsum dolor."
    }
    return render(request, 'main/about.html', context)