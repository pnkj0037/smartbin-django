from django import template
register = template.Library()

@register.filter
def length_is(value, arg):
    """Replacement for missing length_is filter"""
    return len(value) == arg