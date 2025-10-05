# api/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS

class ReadOnlyOrIsAdmin(BasePermission):
    """
    Permiso personalizado para permitir solo lectura a usuarios autenticados,
    y permisos de escritura solo a los administradores.
    """

    def has_permission(self, request, view):
        # Primero, asegúrate de que el usuario esté autenticado.
        if not request.user or not request.user.is_authenticated:
            return False

        # Si el método es de solo lectura (GET, HEAD, OPTIONS), permite el acceso.
        if request.method in SAFE_METHODS:
            return True

        # Si el método es de escritura (POST, PUT, DELETE),
        # solo permite el acceso si el usuario es un administrador (staff).
        return request.user.is_staff