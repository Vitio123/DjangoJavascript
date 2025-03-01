from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewset  # Asegúrate de importar bien tus vistas

router = DefaultRouter()
router.register("project", ProjectViewset, basename="project")
urlpatterns = router.urls


# urlpatterns = [
#     path("", include(router.urls)),  # Aquí incluimos las rutas del router
# ]
