# api/views.py

# --- 1. SECCIÓN DE IMPORTS (Todo organizado aquí) ---
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# Importamos todos nuestros modelos
from .models import Estudiante, Curso, Carrera, Maestro, Calificacion, Materia

# Importamos todos nuestros serializadores
from .serializers import (
    UserSerializer,
    EstudianteSerializer, 
    CursoSerializer, 
    CarreraSerializer, 
    MaestroSerializer, 
    CalificacionSerializer,
    MateriaSerializer
)

# Importamos nuestra clase de permisos desde su propio archivo
from .permissions import ReadOnlyOrIsAdmin


# --- 2. SECCIÓN DE VIEWSETS (Un ViewSet para cada modelo) ---

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [ReadOnlyOrIsAdmin]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [ReadOnlyOrIsAdmin]

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [ReadOnlyOrIsAdmin]

class MaestroViewSet(viewsets.ModelViewSet):
    queryset = Maestro.objects.all()
    serializer_class = MaestroSerializer
    permission_classes = [ReadOnlyOrIsAdmin]

class CalificacionViewSet(viewsets.ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer
    permission_classes = [ReadOnlyOrIsAdmin]

class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer
    permission_classes = [ReadOnlyOrIsAdmin]


# --- 3. SECCIÓN DE VISTAS PERSONALIZADAS (Como nuestro registro) ---

class CustomRegistrationView(APIView):
    permission_classes = [AllowAny] # Permite que cualquiera pueda acceder a esta vista

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if not email or not password or not password2:
            return Response({'error': 'Email y contraseñas son requeridos'}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != password2:
            return Response({'error': 'Las contraseñas no coinciden'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'El email ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, email=email, password=password)
        
        return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)