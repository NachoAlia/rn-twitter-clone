import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logoutRoute = "/users/logout";
const logoutApiUrl = `${domainUrl}${logoutRoute}`;

export async function Signout() {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    try {
      console.log(`antes: ${token}`);
      await logout(token);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to sign out");
    }
    console.log(`despues: ${token}`);
  }

  await AsyncStorage.removeItem("token");
}

async function logout(token) {
  const response = await fetch(logoutApiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }
}
