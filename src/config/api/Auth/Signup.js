import { domainUrl } from "../../host";

const route = "/users";
const apiUrl = `${domainUrl}${route}`;

export async function Signup(email, username, password) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
        username: username,
        password: password,
      },
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  return await response.json();
}
