from goods.models import Categories
from django import template


def tag_categories():
    return Categories.objects.fall()