from django.db.models import QuerySet

from book.models import Book
from book.tests.base import BaseBookTest


class BookModelTest(BaseBookTest):

    def test_finished_query(self):
        result_qs: QuerySet[Book] = Book.objects.all().finished()
        book_finished_list = self.book_finished_list

        # Make sure the length of both are the same
        self.assertEqual(len(result_qs), len(book_finished_list))

        for i in range(len(book_finished_list)):
            self.assertEqual(result_qs[i], book_finished_list[i])

    def test_unfinished_query(self):
        result_qs: QuerySet[Book] = Book.objects.all().unfinished()
        book_unfinished_list = self.book_unfinished_list

        # Make sure the length of both are the same
        self.assertEqual(len(result_qs), len(book_unfinished_list))

        for i in range(len(book_unfinished_list)):
            self.assertEqual(result_qs[i], book_unfinished_list[i])
