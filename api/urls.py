# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# <-- Importa las vistas nuevas
from .views import (
    EstudianteViewSet, 
    CursoViewSet, 
    CarreraViewSet, 
    MaestroViewSet, 
    CalificacionViewSet,
    CustomRegistrationView,
    MateriaViewSet
)


router = DefaultRouter()
router.register(r'estudiantes', EstudianteViewSet)
router.register(r'cursos', CursoViewSet)
# --- AÑADE ESTO ---
router.register(r'carreras', CarreraViewSet)
router.register(r'maestros', MaestroViewSet)
router.register(r'calificaciones', CalificacionViewSet)
# --- AÑADE O VERIFICA ESTA LÍNEA ---
router.register(r'materias', MateriaViewSet)
    
urlpatterns = [
    path('', include(router.urls)),
    # --- AÑADE ESTA NUEVA RUTA ---
    path('register/', CustomRegistrationView.as_view(), name='custom-register'),
]