"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://first-78ee1-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const posts = await getPosts();
  const users = await getUsers();
  showPosts(posts);
  showUsers(users);

  const postObject = parseJSONString(
    '{"title": "This is my awesome title", "image": "https://share.cederdorff.com/images/petl.jpg" }'
  );
  console.log(postObject);

  const stringObject = stringify({ name: "John", age: 30, city: "New York" });
  console.log(stringObject);
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
  posts.forEach(showPost);

  function showPost(post) {
    //Shows data in html
    const html = /*html*/ `
  <tr>
    <td><image src=${post.image}></td>
    <td>${post.title}</td>
    <td>${post.body}</td>
  </tr>
  `;
    document.querySelector("#data_table").insertAdjacentHTML("beforeend", html);
  }
}

function createPost(title, image, body) {}

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
  user.forEach(showUser);

  function showUser(user) {
    //Shows data in html
    const html = /*html*/ `
  <tr>
    <td><image src=${user.image}></td>
    <td>${user.mail}</td>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.title}</td>
  </tr>
  `;
    document.querySelector("#user_table").insertAdjacentHTML("beforeend", html);
  }
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

function parseJSONString(jsonString) {
  const parsed = JSON.parse(jsonString);
  return parsed;
}

function stringify(object) {
  const jsonString = JSON.stringify(object);
  return jsonString;
}
