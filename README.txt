CASTILBLANCO LASER - WEB PORTFOLIO

Archivos principales:
- index.html: textos, secciones, tarjetas del portfolio y datos de cada proyecto.
- styles.css: colores, tamaños y diseño visual.
- script.js: menú móvil, filtros y galería ampliada tipo lightbox.

COMO EDITAR LA GALERIA AMPLIADA

Cada proyecto está dentro de index.html con una etiqueta parecida a esta:

<article class="project-card reveal"
  data-category="madera personalizados"
  data-title="Grabados personalizados"
  data-material="Madera"
  data-technique="Grabado láser"
  data-gallery="Vista principal|Detalle del grabado|Acabado final|Pieza preparada"
  data-description="Nombres, frases, logos y detalles únicos en madera.">

Lo que puedes cambiar:

1. data-title
   Nombre del proyecto que aparece al abrirlo.

2. data-material
   Material usado, por ejemplo: Madera de chopo 5 mm.

3. data-technique
   Técnica usada, por ejemplo: Corte y grabado láser.

4. data-description
   Descripción larga del proyecto.

5. data-category
   Sirve para los filtros. Puedes poner varias categorías separadas por espacios:
   madera metacrilato decoracion personalizados

6. data-gallery
   Aquí van las imágenes o textos de la galería, separados por barras verticales |.

   Mientras no tengas fotos reales, puedes usar textos:
   data-gallery="Frontal|Detalle|Acabado final|Packaging"

   Cuando tengas fotos reales, crea una carpeta img y escribe:
   data-gallery="img/trabajo1-1.jpg|img/trabajo1-2.jpg|img/trabajo1-3.jpg"

IMPORTANTE:
- Los nombres de archivo deben coincidir exactamente.
- No uses espacios en los nombres de foto. Mejor: cartel-boda-1.jpg
- Guarda con Ctrl+S y revisa en el navegador.

CONTACTO
Busca en index.html y script.js este número:
34600000000
Cámbialo por tu WhatsApp real con prefijo, por ejemplo:
34612345678


---
SECCIÓN MINITÚ DE MADERA

He añadido una nueva sección con id="minitus" y un botón en el menú.

Para cambiar textos: edita la sección "MiniTú de madera personalizados" en index.html.

Para cambiar el WhatsApp del formulario: abre script.js y busca 34600000000. Sustitúyelo por tu número con prefijo, por ejemplo 34612345678.

Importante: por seguridad del navegador, el archivo de foto no se puede adjuntar automáticamente a WhatsApp desde una web estática. El formulario prepara el mensaje y avisa al cliente para que envíe la foto en el chat de WhatsApp.

Para cambiar el dibujo provisional del minitu: sustituye el bloque .minitu-preview de index.html por una imagen, por ejemplo:
<img src="img/tu-minitu.jpg" alt="MiniTú de madera personalizado">


CAMBIO AÑADIDO - MINITÚ DE MADERA
---------------------------------
La sección usa ahora la imagen img/minitu-universal.png como modelo universal.
Los campos editables que actualizan la vista previa son:
- Texto superior de la caja
- Curso / año / detalle circular
- Nombre para la base

La previsualización es orientativa. El diseño final se realiza a partir de la foto enviada por el cliente.


CAMBIO FINAL - GALERÍA MOSAICO Y MINITÚ
----------------------------------------
La galería de Trabajos destacados usa ahora formato mosaico compacto en escritorio y móvil. Las tarjetas muestran solo imagen y título, y al pulsar se abre el modal con fotos, datos y botón de WhatsApp. También se han cambiado las referencias visibles de MiniTú a MiniTú.
