import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const route = "/users/login";

const apiUrl = `${domainUrl}${route}`;

export async function Signin(emailOrUsername, password) {
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
