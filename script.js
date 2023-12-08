/*La primera línea de la función crea una constante llamada "audio" que busca un elemento de audio en el HTML que tenga un atributo data-key que
 sea igual al código de la tecla que se presionó. Esto significa que busca un elemento de audio que se corresponde con la tecla presionada.

La segunda línea de la función crea otra constante llamada "key" que busca un elemento de la clase "key" en el HTML que tenga el mismo atributo 
data-key que el código de la tecla presionada. Esto significa que busca el elemento de tecla correspondiente a la tecla que se presionó.

La tercera línea de la función verifica si se encontró un elemento de audio correspondiente. Si no se encontró, la función se detiene y no hace 
nada.

La cuarta línea de la función establece el tiempo actual del audio en 0 para que cada vez que se presione la tecla, el sonido se reproduzca 
desde el principio.

La quinta línea de la función reproduce el audio correspondiente que se encontró en la primera línea.

La sexta línea agrega la clase "playing" al elemento de tecla correspondiente, lo que activa la animación CSS asociada a esa clase.*/ 
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');


}
/*La función removeTransition se utiliza para eliminar la clase "playing" de la tecla correspondiente después de que finalice la animación CSS 
asociada a esa clase.

La primera línea de la función verifica si el propertyName de la transición que se acaba de completar es "transform". Esto se debe a que el 
código HTML de la tecla tiene múltiples transiciones que se aplican cuando se presiona una tecla, y solo estamos interesados en eliminar la 
clase "playing" después de que se complete la transformación.

La segunda línea de la función detiene la función si la propiedad de transición no es "transform".

La tercera línea de la función usa la palabra clave this para hacer referencia al elemento de tecla que acaba de completar la transición. 
Luego, elimina la clase "playing" de ese elemento de tecla.

En resumen, esta función es responsable de eliminar la clase "playing" de la tecla correspondiente una vez que se ha completado la 
transformación CSS. De esta manera, se puede volver a reproducir la animación CSS en la tecla la próxima vez que se presione. */
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

/*La primera línea crea una variable keys que almacena una lista de todos los elementos del HTML que tienen la clase "key". En este caso, estas 
son las teclas del teclado que se pueden presionar.

La segunda línea utiliza el método forEach para recorrer la lista de elementos keys y agregar un evento transitionend a cada tecla. El evento 
transitionend se activa cada vez que se completa una transición en el elemento, lo que en este caso ocurre cuando se completa la animación CSS 
asociada a la clase "playing". La función removeTransition se asocia a este evento para que se ejecute cada vez que se completa una transición 
en una tecla.

La tercera línea agrega un evento keydown al objeto global window. Cada vez que se presiona una tecla en el teclado, se activa este evento y 
llama a la función playSound que reproduce el sonido asociado a la tecla presionada y agrega la clase "playing" al elemento de tecla 
correspondiente para activar la animación CSS.

En resumen, esta parte del código agrega eventos a las teclas del teclado para activar la animación CSS y reproducir el sonido correspondiente 
cuando se presionan. Además, agrega un evento global para detectar cuando se presiona una tecla en el teclado y llamar a la función playSound. */
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);