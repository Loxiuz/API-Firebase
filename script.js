"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://first-78ee1-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  showData(await getPosts());
}

async function getPosts() {
  console.log("Get Posts");
  //Fetches json element from Firebase using get
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  return preparePostData(data);
}
function preparePostData(dataObject) {
  console.log("Prepare Post Data");
  //Makes the json-object to an array
  let dataArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    const id = key;
    dataArray.push(post);
  }
  return dataArray;
}
function showData(data) {
  console.log("Show data");
  //Shows data in html
  for (const post of data) {
    const html = /*html*/ `
  <tr>
    <td><image src=${post.image}></td>
    <td>${post.title}</td>
  </tr>
  `;
    document.querySelector("#data_table").insertAdjacentHTML("beforeend", html);
  }
}
