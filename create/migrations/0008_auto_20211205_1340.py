# Generated by Django 3.2.9 on 2021-12-05 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('create', '0007_auto_20211204_2347'),
    ]

    operations = [
        migrations.AddField(
            model_name='resumedata',
            name='activity',
            field=models.CharField(blank=True, default='activity', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='resumedata',
            name='activitydate',
            field=models.CharField(blank=True, default='date', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='resumedata',
            name='activityplace',
            field=models.CharField(blank=True, default='place', max_length=100, null=True),
        ),
    ]
