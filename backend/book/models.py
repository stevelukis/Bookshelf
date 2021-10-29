from django.db import models


class BookQs(models.QuerySet):
    def finished(self):
        return self.filter(finished=True)

    def unfinished(self):
        return self.filter(finished=False)


class BookManager(models.Manager):
    def get_queryset(self):
        return BookQs(self.model, using=self._db)


class Book(models.Model):
    title = models.CharField(max_length=140)
    author = models.CharField(max_length=140)
    year = models.IntegerField()
    finished = models.BooleanField()

    objects = BookManager()
