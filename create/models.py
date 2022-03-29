from django.db import models
class resumedata(models.Model):
    fname = models.CharField(max_length=100,default="name")
    lname = models.CharField(max_length=100,default="lname")
    email = models.EmailField(max_length=100,default="abc@gmail.com")
    phone = models.CharField(max_length=100,default="123456789")
    
    profile_image = models.ImageField(upload_to='static/resources/profileimages',blank=True,null=True)
    pdf= models.FileField(upload_to='resources/pdf_files', blank=True,null=True)
    word_files=models.FileField(upload_to='resources/word_files',blank=True,null=True)

# Create your models here.
