from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewset
from .views import ProjectManagerViewset  # Asegúrate de importar bien tus vistas

router = DefaultRouter()
router.register("project", ProjectViewset, basename="project")
router.register("projectmanager", ProjectManagerViewset, basename="projectmanager")
urlpatterns = router.urls


# urlpatterns = [
#     path("", include(router.urls)),  # Aquí incluimos las rutas del router
# ]
