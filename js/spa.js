// Importamos la función para obtener los usuarios desde un archivo llamado crud.js
import { getUser } from "./crud";

// Importamos las funciones de manejo de formularios
import { setupGlobalFunctions } from "./formHandlers.js";

// Importamos la función de navegación
import { navigate } from "./navigation.js";

// Evento global para detectar clics en los enlaces SPA
document.body.addEventListener("click", (e) => {
  // Si el clic fue en un elemento con atributo data-link
  if (e.target.matches("[data-link]")) {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del enlace
    const path = e.target.getAttribute("href"); // Obtenemos el valor del href
    navigate(path); // Navegamos a esa ruta
  }
});

// Al cargar la página, inicializamos las funciones globales y navegamos a la ruta actual
window.addEventListener("DOMContentLoaded", () => {
  setupGlobalFunctions(); // Configuramos las funciones globales

  // Verificar si el usuario está autenticado
  const isAuth = localStorage.getItem("Auth") === "true";

  if (!isAuth) {
    // Si no está autenticado, ir al login
    navigate("/login");
  } else {
    // Si está autenticado, ir a productos o la ruta actual
    const currentPath =
      location.pathname === "/" ? "/products" : location.pathname;
    navigate(currentPath);
  }
});

// Detectamos cuando el usuario usa el botón de retroceso del navegador
window.addEventListener("popstate", () => {
  const isAuth = localStorage.getItem("Auth") === "true";

  if (!isAuth && location.pathname !== "/login") {
    // Si no está autenticado y no va al login, redirigir al login
    navigate("/login");
  } else {
    // Si está autenticado o va al login, cargar la ruta
    const currentPath =
      location.pathname === "/" ? "/products" : location.pathname;
    navigate(currentPath);
  }
});
