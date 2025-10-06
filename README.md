# control-escolar


# Proyecto: Sistema de Control Escolar

## Resumen del Proyecto
Este es un sistema de gestión escolar full-stack desarrollado con un backend de API REST usando **Django** y un frontend moderno de tipo Single Page Application (SPA) usando **React**.

El sistema permite a los administradores gestionar los datos maestros (Estudiantes, Maestros, Materias, etc.) y provee una base para futuras funcionalidades, como portales para estudiantes y maestros, con un enfoque en la seguridad y la autenticación moderna.

## Tecnologías Utilizadas
* **Backend:**
    * Python
    * Django & Django REST Framework (DRF)
    * `djangorestframework-simplejwt` para autenticación por tokens JWT.
    * `django-cors-headers` para comunicación segura entre frontend y backend.
* **Frontend:**
    * JavaScript (ES6+)
    * React
    * React Router para la navegación.
    * React Context para el manejo de estado global (autenticación).
    * Axios para las peticiones a la API.
    * React-Bootstrap para los componentes de la interfaz de usuario.
* **Base de Datos:**
    * SQLite3 (para desarrollo).

---
## Arquitectura de Seguridad ("Cajas Negras")

La seguridad del proyecto se estructura en varias capas, como un edificio de alta seguridad.

### 1. El Login: Obtener la Credencial (Token JWT)
Cuando un usuario inicia sesión con credenciales correctas, el backend no abre una sesión, sino que genera una credencial digital llamada **Token JWT**. Esta credencial es como una tarjeta de acceso que contiene la identidad del usuario y una **firma digital** que la hace infalsificable. Si alguien modifica el token, la firma se invalida. El frontend guarda esta "tarjeta" en el `localStorage` del navegador.

### 2. La Petición: El Viaje Seguro al Servidor
Cada vez que el frontend necesita datos, un interceptor de **Axios** (nuestro "mensajero automático") adjunta el Token JWT en la cabecera `Authorization: Bearer <token>`. Además, **CORS** (`django-cors-headers`) actúa como un primer filtro en el backend, rechazando cualquier petición que no provenga de un origen autorizado (en nuestro caso, `http://localhost:3000`).

### 3. La Entrada al Servidor: El "Guardia de Seguridad" (Autenticación)
Cada petición que llega al backend es recibida por el "guardia de seguridad" de Django REST Framework (`JWTAuthentication`). Su único trabajo es verificar la firma y la fecha de expiración del token. Si el token es válido, identifica al usuario y lo deja pasar. Si no, rechaza la petición con un error **`401 Unauthorized`**.

### 4. Dentro del Servidor: El "Control de Acceso" (Permisos)
Una vez que el usuario está autenticado, intenta acceder a un endpoint específico (ej. crear un estudiante). Aquí actúa el "control de acceso" (`permission_classes`). Nuestra regla `ReadOnlyOrIsAdmin` verifica si el usuario es un administrador. Si no lo es y intenta una acción de escritura, el sistema le niega el paso con un error **`403 Forbidden`**.

### 5. Protección Interna de Django
* **Hashing de Contraseñas:** Django nunca almacena contraseñas en texto plano. Las convierte en un hash irreversible, protegiendo las credenciales incluso si la base de datos se viera comprometida.
* **Prevención de Inyección SQL:** El ORM de Django limpia y valida automáticamente todas las entradas de la base de datos, evitando ataques de inyección SQL.

---
## Documentación del Backend (API Django)

### Endpoints Principales

| Ruta (Endpoint)         | Métodos HTTP                   | Descripción                       | Permisos              |
| :---------------------- | :----------------------------- | :-------------------------------- | :-------------------- |
| `/api/register/`        | `POST`                         | Crea un nuevo usuario.            | Público               |
| `/api/auth/login/`      | `POST`                         | Inicia sesión y devuelve tokens JWT. | Público               |
| `/api/estudiantes/`     | `GET`, `POST`, `PUT`, `DELETE` | Gestiona la lista de estudiantes. | Admin para escritura  |
| `/api/maestros/`        | `GET`, `POST`, `PUT`, `DELETE` | Gestiona la lista de maestros.    | Admin para escritura  |
| `/api/materias/`        | `GET`, `POST`, `PUT`, `DELETE` | Gestiona el catálogo de materias. | Admin para escritura  |
| `/api/carreras/`        | `GET`, `POST`, `PUT`, `DELETE` | Gestiona la lista de carreras.    | Admin para escritura  |
| `/api/cursos/`          | `GET`, `POST`, `PUT`, `DELETE` | Gestiona los cursos específicos.  | Admin para escritura  |
| `/api/calificaciones/`  | `GET`, `POST`, `PUT`, `DELETE` | Gestiona las calificaciones.      | Admin para escritura  |

---
## Documentación del Frontend (React)

### Estructura de Carpetas (`src`)
* **`/api.js`**: Contiene el cliente Axios configurado con el interceptor que añade el token JWT a todas las peticiones.
* **`/components`**: Contiene componentes reutilizables (Navegación, Modales para formularios, etc.).
* **`/context`**: Contiene el `AuthContext` que gestiona el estado de autenticación del usuario en toda la aplicación.
* **`/pages`**: Contiene los componentes principales que representan una página completa (HomePage, LoginPage, GestionEstudiantes, etc.).
* **`/services`**: Contiene el archivo `apiService.js` que centraliza todas las funciones que llaman a la API.
* **`/utils`**: Contiene lógica de utilidad, como el componente `ProtectedRoute` que restringe el acceso a las rutas protegidas.

---
## Guía de Instalación y Uso

### Backend
1.  Navega a la carpeta raíz (`control-escolar`).
2.  Crea y activa el entorno virtual:
    * Windows: `python -m venv env` y luego `env\Scripts\activate`
    * macOS/Linux: `python3 -m venv env` y luego `source env/bin/activate`
3.  Genera el archivo de dependencias (solo la primera vez): `pip freeze > requirements.txt`
4.  Instala las dependencias: `pip install -r requirements.txt`
5.  Aplica las migraciones de la base de datos: `python manage.py migrate`
6.  Crea una cuenta de administrador: `python manage.py createsuperuser`
7.  Inicia el servidor: `python manage.py runserver` (Correrá en `http://127.0.0.1:8000`)

### Frontend
1.  Abre una **nueva terminal**.
2.  Navega a la carpeta del frontend: `cd frontend`
3.  Instala las dependencias: `npm install`
4.  Inicia el servidor de desarrollo: `npm start` (Correrá en `http://localhost:3000`)

