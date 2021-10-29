from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from book.models import Book
from book.serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def filter_book(self, finished):
        book_list = Book.objects.filter(finished=finished)
        serializer = self.get_serializer(book_list, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def finished(self, request):
        return self.filter_book(finished=True)

    @action(detail=False)
    def unfinished(self, request):
        return self.filter_book(finished=False)
