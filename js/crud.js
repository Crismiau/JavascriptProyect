const apiUsers = "http://localhost:3000/users";
const apiProducts = "http://localhost:3000/products";

// Creamos el crud para usuarios

export async function addUsers(user) {
  try {
    const res = await fetch(apiUsers, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok)
      throw new Error("Ocurrio un error al crear el usuario (THROW)");

    const data = await res.json();
    console.log("Usuario creado", data);
    return data;
  } catch (error) {
    alert("ocurrio un error (CATCH)", error);
    console.log("ocurrio un error (CATCH)", error);
    return [];
  }
}

export async function updateUser(id, updateUser) {
  try {
    const res = await fetch(`${apiUsers}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateUser)
    });

    if (!res.ok)
      throw new Error("Ocurrio un error al actualizar el usuario (THROW)");

    const data = await res.json();
    alert("Usuario actualizado");
    console.log("Usuario actualizado", data);
    return data;
  } catch (error) {
    alert("ocurrio un error (CATCH)", error);
    console.log("ocurrio un error (CATCH)", error);
    return [];
  }
}

export async function getUser() {
  try {
    const res = await fetch(apiUsers);

    if (!res.ok)
      throw new Error("Ocurrio un error al leeer el usuario (THROW)");

    const data = await res.json();
    console.log("Usuario leido", data);
    return data;
  } catch (error) {
    alert("ocurrio un error (CATCH)", error);
    console.log("Oocurrio un error (CATCH)", error);
    return [];
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`${apiUsers}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok)
      throw new Error("Ocurrio un error al eliminar el usuario (THROW)");

    console.log("Usuario Eliminado");
    return true;
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return false;
  }
}

// CREAMOS EL CRUD PARA CURSOS

export async function addProduct(course) {
  try {
    const res = await fetch(apiProducts, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });

    if (!res.ok) throw new Error("Ocurrio un error al crear el producto (THROW)");
    const data = await res.json();
    alert("Producto creado correctamente");
    console.log("Producto creado correctamente", data);
    return data;
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return [];
  }
}
export async function getProduct() {
  try {
    const res = await fetch(apiProducts, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Ocurrio un error al leer el producto (THROW)");

    const data = await res.json();
    console.log("productos actuales:", data);
    return data;
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return [];
  }
}

export async function updateProduct(id, updateCourse) {
  try {
    const res = await fetch(`${apiProducts}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateCourse),
    });

    if (!res.ok)
      throw new Error(
        "Ocurrio un error inesperado al actualizar el producto (THROW)"
      );

    const data = await res.json();
    console.log("Usuario actualizado correctamente", data);
    alert("Usuario actualizado correctamente", data);
    return data;
  } catch (error) {
    alert("Ocurrio un error (CATCH)", Error);
    console.log("ocurrio un error (CATCH)", error);
    return [];
  }
}
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${apiProducts}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Ocurrio un error inesperado (THROW)");
    alert("Usuario eliminado correctamente");
    console.log("Usuario eliminado correctamente");
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return [];
  }
}
