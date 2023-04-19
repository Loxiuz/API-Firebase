"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://first-78ee1-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  const posts = await getPosts();
  showPosts(posts);
}

async function getPosts() {
  console.log("Get Posts");
  //Fetches json element from Firebase
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  return preparePostData(data);
}

function preparePostData(dataObject) {
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

function showPosts(posts) {
  console.log("Show data");
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
