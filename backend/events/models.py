from django.db import models

# Create your models here.
class InstagramPost(models.Model):
    post_id = models.CharField(max_length=255, unique=True,verbose_name="IG Post ID")
    
    #instagram api fields
    caption_raw = models.TextField()
    permalink = models.URLField()
    timestamp = models.DateTimeField()
    
    #derived data
    event_title = models.CharField(max_length=255, blank=True)
    event_date = models.DateTimeField(null=True, blank=True) #TODO support multi day events
    location = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    
    is_approved = models.BooleanField(default=True)

    def __str__(self):
        return f"Instagram Post {self.post_id}"
