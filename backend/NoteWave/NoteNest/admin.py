from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    list_display = ('cover_image','title', 'body', 'created', 'updated')
    list_filter = ('created', 'updated')
    search_fields = ('title', 'body')
    date_hierarchy = 'created'

admin.site.register(Note, NoteAdmin)
