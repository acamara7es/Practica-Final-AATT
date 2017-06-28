# X-Nav-Practica-Aparcamientos
[Acceso a la aplicación básica](https://acamara7es.github.io/X-Nav-Practica-Aparcamientos/1.0)
[Acceso a la aplicación con optativas](https://acamara7es.github.io/X-Nav-Practica-Aparcamientos)


## Datos personales
- **Nombre:** Ángel Cámara Redondo
- **Titulación:** Grado en Ingeniería en Telemática
- **Usuario del laboratorio:** acamara
- **Nombre de usuario en GitHub:** acamara7es

## Resumen de las peculiaridades que se quieran mencionar sobre lo implementado en la parte obligatoria.
   - He completado algunos datos que faltaban en el JSON para que fuera más completo, en concreto 5 nombres de distrito, 6 nombres de barrio, 2 códigos postales, 2 coordenadas y 2 descripciones.

   - He creado unas colecciones "prediseñadas" según el distrito en el que se encuentran las instalaciones.

   - Tanto en la pestaña principal como en la de colecciones, en las listas de parkings, cada instalación que tiene el marcador en el mapa tiene un símbolo que lo identifica.

   - Los usuarios de Google+ aparecen con su foto y al pasar el ratón por encima se ve el nombre.

## Funcionalidades opcionales que se hayan implementado, y breve descripción de cada una.
-  He adaptado el servidor de usuarios de Google+ para que funcione desde la plataforma Heroku y que esté disponible sin tener que arrancar el servidor en local.

- Es posible añadir usuarios de Google+ a través de su id o +NombreDeUsuario.

- Las fotos de perfil incluyen enlace al perfil de G+ al pulsarlas.

- Para mejorar el rendimiento, a la hora de obtener las fotos de las ubicaciones de los aparcamientos, en lugar de cargar las imágenes originales (en algunos casos de más de 3000x2000 píxeles) modifico las url de las miniaturas para obtener una "miniatura más grande"  de máximo 500 píxeles de ancho/alto. En el caso que comentaba, la _imagen miniaturizada_ ocupa **50 veces menos que la original** (3.9 MB vs 79.5 KB).

- Para mejorar el rendimiento en la carga de la web he minimizado el css y el javascript de forma que ahora se encuentran recopilados en sendos archivos (_style.min.css_ y _script.min.js_) ahorrando varias conexiones con el servidor y un 34% y un 23% de datos respectivamente.

- Uso LocalStorage para almacenar los datos de los parkings una vez cargados por primera vez en el navegador.

- Diseño y funcionalidad adaptado para móviles (se pueden _arrastrar_ los objetos que se pedían con el plugin "_touch punch_" de jQueryUI).

## Enlace a los vídeos
Demostración de la funcionalidad básica: [https://youtu.be/fGDqPDch5xA](https://youtu.be/fGDqPDch5xA)

Demostración de la funcionalidad optativa: [https://youtu.be/ej2NacHx3fo](https://youtu.be/ej2NacHx3fo)
