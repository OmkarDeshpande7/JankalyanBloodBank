# Generated by Django 2.1.5 on 2019-02-11 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20190209_1847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='address',
            field=models.CharField(max_length=80),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='education',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='profession',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(default='', max_length=20),
        ),
    ]