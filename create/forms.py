from django import forms
from .models import resumedata

class resumeform(forms.ModelForm):
    class Meta:
        model = resumedata
        fields =['fname','lname', 'email', 'phone', 'address', 'zipcode', 'city', 'nationality', 'place_of_birth', 'linkedIn_url', 'website', 'resumeobj', 'skills', 'jobdes', 'job_town', 'company_name', 'start_date', 'end_date', 'jobdescription', 'pd', 'pt', 'pinst', 'p_year', 'bd', 'bt', 'binst', 'b_year', 'ref_name', 'ref_des', 'ref_company', 'phone', 'email','profile_image','pdf','word_files']