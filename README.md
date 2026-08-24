# Web de autor — Juan Carlos Fernández León

Sitio web estático para Juan Carlos Fernández León (Madrid, 1970), escritor español de relato corto. Lo desarrollé como proyecto personal, con la idea de que pudiera servir como página real si mi tío decide publicarla.

## Motivación

Mi tío es escritor —tiene varios libros publicados y algún premio literario a sus espaldas— pero, como le pasa a mucha gente de su generación, no tenía ninguna presencia online más allá de alguna reseña suelta en páginas de terceros. Cada vez que alguien buscaba su nombre en internet, no encontraba nada que él controlara: ni una biografía en condiciones, ni un sitio donde ver sus libros, ni una forma de contactarlo.

Aproveché para construirle una web sencilla, sin depender de plantillas de terceros ni de gestores de contenido pesados, y de paso practicar frontend "de verdad": maquetación responsive, accesibilidad, modo oscuro, rendimiento y buenas prácticas de SEO, todo desde cero con HTML, CSS y JavaScript. El objetivo era doble: darle a mi tío algo que pudiera usar sin depender de nadie para mantenerlo, y tener un proyecto propio, completo y presentable, con el que demostrar cómo trabajo.

## Sobre el contenido

Los datos biográficos (nacimiento en Madrid en 1970, profesión de profesor de secundaria, los libros *De sótanos y azoteas* —Castalia, 2010, Premio Tiflos— y *Los interiores de la tortuga* —Ápeiron, 2022—, los premios Miguel de Unamuno y Villa de Mazarrón, y las colaboraciones en *Eñe* y *El problema de Yorik*) están verificados y son reales.

El resto —los relatos y extractos, las citas, las fechas de agenda y el retrato del autor— es contenido de muestra que escribí yo mismo para poder maquetar y probar el diseño con textos de longitud y tono realistas, a falta de que mi tío aporte sus propios relatos y una foto cuando decida publicar la web.

## Stack

- **HTML5** semántico.
- **CSS3** con variables (custom properties), Flexbox y Grid — sin frameworks tipo Bootstrap o Tailwind.
- **JavaScript** vanilla (ES6+), sin librerías ni build tools.
- **Google Fonts** (Playfair Display, EB Garamond, Inter) como única dependencia externa.
- Sin backend: es un sitio estático, pensado para desplegarse en cualquier hosting de archivos.

## Decisiones técnicas

- Variables CSS centralizadas para la paleta de color, de forma que cambiar el aspecto general de la web sea cuestión de tocar un solo archivo.
- Modo claro/oscuro con preferencia guardada en `localStorage`.
- Diseño responsive con menú de hamburguesa para móvil.
- Animaciones de aparición al hacer scroll, respetando `prefers-reduced-motion` para quien tenga esa preferencia activada.
- Metaetiquetas Open Graph y Twitter Card en cada página, para que los enlaces se vean bien al compartirlos.

### Paleta — «Tinta & Pergamino»

| Color        | Hex       | Uso                                         |
| ------------ | --------- | -------------------------------------------- |
| Azul tinta   | `#1B2A41` | Texto principal / fondo oscuro de cubiertas |
| Pergamino    | `#F4EFE6` | Fondo claro                                 |
| Pergamino 2  | `#ECE3D3` | Tarjetas y secciones alternas               |
| Dorado latón | `#B8860B` | Acento (botones, líneas, detalles)          |
| Noche        | `#14202E` | Fondo del modo oscuro                       |

Para cambiar la paleta entera, basta con editar las variables `:root` al principio de `assets/css/style.css`.

## Estructura de archivos

```
TIO/
├── index.html            Inicio (héroe, novedad, obra, relatos, premios, agenda)
├── obra.html              Bibliografía, enlaza a la ficha de cada libro
├── libro-oscuridad.html   Ficha de «Oscuridad en la luz»
├── libro-tortuga.html     Ficha de «Los interiores de la tortuga»
├── libro-sotanos.html     Ficha de «De sótanos y azoteas»
├── relatos.html           Relatos y extractos para leer
├── autor.html             Biografía y trayectoria
├── contacto.html          Formulario y vía de contacto
├── aviso-legal.html
├── privacidad.html
├── assets/
│   ├── css/style.css      Paleta, modo claro/oscuro, responsive
│   ├── js/main.js         Tema, menú móvil, animaciones, formulario
│   └── img/                Portadas de los libros y foto del autor
└── README.md
```

## Cómo verla en local

Abriendo `index.html` directamente en el navegador ya funciona, pero para ver el comportamiento tal cual sería en producción (rutas, metaetiquetas, etc.) es mejor servirla con un servidor local:

```bash
python -m http.server 8000
# y luego abrir http://localhost:8000
```

## Despliegue

Al tratarse de HTML/CSS/JS puro, se puede publicar en cualquier hosting estático:

- **Netlify o Vercel**: arrastrando la carpeta a su panel.
- **GitHub Pages**: subiendo el repositorio y activando Pages.

Por ahora el proyecto vive solo en local. La idea a futuro es desplegarlo de forma definitiva y comprar y configurar un dominio propio para mi tío, en vez de depender de una URL genérica de hosting gratuito.

## Pendiente antes de una publicación real

- Sustituir los relatos y citas de muestra por textos reales del autor.
- Cambiar las fechas de agenda de ejemplo por las reales.
- Sustituir el retrato (actualmente un monograma) por una fotografía.
- Conectar el formulario de contacto a un servicio real (Formspree, Netlify Forms o backend propio); ahora mismo `main.js` solo simula el envío.
- Actualizar el dominio de ejemplo (`https://www.juancarlosfernandezleon.es`) por el definitivo en todas las metaetiquetas Open Graph, para que las vistas previas al compartir enlaces funcionen correctamente.

## Contacto

Para dudas sobre el proyecto: **juancarlos.fernandezleon.autor@gmail.com**
