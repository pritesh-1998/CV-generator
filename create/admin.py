from django.contrib import admin

from .models import resumedata
@admin.register(resumedata)
class ResumeModelAdmin(admin.ModelAdmin):
    list_display=['fname','lname', 'email', 'phone','pdf','word_files']
