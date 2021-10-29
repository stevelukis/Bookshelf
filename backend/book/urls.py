from rest_framework import routers

from book import views

router = routers.DefaultRouter()
router.register('', views.BookViewSet, basename='book')
urlpatterns = router.urls
print(urlpatterns)