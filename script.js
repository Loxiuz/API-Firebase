"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://first-78ee1-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  updatePostsTable();
  updateUsersTable();

  // createPost("image", "title", "body");
  // createUser("image", "mail", "name", "phone", "title");

  // const postObject = parseJSONString(
  //   '{"title": "This is my awesome title", "image": "https://share.cederdorff.com/images/petl.jpg" }'
  // );
  // console.log(postObject);

  // const stringObject = stringify({ name: "John", age: 30, city: "New York" });
  // console.log(stringObject);
}

/*-----------------Posts-----------------*/
async function getPosts() {
  console.log("Get Posts");
  //Fetches json element from Firebase
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  return prepareData(data);
}

function showPosts(posts) {
  console.log("Show posts");
  document.querySelector("#post_table").innerHTML = "";

  const htmlPostHeader = /*html*/ `
      <tr>
        <th id="post_image">Image:</th>
        <th id="post_title">Title:</th>
        <th id="post_description">Description:</th>
      </tr>
  `;
  document
    .querySelector("#post_table")
    .insertAdjacentHTML("beforeend", htmlPostHeader);

  function showPost(post) {
    //Shows data in html
    const htmlPostData = /*html*/ `
  <tr>
    <td><image src=${post.image}></td>
    <td>${post.title}</td>
    <td>${post.body}</td>
  </tr>
  `;
    document
      .querySelector("#post_table")
      .insertAdjacentHTML("beforeend", htmlPostData);
  }
  posts.forEach(showPost);
}

async function createPost(image, title, body) {
  console.log("Create post");
  const newPost = { image: image, title: title, body: body };
  console.log(newPost);
  const jsonString = JSON.stringify(newPost);
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: jsonString,
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  updatePostsTable();
}

async function updatePostsTable() {
  console.log("Update post table");
  const posts = await getPosts();
  showPosts(posts);
}

/*------------------Users------------------*/
async function getUsers() {
  console.log("Get Users");
  //Fetches json element from Firebase
  const response = await fetch(`${endpoint}/users.json`);
  const data = await response.json();
  return prepareData(data);
}

function showUsers(user) {
  console.log("Show users");
  document.querySelector("#user_table").innerHTML = "";

  const htmlUserHeader = /*html*/ `
    <tr>
      <th id="user_image">Image:</th>
      <th id="user_mail">Mail:</th>
      <th id="user_name">Name:</th>
      <th id="user_phone">Phone:</th>
      <th id="user_title">Title:</th>
    </tr>
  `;
  document
    .querySelector("#user_table")
    .insertAdjacentHTML("beforeend", htmlUserHeader);

  function showUser(user) {
    //Shows data in html
    const htmlUserData = /*html*/ `
  <tr>
    <td><image src=${user.image}></td>
    <td>${user.mail}</td>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.title}</td>
  </tr>
  `;
    document
      .querySelector("#user_table")
      .insertAdjacentHTML("beforeend", htmlUserData);
  }
  user.forEach(showUser);
}

async function createUser(image, mail, name, phone, title) {
  console.log("Creat user");
  const newUser = {
    image: image,
    mail: mail,
    name: name,
    phone: phone,
    title: title,
  };
  console.log(newUser);
  const jsonString = JSON.stringify(newUser);
  const response = await fetch(`${endpoint}/users.json`, {
    method: "POST",
    body: jsonString,
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  updateUsersTable();
}

async function updateUsersTable() {
  console.log("Update user table");
  const users = await getUsers();
  showUsers(users);
}

/*------------------Preparation------------------*/
function prepareData(dataObject) {
  console.log("Prepare Data");
  //Makes the json-object to an array
  let dataArray = [];
  for (const key in dataObject) {
    const data = dataObject[key];
    const id = key;
    dataArray.push(data);
  }
  return dataArray;
}
/*-----------------------------------------------*/
// function parseJSONString(jsonString) {
//   const parsed = JSON.parse(jsonString);
//   return parsed;
// }

// function stringify(object) {
//   const jsonString = JSON.stringify(object);
//   return jsonString;
// }
