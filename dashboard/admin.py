from django.contrib import admin
from .models import Dustbin
from datetime import datetime
from django.utils.html import format_html

@admin.register(Dustbin)
class DustbinAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude', 'colored_fill', 'status', 'last_updated')
    list_filter = ('status',)
    search_fields = ('name',)

    @admin.display(description='Fill')
    def colored_fill(self, obj):
        color = 'red' if obj.fill_level >= 80 else ('orange' if 50 <= obj.fill_level < 80 else 'green')
        return format_html(
           '<span style="color: {};"><strong>{}%</strong></span>',
            color, obj.fill_level
        )