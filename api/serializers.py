# api/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Estudiante, Curso, Carrera, Maestro, Calificacion, Materia

# --- Serializador para el Registro Personalizado ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# --- Serializadores para los Modelos Simples ---
class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = ('id', 'nombre', 'descripcion')

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = ('id', 'nombre', 'duracion_anios')

class MaestroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maestro
        fields = ('id', 'nombre', 'apellido', 'email', 'carrera')

# --- Serializadores para los Modelos con Relaciones ---
class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = ('id', 'estudiante', 'curso', 'puntuacion', 'fecha_registro')

class CursoSerializer(serializers.ModelSerializer):
    materia = MateriaSerializer(read_only=True)
    profesor = MaestroSerializer(read_only=True)
   
    materia_id = serializers.PrimaryKeyRelatedField(
        queryset=Materia.objects.all(), source='materia', write_only=True
    )
    profesor_id = serializers.PrimaryKeyRelatedField(
        queryset=Maestro.objects.all(), source='profesor', write_only=True, allow_null=True
    )

    class Meta:
        model = Curso
        fields = ('id', 'materia', 'profesor', 'semestre', 'materia_id', 'profesor_id')

class EstudianteSerializer(serializers.ModelSerializer):
    cursos = CursoSerializer(many=True, read_only=True)
    calificaciones = CalificacionSerializer(many=True, read_only=True)
    
    # AÑADE ESTE CAMPO
    cursos_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Curso.objects.all(), 
        source='cursos',
        write_only=True,
        required=False
    )

    class Meta:
        model = Estudiante
        fields = ('id', 'matricula', 'nombre', 'apellido', 'email', 'fecha_inscripcion', 'cursos', 'calificaciones', 'cursos_ids')

    # AÑADE ESTE MÉTODO
    def update(self, instance, validated_data):
        cursos_data = validated_data.pop('cursos', None)
        instance = super().update(instance, validated_data)
        if cursos_data is not None:
            instance.cursos.set(cursos_data)
        return instance