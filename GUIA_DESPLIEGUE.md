# Guía de Despliegue: Render + Caster.fm

Sigue estos pasos para poner tu radio profesional en internet totalmente gratis.

## Paso 1: Configurar el Audio (Caster.fm)

1.  Ve a [Caster.fm](https://www.caster.fm/) y regístrate en el "Free Plan".
2.  Una vez registrado y confirmado tu email, inicia sesión en tu panel de control (Caster.fm Dashboard).
3.  Tendrás que "iniciar" tu servidor (a veces piden que vayas a una página web privada primero para activarlo).
4.  Busca la sección **"Radio Details"** o **"Server config"**. Copia estos datos:
    *   **Server Address / IP**: (Ejemplo: `shoutcast.caster.fm` o `192.168.x.x`)
    *   **Port**: (Ejemplo: `8000` o `25432`)
    *   **Mount Point**: (Normalmente `/listen.mp3` o `/stream`)
    *   **Source Password**: (La contraseña para emitir)

> **💡 IMPORTANTE:** Ahora configura tu programa emisor (BUTT/Mixxx) con estos datos y dale a conectar para probar que estás "Al Aire".

## Paso 2: Subir cambios a GitHub

Como hemos modificado el código para que sea compatible con la nube, primero guarda los cambios:

1.  Abre GitHub Desktop.
2.  Verás cambios en `streamController.js`, `player.js`, etc.
3.  Escribe "Preparando para Render" en el resumen.
4.  Haz clic en **Commit to main**.
5.  Haz clic en **Push origin**.

## Paso 3: Desplegar la Web (Render.com)

1.  Ve a [Render.com](https://render.com/) y crea una cuenta (puedes usar tu GitHub).
2.  En el Dashboard, haz clic en **New +** y selecciona **Web Service**.
3.  Conecta tu cuenta de GitHub y selecciona tu repositorio `miradio`.
4.  Configura lo siguiente:
    *   **Name**: `miradio-web` (o lo que quieras)
    *   **Region**: Cualquiera (Ohio o Frankfurt van bien)
    *   **Branch**: `main`
    *   **Root Directory**: (Déjalo en blanco)
    *   **Runtime**: **Node**
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server/server.js`
    *   **Plan**: Free

5.  **MUY IMPORTANTE - Variables de Entorno**:
    Baja hasta la sección **Environment Variables** y añade estas claves con los datos de **Caster.fm**:

    | Key | Value |
    | :--- | :--- |
    | `NODE_ENV` | `production` |
    | `JWT_SECRET` | Inventa una contraseña larga y segura aquí |
    | `ICECAST_SERVER` | La dirección IP de Caster.fm (ej. `http://shoutcast.caster.fm:25432`) |
    | `STREAM_MOUNT` | El mount point (ej. `/listen.mp3`) |

    *Nota: En `ICECAST_SERVER`, pon la URL completa con el puerto si es necesario, pero SIN el mount point.*

6.  Haz clic en **Create Web Service**.

## Paso 4: ¡A disfrutar!

Render tardará unos minutos en construir tu web. Cuando termine, te dará una URL (ej. `https://miradio-web.onrender.com`).

*   Entra a esa URL: Deberías ver tu web.
*   Dale Play: Debería sonar lo que estás emitiendo a Caster.fm desde tu PC.
*   Entra a `/login`: Usa el admin para cambiar los títulos de las canciones.

¡Listo! Eres dueño de una estación de radio global. 🌎📻
