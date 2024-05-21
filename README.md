# Patrón Circuit Breaker en Node.js con MongoDB

El patrón Circuit Breaker se implementa en esta aplicación Node.js para gestionar las conexiones con MongoDB de manera robusta y resistente a fallos. 

## Funcionamiento en el código

1. **Creación del Circuit Breaker:**
   Se crea un circuito (`circuit`) utilizando la biblioteca `opossum`. Este circuito supervisa la conexión a la base de datos MongoDB.

2. **Manejo de errores de MongoDB:**
   Cuando se produce un error en la conexión con MongoDB, se activa el evento `error` en la conexión de Mongoose. El código maneja este evento mediante una función que imprime el error y, posteriormente, intenta reconectarse a MongoDB.

3. **Apertura del circuito:**
   Después de un tiempo predefinido (`timeout`), se simula un problema en la conexión a MongoDB. Esto se logra emitiendo un error en la conexión, lo que provoca que el circuito se abra.

4. **Reconexión automática:**
   Tras abrirse el circuito, se inicia un proceso de reconexión a MongoDB después de un tiempo de espera (`resetTimeout`). Esto permite restaurar la conexión cuando el problema temporal haya sido resuelto.

5. **Configuración del Circuit Breaker:**
   El circuito se configura con opciones como `timeout`, `errorThresholdPercentage` y `resetTimeout`, que determinan el tiempo de espera y los límites de error para abrir y cerrar el circuito.
