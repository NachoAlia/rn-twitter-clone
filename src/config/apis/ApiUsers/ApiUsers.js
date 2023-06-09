const API_POST_URL = "http://192.168.1.200:3000/api/v1/users";

// const API_USER_URL = "http://localhost:3000/api/v1/users";

export async function getUsers() {
  const response = await fetch(API_USER_URL);
  const users = await response.json();
  console.log("GET Users:");
  console.log(users);
  return users;
}
