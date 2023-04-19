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
//Fetches posts from Firebase
async function getPosts() {
  console.log("Get Posts");
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  return prepareData(data);
}

//Shows posts in html
function showPosts(posts) {
  console.log("Show posts");
  //Deletes content in table before adding new content to make sure it updates correctly
  document.querySelector("#post_table").innerHTML = "";

  const htmlPostHeader = /*html*/ `
      <tr>
        <th id="post_image">Image</th>
        <th id="post_title">Title</th>
        <th id="post_description">Description</th>
      </tr>
  `;
  document
    .querySelector("#post_table")
    .insertAdjacentHTML("beforeend", htmlPostHeader);

  //Shows data in html
  function showPost(post) {
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

//Creates new post from the structur of json
async function createPost(image, title, body) {
  console.log("Create post");
  const newPost = { image: image, title: title, body: body };
  console.log(newPost);
  //The object gets made to a JSON-string
  const jsonString = JSON.stringify(newPost);
  //Use of fetch to POST the json string
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: jsonString,
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  //Update to get the new post shown in the table
  updatePostsTable();
}

//Updates post table
async function updatePostsTable() {
  console.log("Update post table");
  const posts = await getPosts();
  showPosts(posts);
}

/*------------------Users------------------*/
//Fetches users from Firebase
async function getUsers() {
  console.log("Get Users");
  const response = await fetch(`${endpoint}/users.json`);
  const data = await response.json();
  return prepareData(data);
}

function showUsers(user) {
  console.log("Show users");
  //Deletes content in table before adding new content to make sure it updates correctly
  document.querySelector("#user_table").innerHTML = "";

  const htmlUserHeader = /*html*/ `
    <tr>
      <th id="user_image">Image</th>
      <th id="user_mail">Mail</th>
      <th id="user_name">Name</th>
      <th id="user_phone">Phone</th>
      <th id="user_title">Title</th>
    </tr>
  `;
  document
    .querySelector("#user_table")
    .insertAdjacentHTML("beforeend", htmlUserHeader);

  //Shows data in html
  function showUser(user) {
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

//Creates new user from the structur of json
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
  //The object gets made to a JSON-string
  const jsonString = JSON.stringify(newUser);
  //Use of fetch to POST the json string
  const response = await fetch(`${endpoint}/users.json`, {
    method: "POST",
    body: jsonString,
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  //Update to get the new user shown in the table
  updateUsersTable();
}

//Updates user table
async function updateUsersTable() {
  console.log("Update user table");
  const users = await getUsers();
  showUsers(users);
}

/*------------------Preparation------------------*/ 3;
//Makes the json-object to an array
function prepareData(dataObject) {
  console.log("Prepare Data");
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
