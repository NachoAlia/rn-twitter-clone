// const API_POST_URL = "http://192.168.1.200:3000/api/v1/users";

const API_USER_URL = "http://localhost:3000/api/v1/users";

export async function getUsers() {
  const response = await fetch(API_USER_URL);
  const users = await response.json();
  console.log("GET Users:");
  console.log(users);
  return users;
}

// export async function getPostById(postId) {
//   const response = await fetch(`${API_POST_URL}/${postId}`);
//   const post = await response.json();
//   console.log(`GET Post with ID ${postId}:`);
//   console.log(post);
//   return post;
// }

// export async function createPost(post) {
//   const requestInfo = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(post),
//   };
//   const response = await fetch(API_POST_URL, requestInfo);
//   const createdPost = await response.json();
//   console.log("POST New Post:");
//   console.log(createdPost);
//   return createdPost;
// }

// export async function updatePost(postId, post) {
//   const requestInfo = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(post),
//   };
//   const response = await fetch(`${API_POST_URL}/${postId}`, requestInfo);
//   const updatedPost = await response.json();
//   console.log(`PUT Update Post with ID ${postId}:`);
//   console.log(updatedPost);
//   return updatedPost;
// }

// export async function deletePost(postId) {
//   const requestInfo = {
//     method: "DELETE",
//   };
//   const response = await fetch(`${API_POST_URL}/${postId}`, requestInfo);
//   const deletedPost = await response.json();
//   console.log(`DELETE Post with ID ${postId}:`);
//   console.log(deletedPost);
//   return deletedPost;
// }
