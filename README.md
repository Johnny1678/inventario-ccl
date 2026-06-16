# Inventario CCL

Aplicación de gestión de inventario desarrollada con ASP.NET Core, PostgreSQL y Angular 19.

## Tecnologías

### Backend

* ASP.NET Core 9
* Entity Framework Core
* PostgreSQL
* JWT Authentication

### Frontend

* Angular 19
* TypeScript
* Bootstrap 5

## Instalación

### 1. Base de datos

Entrar a la carpeta **BaseDeDatos** y ejecutar el archivo `script.sql`.

La base de datos utilizada es:

```text
inventario_ccl
```

### 2. Backend

Entrar a la carpeta **InventarioCCL.Api**.

Configurar la cadena de conexión en el archivo `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=inventario_ccl;Username=postgres;Password=Su_Contraseña"
}
```

Restaurar paquetes:

```bash
dotnet restore
```

Ejecutar la API:

```bash
dotnet run
```

### 3. Frontend

Entrar a la carpeta **inventario-ccl-angular**.

Instalar dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

## Credenciales de prueba

```text
Usuario: admin
Contraseña: admin123
```

## Funcionalidades implementadas

* Autenticación mediante JWT.
* Protección de rutas mediante Guard.
* Consulta de inventario.
* Registro de movimientos de entrada y salida.
* Validaciones básicas en formularios.
* Integración Angular ↔ ASP.NET Core.
* Persistencia de datos en PostgreSQL.
