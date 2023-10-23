// custom.js

// Utiliza fetch para obtener el contenido del archivo CSS
fetch("https://ilamdocs.pockethost.io/css/mdb.min.css")
  .then((response) => response.text())
  .then((cssText) => {
    // Crea un elemento <style> y agrega el contenido del CSS
    const styleElement = document.createElement("style");
    styleElement.textContent = cssText;

    // Agrega el elemento <style> al <head> de tu página
    document.head.appendChild(styleElement);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo CSS:", error);
  });
/*
  // Función para obtener la fecha actual en formato dd/mm/yyyy
  function obtenerFechaActual() {
      const fecha = new Date();

      // Obtenemos el día, mes y año
      const dia = fecha.getDate().toString().padStart(2, '0'); // Añadimos un 0 si es necesario
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes, ya que en JavaScript los meses van de 0 a 11
      const anio = fecha.getFullYear();

      return `${dia}/${mes}/${anio}`;
  }

  // Mostrar la fecha actual en el elemento con id "fechaActual"
  const fechaActualElement = document.getElementById('fechaActual');
  fechaActualElement.textContent = obtenerFechaActual();
*/