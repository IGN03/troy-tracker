from django.contrib import admin
from .models import InstagramPost

@admin.register(InstagramPost)
class InstagramPostAdmin(admin.ModelAdmin):
    list_display = ('post_id', 'event_title', 'event_date', 'location',"is_approved")
    search_fields = ('post_id', 'event_title', 'location')

    list_editable = ('is_approved',)
    
    fieldsets = (
        (None, {
            'fields': ('post_id', 'caption_raw', 'permalink', 'timestamp')
        }),
        ('Derived Data', {
            'fields': ('event_title', 'event_date', 'location', 'description')
        }),
    )


# Register your models here.
