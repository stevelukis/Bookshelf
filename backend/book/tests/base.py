from django.test import TestCase

from book.tests import helper


class BaseBookTest(TestCase):
    def setUp(self) -> None:
        self.client = self.client_class()
        self.book_finished_list = helper.generate_random_books(10, True)
        self.book_unfinished_list = helper.generate_random_books(10, False)
