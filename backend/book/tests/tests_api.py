import random

from rest_framework.reverse import reverse

from book.models import Book
from book.tests.base import BaseBookTest


class BookAPITest(BaseBookTest):
    def verify_book(self, book: Book, book_dict: dict):
        self.assertEqual(book.title, book_dict['title'])
        self.assertEqual(book.author, book_dict['author'])
        self.assertEqual(book.year, book_dict['year'])
        self.assertEqual(book.finished, book_dict['finished'])

    def verify_book_with_id(self, book: Book, book_dict: dict):
        self.assertEqual(book.id, book_dict['id'])
        self.verify_book(book, book_dict)

    def test_create(self):
        for i in range(5):
            post_data = {
                'title': str(random.randint(1000, 9999)),
                'author': str(random.randint(10000, 99999)),
                'year': random.randint(1900, 2023),
                'finished': random.randint(0, 1)
            }

            url = reverse('book-list')
            response = self.client.post(url, post_data, content_type='application/json')
            self.assertEqual(response.status_code, 201)

            data = response.data
            created_book = Book.objects.get(id=data['id'])

            self.assertEqual(created_book.title, post_data['title'])
            self.assertEqual(created_book.author, post_data['author'])
            self.assertEqual(created_book.year, post_data['year'])
            self.assertEqual(created_book.finished, post_data['finished'])

    def test_list(self):
        url = reverse('book-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        book_qs = Book.objects.all()
        book_result = response.data

        self.assertEqual(len(book_qs), len(book_result))

        for i in range(len(book_qs)):
            book = book_qs[i]
            book_dict = book_result[i]
            self.verify_book(book, book_dict)

    def test_update(self):
        book_list = self.book_finished_list + self.book_unfinished_list
        for book in book_list:
            post_data = {
                'title': str(random.randint(1000, 9999)),
                'author': str(random.randint(10000, 99999)),
                'year': random.randint(1900, 2023),
                'finished': random.randint(0, 1)
            }
            url = reverse('book-detail', kwargs={'pk': book.id})
            response = self.client.put(url, post_data, content_type='application/json')
            self.assertEqual(response.status_code, 200)

            book_dict = response.data
            updated_book = Book.objects.get(id=book_dict['id'])

            self.verify_book(updated_book, book_dict)

    def _test_set_finished(self, book_list: list[Book], finished: bool):
        for book in book_list:
            post_data = {
                'finished': finished
            }
            url = reverse('book-detail', kwargs={'pk': book.id})
            response = self.client.patch(url, post_data, content_type='application/json')
            self.assertEqual(response.status_code, 200)

            book_dict = response.data
            updated_book = Book.objects.get(id=book.id)

            self.verify_book_with_id(updated_book, book_dict)

    def test_set_finished(self):
        self._test_set_finished(self.book_finished_list, True)
        self._test_set_finished(self.book_unfinished_list, False)

    def test_delete(self):
        book_list = self.book_finished_list + self.book_unfinished_list
        for book in book_list:
            url = reverse('book-detail', kwargs={'pk': book.id})
            response = self.client.delete(url)
            self.assertEqual(response.status_code, 204)

            deleted_book = Book.objects.filter(id=book.id).first()
            self.assertIsNone(deleted_book)

    def _test_list_finished(self, finished: bool):
        if finished:
            url = reverse('book-finished')
        else:
            url = reverse('book-unfinished')

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        book_list = Book.objects.filter(finished=finished)
        book_result = response.data

        self.assertNotEqual(len(book_list), 0)
        self.assertEqual(len(book_list), len(book_result))

        for i in range(len(book_list)):
            book = book_list[i]
            book_dict = book_result[i]
            self.verify_book_with_id(book, book_dict)

    def test_list_finished(self):
        self._test_list_finished(True)
        self._test_list_finished(False)

