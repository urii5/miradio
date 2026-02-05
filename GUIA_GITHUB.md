# Guía de Subida a GitHub: Proyecto Radio URI

Ya que tienes **GitHub Desktop** y **Git Bash**, tienes dos opciones sencillas. Elige la que prefieras.

## Opción 1: Usando GitHub Desktop (Más visual)

1.  Abre **GitHub Desktop**.
2.  Ve al menú **File** > **Add Local Repository...**
3.  Busca y selecciona la carpeta de tu proyecto: 
    `C:\Users\Uri Thejeda\Desktop\radiouri`
4.  Te dirá que "This directory does not appear to be a Git repository". Haz clic en el enlace azul **create a repository here**.
5.  En la ventana que aparece:
    *   **Name**: `miradio` (o el nombre que prefieras).
    *   **Git ignore**: Déjalo en `None` (ya creé un archivo `.gitignore` especial para ti).
    *   Haz clic en **Create repository**.
6.  Ahora verás todos los archivos en "Changes". Escribe un resumen abajo a la izquierda (ej: "Versión inicial") y dale a **Commit to main**.
7.  Finalmente, haz clic en el botón azul **Publish repository** arriba a la derecha.
    *   Asegúrate de desmarcar "Keep this code private" si quieres que sea público.
    *   Dale a **Publish**.

¡Listo! Tu código estará en GitHub.

---

## Opción 2: Usando Git Bash (Línea de comandos)

1.  Ve a GitHub.com y crea un nuevo repositorio vacío llamado `miradio`.
    *   **IMPORTANTE**: No marques "Add a README", ni .gitignore, ni licencia. Que esté totalmente vacío.
2.  Ve a tu carpeta del proyecto en el escritorio, haz clic derecho en un espacio vacío y selecciona **"Open Git Bash Here"**.
3.  Copia y pega los siguientes comandos uno por uno (usa `Shift + Insert` para pegar en la terminal):

```bash
# 1. Inicializar Git
git init

# 2. Renombrar la rama principal a 'main'
git branch -M main

# 3. Conectar con tu repositorio en GitHub
# REEMPLAZA 'TU_USUARIO' por tu nombre real de GitHub
git remote add origin https://github.com/TU_USUARIO/miradio.git

# 4. Preparar todos los archivos
git add .

# 5. Guardar los cambios
git commit -m "Upload inicial proyecto Radio URI"

# 6. Subir a GitHub
git push -u origin main
```

Si te pide usuario y contraseña al hacer el push, usa tus credenciales de GitHub (o un Personal Access Token si usas autenticación moderna).
