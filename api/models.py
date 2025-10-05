from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Estudiante(models.Model):
    matricula = models.CharField(max_length=20, unique=True, blank=True, null=True) # Hacemos opcional por ahora
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    fecha_inscripcion = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
class Materia(models.Model):
    nombre = models.CharField(max_length=150, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Curso(models.Model):
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name='cursos', null=True, blank=True)
    semestre = models.CharField(max_length=10, default='N/A', blank=True) # Ej: "2025-1"
    profesor = models.ForeignKey('Maestro', on_delete=models.SET_NULL, null=True, blank=True, related_name='cursos_impartidos')
    estudiantes = models.ManyToManyField(Estudiante, related_name='cursos', blank=True)

    def __str__(self):
        materia_nombre = self.materia.nombre if self.materia else "Sin Materia"
        return f"{materia_nombre} - {self.semestre}"
    
class Carrera(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    duracion_anios = models.IntegerField()

    def __str__(self):
        return self.nombre

class Maestro(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # Un maestro pertenece a una carrera. Si se borra la carrera, se protege al maestro (no se borra).
    carrera = models.ForeignKey(Carrera, on_delete=models.PROTECT, related_name='maestros')

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Calificacion(models.Model):
    # La calificación pertenece a un estudiante. Si se borra el estudiante, se borra la calificación.
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='calificaciones')
    # La calificación es de un curso. Si se borra el curso, se borra la calificación.
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='calificaciones')
    # Calificación numérica, por ejemplo de 0 a 100 o de 0 a 10.
    puntuacion = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.estudiante} - {self.curso}: {self.puntuacion}"
    
