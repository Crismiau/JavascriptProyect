// Importamos las funciones del CRUD Y NAVIGATE
import { getUser, addUsers, deleteUser, updateUser } from "./crud.js";
import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./crud.js";
import { navigate } from "./navigation.js";

// Lógica que se ejecuta al mostrar el formulario de login
export function setupLoginForm() {
  const form = document.getElementById("login-spa"); // Formulario de login

  if (!form) return; // Si no se encuentra el formulario, salimos

  // Evento cuando el usuario envía el formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const email = document.getElementById("email").value; // Tomamos el valor del input email
    const password = document.getElementById("password").value; // Tomamos el valor del input password

    const users = await getUser(); // Obtenemos los usuarios desde el backend o JSON

    // Buscamos si existe un usuario con el mismo email y contraseña
    const foundUser = users.find(
      (u) => u.email === email && String(u.password) === password
    );

    if (foundUser) {
      // Si lo encontramos, iniciamos sesión guardando Auth y rol
      localStorage.setItem("Auth", "true");
      localStorage.setItem("role", foundUser.role);
      localStorage.setItem(
        "userName",
        foundUser.name || foundUser.nombre || "Usuario"
      );
      // Actualizamos la información del usuario en el nav
      updateUserInfo();
      // Redirigimos a la vista de productos
      navigate("/products");
    } else {
      alert("Usuario o contraseña incorrectos"); // Mostramos error
    }
  });
}

// Lógica que se ejecuta al mostrar el formulario de nuevo usuario
export function setupNewUserForm() {
  const form = document.querySelector(".new-user-form"); // Formulario de nuevo usuario

  if (!form) return; // Si no se encuentra el formulario, salimos

  // Evento cuando el usuario envía el formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    // Obtenemos todos los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("rol").value;
    const password = document.getElementById("password").value;
    // Validaciones básicas
    if (!nombre || !telefono || !email || !role || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Crear objeto con los datos del usuario
    const user = {
      name: nombre,
      email: email,
      password: password,
      role: role,
      phone: telefono,
    };
    try {
      // Llamar a la función del CRUD para crear el usuario
      const result = await addUsers(user);

      if (result) {
        // Si se creó exitosamente, limpiar el formulario y mostrar mensaje
        form.reset();
        alert("Usuario creado exitosamente");
        // Redirigir a la lista de usuarios
        navigate("/users");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error al crear el usuario. Por favor, intenta de nuevo.", error);
    }
  });
}

export async function setupUsers() {
  // Cargar usuarios reales desde el CRUD
  try {
    const users = await getUser();
    const usersList = document.querySelector(".users-list");

    if (usersList && users.length > 0) {
      // Limpiar la lista actual
      usersList.innerHTML = "";

      // Crear elementos para cada usuario
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="user-info">
            <i class="fas fa-user-circle"></i>
            <span>${user.nombre || user.name || "Usuario"} |</span>
            <span>${user.role || user.role || "Usuario"}</span>
            <span>${user.phone || user.phone || "Celular"}</span>
            </div>
          <div class="user-actions">
            <button class="admin-btn" onclick="editUser('${user.id}')">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="admin-btn" onclick="deleteUserFromList('${
              user.id
            }')">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </div>
        `;
        usersList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

// Función para actualizar la visibilidad de los enlaces de navegación
export function updateNavVisibility() {
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "admin";

  // Enlaces que solo deben ver los administradores
  const adminLinks = document.querySelectorAll('[data-admin-only="true"]');

  adminLinks.forEach((link) => {
    if (isAdmin) {
      link.style.display = "";
    } else {
      link.style.display = "none";
    }
  });
}

// Función para actualizar la información del usuario en el nav
export function updateUserInfo() {
  const userNameElement = document.getElementById("user-name");
  const userRoleElement = document.getElementById("user-role");

  if (userNameElement && userRoleElement) {
    const userName = localStorage.getItem("userName") || "Usuario";
    const userRole = localStorage.getItem("role") || "Usuario";

    userNameElement.textContent = userName;
    userRoleElement.textContent = userRole;
  }

  // Actualizar visibilidad de enlaces según el rol
  updateNavVisibility();
}

// Funciones globales para editar y eliminar usuarios
export function setupGlobalFunctions() {
  // Configurar botón de cerrar sesión (disponible globalmente)
  const buttonCloseSession = document.getElementById("close-sesion");
  if (buttonCloseSession) {
    // Remover eventos previos para evitar duplicados
    buttonCloseSession.replaceWith(buttonCloseSession.cloneNode(true));
    const newButtonCloseSession = document.getElementById("close-sesion");

    newButtonCloseSession.addEventListener("click", () => {
      // Mostramos confirmación antes de cerrar sesión
      const confirmarCerrarSesion = confirm(
        "¿Estás seguro que quieres cerrar sesión?"
      );

      if (confirmarCerrarSesion) {
        // Si confirma, eliminamos los datos del usuario del localStorage
        localStorage.setItem("Auth", "false");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        // Actualizamos la información del usuario en el nav
        updateUserInfo();
        // Redirigir al login
        navigate("/login");
      }
      // Si no confirma, no hacemos nada y se mantiene en la página actual
    });
  }

  // Función para editar usuario
  window.editUser = async (id) => {
    try {
      // Obtener los datos del usuario a editar
      const users = await getUser();
      // Convertir el ID a número para comparación consistente
      const userToEdit = users.find((user) => user.id == id);

      if (!userToEdit) {
        alert("Usuario no encontrado");
        return;
      }

      // Crear un formulario de edición simple
      const newName = prompt(
        "Nuevo nombre:",
        userToEdit.name || userToEdit.nombre
      );
      const newRole = prompt("Nuevo rol (admin/user):", userToEdit.role);
      const newPhone = prompt(
        "Nuevo teléfono:",
        userToEdit.phone || userToEdit.telefono
      );
      const newEmail = prompt("Nuevo email:", userToEdit.email);
      const newPassword = prompt(
        "Nueva contraseña (dejar vacío para mantener la actual):",
        ""
      );

      // Validar que se ingresaron datos obligatorios
      if (!newName || !newRole || !newPhone || !newEmail) {
        alert("Los campos nombre, rol, teléfono y email son obligatorios");
        return;
      }

      // Crear objeto con los datos actualizados
      const updatedUser = {
        name: newName,
        role: newRole,
        phone: newPhone,
        email: newEmail,
        password: newPassword || userToEdit.password, // Mantener contraseña actual si no se ingresa nueva
      };

      // Llamar a la función del CRUD para actualizar
      const result = await updateUser(id, updatedUser);

      if (result) {
        alert("Usuario actualizado exitosamente");
        // Recargar la lista de usuarios
        setupUsers();
      } else {
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Error al editar el usuario: " + error.message);
    }
  };

  // Función para eliminar usuario
  window.deleteUserFromList = async (id) => {
    const confirmarEliminar = confirm(
      "¿Estás seguro que quieres eliminar este usuario?"
    );

    if (confirmarEliminar) {
      try {
        // Convertir el ID a número para consistencia
        const result = await deleteUser(id);

        if (result) {
          alert("Usuario eliminado exitosamente");
          // Recargar la lista de usuarios
          setupUsers();
        } else {
          alert("Error al eliminar el usuario");
        }
      } catch (error) {
        console.error("Error al eliminar usuarioaaa:", error);
        alert("Error al eliminar el usuariaaaao: " + error.message);
      }
    }
  };
}

export async function setupProducts() {
  const productsGrid = document.getElementById("products-grid");
  const addProductBtn = document.getElementById("add-product-btn");
  const addProductForm = document.getElementById("add-product-form");
  const isAdmin = localStorage.getItem("role") === "admin";

  // Mostrar/ocultar botón y formulario según el rol
  if (!isAdmin && addProductBtn) addProductBtn.style.display = "none";
  if (!isAdmin && addProductForm) addProductForm.style.display = "none";
  if (isAdmin && addProductBtn) addProductBtn.style.display = "";
  if (isAdmin && addProductForm) addProductForm.style.display = "none";

  // Mostrar formulario al hacer clic en el botón
  if (isAdmin && addProductBtn && addProductForm) {
    addProductBtn.onclick = () => {
      addProductForm.style.display = "block";
      addProductBtn.style.display = "none";
    };
  }

  // Manejar el envío del formulario
  if (isAdmin && addProductForm) {
    addProductForm.onsubmit = async (e) => {
      e.preventDefault();
      const title = document.getElementById("product-title").value;
      const description = document.getElementById("product-description").value;
      const price = document.getElementById("product-price").value;
      const stock = document.getElementById("product-stock").value;

      if (!title || !description || !price || !stock) {
        alert("Todos los campos son obligatorios");
        return;
      }

      const newProduct = {
        title,
        description,
        price: Number(price),
        stock: Number(stock),
      };

      await addProduct(newProduct);
      addProductForm.reset();
      addProductForm.style.display = "none";
      addProductBtn.style.display = "";
      await renderProducts(); // Refresca la lista
    };
  }

  // renderizar productos
  async function renderProducts() {
    const products = await getProduct();
    productsGrid.innerHTML = "";
    products.forEach((p) => {
      const card = document.createElement("div");

      card.className = "product-card";
      card.innerHTML = `
      <div class="product-image">
          <i class="fas fa-box"></i>
        </div>
        <div class="product-info">
          <h3>${p.title}</h3>
          <p class="product-description">${p.description}</p>
          <div class="product-details">
            <span class="product-price">$${p.price}</span>
          </div>
          <div class="product-stock">
            <span>${p.stock}</span>
          </div>
        </div>
        <div class="product-actions">
          ${
            isAdmin
              ? `
            <button class="btn-edit" data-id="${p.id}"><i class="fas fa-edit"></i></button>
            <button class="btn-delete" data-id="${p.id}"><i class="fas fa-trash"></i></button>
          `
              : ""
          }
        </div>
      `;
      productsGrid.appendChild(card);
    });

    if (isAdmin) {
      productsGrid.querySelectorAll(".btn-edit").forEach((btn) => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");
          const product = products.find((p) => String(p.id) === String(id));
          if (!product) return;

          const newTitle = prompt("Nuevo nombre del producto:", product.title);
          const newDescription = prompt(
            "Nueva descripción:",
            product.description
          );
          const newPrice = prompt("Nuevo precio:", product.price);
          const newStock = prompt("Nuevo precio:", product.stock);

          if (!newTitle || !newDescription || !newPrice || !newStock) {
            alert("Todos los campos son obligatorios");
            return;
          }

          await updateProduct(id, {
            title: newTitle,
            description: newDescription,
            price: Number(newPrice),
            stock: Number(newStock),
          });
          await renderProducts();
        };
      });

      // Eliminar producto

      productsGrid.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");

          if (confirm("¿Seguro que quieres eliminar este producto?")) {
            await deleteProduct(id);
            await renderProducts();
          }
        };
      });
    }
  }

  // Llama a renderProducts al cargar
  await renderProducts();
}
