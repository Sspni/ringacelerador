================================================================================
COIL RING ACCELERATOR — PRESENTACIÓN INTERACTIVA CIENTÍFICA
Experimento Escolar de Física // Grado 11°
Autores: Nicolas Valencia · Yojhan Cubillos · Santiago Hernandez · Matias Ramos
================================================================================

¡Bienvenido! Este proyecto es una presentación interactiva de nivel científico y
educativo desarrollada íntegramente con tecnologías web estándar (HTML5, CSS3 y
Vanilla JavaScript), diseñada específicamente para exposiciones escolares de física.

No requiere conexión a internet, ni servidores locales, ni dependencias externas.

--------------------------------------------------------------------------------
1. ESTRUCTURA DE ARCHIVOS
--------------------------------------------------------------------------------

coil-ring-presentation/
│
├── index.html               <- Archivo principal de la presentación.
├── style.css                <- Hoja de estilos (Dark Scientific / 16:9).
├── script.js                <- Lógica interactiva, simuladores y gráficas Canvas.
├── README.txt               <- Este instructivo de uso y configuración.
│
└── assets/
    ├── fotos/               <- Carpeta para guardar las fotografías reales del proyecto.
    ├── ilustraciones/       <- Diagramas vectoriales y esquemas complementarios.
    └── iconos/              <- Iconografía científica.

--------------------------------------------------------------------------------
2. CÓMO ABRIR Y EJECUTAR LA PRESENTACIÓN
--------------------------------------------------------------------------------

1. Abre el explorador de archivos en la carpeta del proyecto.
2. Haz doble clic directamente sobre el archivo "index.html".
3. Se abrirá automáticamente en tu navegador preferido (Google Chrome, Microsoft Edge,
   Mozilla Firefox, Brave, Safari, etc.).
4. Para la mejor experiencia en proyector o pantalla grande, presiona la tecla "F" o
   haz clic en el botón superior "PRESENTACIÓN" para entrar en pantalla completa.

--------------------------------------------------------------------------------
3. CONTROLES Y ATAJOS DE TECLADO
--------------------------------------------------------------------------------

- [ Flecha Derecha (→) ] o [ Barra Espaciadora ] : Siguiente diapositiva.
- [ Flecha Izquierda (←) ]                       : Diapositiva anterior.
- [ Tecla F ]                                    : Activar / Salir de Modo Presentación (Pantalla Completa).
- [ Tecla M ]                                    : Abrir / Cerrar Menú de Índice de Diapositivas.
- [ Tecla ESC ]                                  : Cerrar menús, modales o salir de pantalla completa.
- [ Clic en puntos inferiores (dots) ]           : Salto directo a cualquier diapositiva.

--------------------------------------------------------------------------------
4. DÓNDE Y CÓMO INSERTAR FOTOGRAFÍAS REALES DEL MONTAJE
--------------------------------------------------------------------------------

La presentación incluye espacios interactivos claramente señalizados con la etiqueta:
[INSERTAR FOTO REAL DEL MONTAJE / CIRCUITO / SENSORES].

Tienes dos formas sencillas de colocarlas:

MÉTODO A (Interactivo en vivo / Drag and Drop):
- Durante la presentación o ensayos, simplemente haz clic sobre cualquier recuadro de foto
  o arrastra directamente un archivo de imagen (PNG, JPG, WEBP) desde tu computadora.
- La imagen se adaptará automáticamente dentro del marco de alta tecnología.

MÉTODO B (Fijar imágenes en el código):
1. Guarda tus fotos en la carpeta: assets/fotos/
   Por ejemplo:
   - assets/fotos/montaje_completo.jpg
   - assets/fotos/arduino_sensores.jpg
   - assets/fotos/circuito.jpg
2. Abre "index.html" con cualquier editor de texto y busca los bloques con clase:
   "photo-slot".
3. Puedes colocar la ruta fija en el atributo src de la etiqueta <img>:
   <img class="photo-slot-preview" src="assets/fotos/montaje_completo.jpg" style="display:block;">
   y agregar la clase "has-image" al contenedor "photo-slot".

--------------------------------------------------------------------------------
5. DÓNDE CAMBIAR O AGREGAR DATOS EXPERIMENTALES
--------------------------------------------------------------------------------

- En la Diapositiva 8 (Calculadora):
  Puedes cambiar interactivamente la distancia (d) y el tiempo (Δt) usando los controles
  numéricos para ver la velocidad calculada en m/s y km/h al instante.

- En la Diapositiva 11 (Tabla y Gráfica):
  Puedes agregar nuevas filas con el formulario inferior (+ AGREGAR) o modificar
  los datos de inicio directamente en "script.js" buscando la variable:
  
  let experimentalData = [
    { run: 1, time: 0.350, dist: 0.10, isExample: true },
    ...
  ];

- En la Diapositiva 12 (Experimento en tiempo real):
  El botón "SIMULAR PASO DE LA ESFERA" realiza una corrida cronométrica simulada y
  añade automáticamente la medición obtenida a la tabla y a la gráfica.

- En la Diapositiva 15 (Conclusiones):
  Dispones de un bloc de notas interactivo al pie de la diapositiva donde puedes
  escribir o pegar las conclusiones finales durante la exposición.

--------------------------------------------------------------------------------
6. CONSEJOS PARA LA EXPOSICIÓN ESCOLAR (GRADO 11°)
--------------------------------------------------------------------------------

1. Sigue el hilo conductor:
   Problema ➔ Concepto ➔ Física Teórica ➔ Simulación ➔ Montaje ➔ Medición con Arduino
   ➔ Datos ➔ Análisis Crítico ➔ Conclusiones.
2. Destaca ante el docente y evaluadores que Arduino mide en microsegundos (micros()),
   lo cual otorga un rigor experimental muy superior al uso de un cronómetro de mano.
3. Resalta la distinción científica entre la teoría (que asume ausencia de fricción) y
   el experimento real (donde intervienen factores mecánicos y tiempos de respuesta).

================================================================================
Proyecto escolar presentado por:
Nicolas Valencia · Yojhan Cubillos · Santiago Hernandez · Matias Ramos
Grado 11° // COIL RING ACCELERATOR
================================================================================
