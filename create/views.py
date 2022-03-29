from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import resumedata
from django.views import View
from docxtpl import DocxTemplate, InlineImage

import os
from docx2pdf import convert

nameofthefiledisplay1 = 'generated'


def nonefiledelete():
    filePath = 'static/resources/word_output/None.docx'
    filePath1 = 'static/resources/word_output/None.pdf'
    if os.path.exists(filePath) and os.path.exists(filePath1):
        os.remove(filePath)
        os.remove(filePath1)
    else:
        print("Can not delete the file as it doesn't exists")


def filerename(fname):
    global nameofthefiledisplay1
    nameofthefiledisplay1 = fname
    src = "static/resources/word_output/generated.docx"
    dest = f"static/resources/word_output/{fname}.docx"
    os.rename(src, dest)


def wordtopdfoutput(fname):
    src = f"static/resources/word_output/{fname}.docx"
    dest = f"static/resources/word_output/{fname}.pdf"
    # convert(src)
    convert(src, dest)
    # convert("my_docx_folder/")


def sampleform(request):
    if request.method == 'POST':
        global nameofthefiledisplay1
        nameofthefiledisplay1 = request.POST.get('fname')
        templatechoice = request.POST.get('template')
        first_name1 = request.POST.get('fname')
        last_name1 = request.POST.get('lname')
        profession1 = request.POST.get('profession')
        email1 = request.POST.get('email1')
        mob1 = request.POST.get('mob2')
        address1 = request.POST.get('add')
        zipcode1 = request.POST.get('zip')
        town1 = request.POST.get('town1')
        languages1 = request.POST.get('lan')
        nationality1 = request.POST.get('nat')
        place_of_birth1 = request.POST.get('pob')
        linked_in1 = request.POST.get('lin')
        website1 = request.POST.get('web')
        objective1 = request.POST.get('obj')
        skills1 = request.POST.get('skill')
        #   ----------------------------------------------------------------
        firstjobpost = request.POST.get('post')
        firstjobtown = request.POST.get('jobtown')
        firstcompanyname = request.POST.get('compname')
        firstjobstart = request.POST.get('startdate')
        firstjobend = request.POST.get('enddate')
        firstjobdiscription = request.POST.get('des')
        #   ----------------------------------------------------------------
        secondjobpost = request.POST.get('post1')
        secondjobtown = request.POST.get('jobtown1')
        secondjobcompanyname = request.POST.get('compname1')
        secondjobstart = request.POST.get('startdate1')
        secondjobend = request.POST.get('enddate1')
        secondjobdiscription = request.POST.get('des1')
        #    ------------------------------------------------------------------
        pdegree = request.POST.get('pd')
        ptown = request.POST.get('ptown')
        pinst = request.POST.get('pinst')
        pcompletion = request.POST.get('pcompletion')
        pfinalscore = request.POST.get('pscore')
        #    ------------------------------------------------------------------
        bdegree1 = request.POST.get('bd')
        btown = request.POST.get('btown')
        binst1 = request.POST.get('binst')
        bcompletion = request.POST.get('bcompletion')
        bfinalscore = request.POST.get('bscore')
        #    ------------------------------------------------------------------
        activity1 = request.POST.get('ades')
        activitytime1 = request.POST.get('adate1')
        activityplacement1 = request.POST.get('atown1')

        ref_name = request.POST.get('ref_name')
        ref_designation = request.POST.get('ref_designation')
        ref_company = request.POST.get('ref_company')
        ref_mobile = request.POST.get('ref_mobile')
        ref_email = request.POST.get('ref_email')
        hobbies = request.POST.get('hobbies')
        profile_pic = request.POST.get('ppic')
        print(templatechoice)
        person = resumedata(fname=first_name1, lname=last_name1,
                            email=email1, phone=mob1, profile_image=profile_pic)
        person.save()

        # old_name = f"static/resources/profileimages/{profile_pic}"
        # new_name = f"static/resources/profileimages/{profile_pic}"

        # # Renaming the file
        # os.rename(old_name, new_name)

        nonefiledelete()
        print(type(templatechoice), templatechoice)
        if templatechoice == 'template-1':
            doc = DocxTemplate("doc_templates/cv_template 1.docx")
            context = {'firstname': first_name1, 'lastname': last_name1, 'professiontitle': profession1, 'picture': profile_pic,
                       'EMAIL': email1, 'phoneno': mob1, 'linkedin': linked_in1, 'website': website1,
                       'address': address1, 'zipcode': zipcode1, 'town': town1, 'nation': nationality1,
                       'skills': skills1, 'languages': languages1,
                       'objective': objective1,
                       'firstcompany': firstcompanyname, 'firstown': firstjobtown, 'firstpost': firstjobpost, 'firststart': firstjobstart, 'firstend': firstjobend, 'firstdes': firstjobdiscription,
                       'secondcompany': secondjobcompanyname, 'secondtown': secondjobtown, 'secondpost': secondjobpost, 'secondstart': secondjobstart, 'secondend': secondjobend, 'seconddes': secondjobdiscription,
                       'bcollegename': binst1, 'bcollegetown': btown, 'bdegree': bdegree1, 'bdate': bcompletion, 'bscore': bfinalscore,
                       'pcollegename': pinst, 'pcollegetown': ptown, 'pdegree': pdegree, 'pdate': pcompletion, 'pscore': pfinalscore,
                       'refname': ref_name, 'refpost': ref_designation, 'refemail': ref_email,
                       'activityplace': activityplacement1, 'activitydate': activitytime1, 'activitydes': activity1,
                       'myimage': InlineImage(doc, f'static/resources/profileimages/pic.jpeg', width=(20)),
                       }
            doc.render(context)
            doc.save(f"static/resources/word_output/generated.docx")
        elif templatechoice == 'template-2' or templatechoice == 'template-3':
            if templatechoice == 'template-2':
                doc = DocxTemplate("doc_templates/cv_template 2.docx")
            elif templatechoice == 'template-3':
                doc = DocxTemplate("doc_templates/cv_template 3.docx")
            context = {'firstname': first_name1, 'lastname': last_name1, 'professiontitle': profession1,
                       'EMAIL': email1, 'phoneno': mob1, 'linkedin': linked_in1, 'website': website1,
                       'address': address1, 'zipcode': zipcode1, 'town': town1, 'nation': nationality1,
                       'skills': skills1, 'languages': languages1,
                       'objective': objective1,
                       'firstcompany': firstcompanyname, 'firstown': firstjobtown, 'firstpost': firstjobpost, 'firststart': firstjobstart, 'firstend': firstjobend, 'firstdes': firstjobdiscription,
                       'secondcompany': secondjobcompanyname, 'secondtown': secondjobtown, 'secondpost': secondjobpost, 'secondstart': secondjobstart, 'secondend': secondjobend, 'seconddes': secondjobdiscription,
                       'bcollegename': binst1, 'bcollegetown': btown, 'bdegree': bdegree1, 'bdate': bcompletion, 'bscore': bfinalscore,
                       'pcollegename': pinst, 'pcollegetown': ptown, 'pdegree': pdegree, 'pdate': pcompletion, 'pscore': pfinalscore,
                       'refname': ref_name, 'refpost': ref_designation, 'refemail': ref_email,
                       'activityplace': activityplacement1, 'activitydate': activitytime1, 'activitydes': activity1
                       }
            doc.render(context)
            doc.save(f"static/resources/word_output/generated.docx")

        # deleting if file None.docx exists
        nonefiledelete()
        # for renaming
        filerename(first_name1)
        # for converting into pdf and storing it
        wordtopdfoutput(first_name1)

        return redirect('/display2')
    else:
        return render(request, 'cv_form.html')


def download(request):
    return HttpResponse("Download your file")


def template1display1(request):
    return render(request, 'template1.html')


def template1display2(request):
    return render(request, 'Template2.html')

def template1display3(request):
    return render(request, 'Template3.html')
