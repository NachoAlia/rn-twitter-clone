import { domainUrl } from "../../host";

const route = "/users"; // Ruta base para obtener detalles de usuario por ID
const apiUrl = `${domainUrl}${route}`;

export async function SearchUserById(userId) {
  const response = await fetch(`${apiUrl}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  const data = await response.json();
  return data;
}
