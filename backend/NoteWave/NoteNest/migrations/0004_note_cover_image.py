# Generated by Django 4.2.6 on 2023-10-31 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NoteNest', '0003_alter_note_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='cover_image',
            field=models.ImageField(null=True, upload_to='images'),
        ),
    ]
