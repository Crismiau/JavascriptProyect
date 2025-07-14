import { setupProducts } from "./formHandlers.js";

// Función que se encarga de cargar la vista (html) correspondiente y ejecutar su lógica
export async function navigate(pathname) {
  // Definimos las rutas de la aplicación
  const routes = {
    "/users": "/pages/users.html",
    "/newuser": "/pages/newuser.html",
    "/products": "/pages/products.html",
    "/login": "/pages/login.html",
  };

  // Función que verifica si el usuario está autenticado
  function isAuth() {
    const result = localStorage.getItem("Auth") || null;
    const resultBool = result === "true";
    return resultBool;
  }

  // Función que verifica si el usuario es administrador
  function isAdmin() {
    const userRole = localStorage.getItem("role");
    return userRole === "admin";
  }

  // Si el usuario no está autenticado y no va a login, lo redirigimos al login
  if (!isAuth() && pathname !== "/login") {
    pathname = "/login";
  }

  // Protección de rutas: solo admin puede acceder a /users y /newuser
  if (
    isAuth() &&
    !isAdmin() &&
    (pathname === "/users" ||
      pathname === "/newuser" ||
      pathname === "/products")
  ) {
    // Mostrar mensaje de acceso denegado
    pathname = "/products";
  }

  const route = routes[pathname]; // Obtenemos la ruta del archivo HTML según el pathname

  if (!route) {
    // Si no existe la ruta, mostramos un error 404
    document.getElementById("content").innerHTML =
      "<h2>404 Página no encontrada</h2>";
    return;
  }

  // Cargamos el contenido del archivo HTML
  const html = await fetch(route).then((res) => res.text());
  // Insertamos el contenido dentro del elemento con ID "content"
  document.getElementById("content").innerHTML = html;
  // Actualizamos la URL sin recargar la página
  history.pushState({}, "", pathname);

  // Importamos dinámicamente las funciones de setup
  const { setupLoginForm, setupNewUserForm, setupUsers, updateUserInfo } =
    await import("./formHandlers.js");

  // Actualizamos la información del usuario en el nav
  updateUserInfo();

  // Si estamos en la ruta específica, ejecutamos lógica específica
  if (pathname === "/users") setupUsers();
  if (pathname === "/login") setupLoginForm();
  if (pathname === "/newuser") setupNewUserForm();
  if (pathname == "/products") setupProducts();
}
