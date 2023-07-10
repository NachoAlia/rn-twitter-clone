//* de aqui para abajo es el el archivo 4v

import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const route = "/users/login";
const tokenRoute = "/users/login_with_token";

const apiUrl = `${domainUrl}${route}`;
const tokenApiUrl = `${domainUrl}${tokenRoute}`;

export async function Signin(emailOrUsername, password) {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    // Si hay un token guardado, intentamos iniciar sesión con él
    try {
      const data = await loginWithToken(token);
      return data;
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem("token"); // Eliminar el token guardado si no es válido
      throw new Error("Invalid token");
    }
  } else {
    // Si no hay token guardado, realizamos el inicio de sesión normalmente
    return loginWithEmail(emailOrUsername, password);
  }
}

async function loginWithToken(token) {
  const response = await fetch(tokenApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  const data = await response.json();

  return data;
}

async function loginWithEmail(emailOrUsername, password) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_or_username: emailOrUsername,
      password: password,
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  const data = await response.json();

  await AsyncStorage.setItem("token", data.token);

  return data;
}

//* de aqui para abajo es el el archivo 3v

// import { domainUrl } from "../../host";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const route = "/users/login";
// const tokenRoute = "/users/login_with_token"; // Ruta para iniciar sesión con el token guardado

// const apiUrl = `${domainUrl}${route}`;
// const tokenApiUrl = `${domainUrl}${tokenRoute}`;

// export async function Signin(emailOrUsername, password) {
//   const token = await AsyncStorage.getItem("token");

//   if (token) {
//     // Si hay un token guardado, intentamos iniciar sesión con él
//     return loginWithToken(token);
//   } else {
//     // Si no hay token guardado, realizamos el inicio de sesión normalmente
//     return loginWithEmail(emailOrUsername, password);
//   }
// }

// async function loginWithToken(token) {
//   const response = await fetch(tokenApiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       token: token,
//     }),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     throw new Error(errorResponse.error);
//   }

//   const data = await response.json();

//   return data;
// }

// async function loginWithEmail(emailOrUsername, password) {
//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email_or_username: emailOrUsername,
//       password: password,
//     }),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     throw new Error(errorResponse.error);
//   }

//   const data = await response.json();

//   await AsyncStorage.setItem("token", data.token);

//   return data;
// }

//* de aqui para abajo es el el archivo 2v

// // import { domainUrl } from "../../host";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // const route = "/users/login";

// // const apiUrl = `${domainUrl}${route}`;

// // export async function Signin(emailOrUsername, password) {
// //   const response = await fetch(apiUrl, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       email_or_username: emailOrUsername,
// //       password: password,
// //     }),
// //   });

// //   if (!response.ok) {
// //     const errorResponse = await response.json();
// //     throw new Error(errorResponse.error);
// //   }

// //   const data = await response.json();

// //   await AsyncStorage.setItem("token", data.token);

// //   return data;
// // }

//* de aqui para abajo es el el archivo original

// import { domainUrl } from "../../host";

// const route = "/users/login";

// const apiUrl = `${domainUrl}${route}`;

// export async function Signin(emailOrUsername, password) {
//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email_or_username: emailOrUsername,
//       password: password,
//     }),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     throw new Error(errorResponse.error);
//   }

//   return await response.json();
// }
