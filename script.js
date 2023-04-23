"use strict";

window.addEventListener("load", start);

const endpoint =
  "https://first-78ee1-default-rtdb.europe-west1.firebasedatabase.app";

async function start() {
  updatePostsGrid();
  updateUsersTable();

  document
    .querySelector(".header-create-post-btn button")
    .addEventListener("click", showCreatePostDialog);
}

/*-----------------Posts-----------------*/

//Show dialog for create post
function showCreatePostDialog() {
  console.log("Show create post dialog");
  const dialog = document.querySelector("dialog");
  //To avoid duplication html elements
  dialog.innerHTML = "";
  //HTML for the dialog
  const dialogHtml = /* html */ `
      <h2>Create Post</h2>
      <form id="dialog-form">
        <label for="image">Image (link):</label><br>
        <input type="text" name="image" id="form_image_input"><br><br>
        <label for="title">Title:</label><br>
        <input type="text" name="title" id="form_title_input"><br><br>
        <label for="body">Body:</label><br>
        <input type="text" name="body" id="form_body_input"><br><br><br>
        <input type="button" id="submit-btn" value="Create" onClick="submitCreateBtnClicked(this.form)">
      </form>
      <button id="close-btn">Close</button>
  `;

  dialog.insertAdjacentHTML("beforeend", dialogHtml);
  dialog.showModal();

  //Event for the close button in create post dialog which closes the dialog
  document.querySelector("dialog #close-btn").addEventListener("click", () => {
    document.querySelector("dialog").close();
  });
}
//When the submit button is clicked in the create post dialog
async function submitCreateBtnClicked(form) {
  console.log("Submit create button clicked");
  //Get the values from the input form
  const image = form.image;
  const title = form.title;
  const body = form.body;

  //Confirm the input values aren't empty
  if (image.value == "" || title.value == "" || body.value == "") {
    for (const element of [image, title, body]) {
      document.getElementById(`form_${element.name}_input`).placeholder =
        "Can't be empty";
    }
  } else {
    //Create a post with the values from the input
    await createPost(image.value, title.value, body.value);
    document.querySelector("dialog").close();
  }
}
//Show dialog for update post
function showUpdatePostDialog(post) {
  console.log("Show update post dialog");
  const dialog = document.querySelector("dialog");
  //To avoid duplication html elements
  dialog.innerHTML = "";
  //HTML for the dialog
  const dialogHtml = /* html */ `
      <h2>Update Post</h2>
      <form id="dialog-form">
        <label for="image">Image (link):</label><br>
        <input type="text" name="image" id="form_image_input"><br><br>
        <label for="title">Title:</label><br>
        <input type="text" name="title" id="form_title_input"><br><br>
        <label for="body">Body:</label><br>
        <input type="text" name="body" id="form_body_input"><br><br><br>
        <input type="button" id="submit-btn" value="Update"> 
      </form>
      <button id="close-btn">Close</button>
  `;

  dialog.insertAdjacentHTML("beforeend", dialogHtml);
  dialog.showModal();

  //Click event for the submit button in update post dialog
  const form = document.querySelector("#dialog-form");
  document
    .querySelector("#dialog-form #submit-btn")
    .addEventListener("click", () => {
      submitUpdateBtnClicked(form, post);
    });

  //Event for the close button in update post dialog which closes the dialog
  document.querySelector("dialog #close-btn").addEventListener("click", () => {
    document.querySelector("dialog").close();
  });
}
//When the submit button is clicked in the update post dialog
async function submitUpdateBtnClicked(form, post) {
  /* The form parameter is for the input values 
     and the post parameter is for the current values on the current post */
  console.log("Submit update button clicked");

  // Parse the stringified post object
  // const post = JSON.parse(JSONpost);

  //Get the values from the input form
  let image = form.image.value;
  let title = form.title.value;
  let body = form.body.value;

  //Checks if input is empty and if so will not change the current value
  if (image == "") {
    image = post.image;
  }
  if (title == "") {
    title = post.title;
  }
  if (body == "") {
    body = post.body;
  }
  //Update the post with the values
  await updatePost(post.id, image, title, body);
  document.querySelector("dialog").close();
}

//Fetches posts from endpoint (Firebase)
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
  document.querySelector(".post-grid").innerHTML = "";

  //Shows data in html
  function showPost(post) {
    const htmlPostData = /*html*/ `
      <div class="post-item">
        <div><image src=${post.image}></>
        <div id="post_title">${post.title}</div>
        <div id="post_body">${post.body}</div>
        <button id="delete-btn">Delete</button>
        <button id="update-btn">Update</button>
      </div>
      `;
    document
      .querySelector(".post-grid")
      .insertAdjacentHTML("beforeend", htmlPostData);

    //Click events for delete and update buttons
    document
      .querySelector(".post-grid .post-item:last-child #delete-btn")
      .addEventListener("click", deleteClicked);
    document
      .querySelector(".post-grid .post-item:last-child #update-btn")
      .addEventListener("click", () => {
        showUpdatePostDialog(post);
      });

    //When delete button is clicked
    async function deleteClicked() {
      console.log("Delete clicked");
      await deletePost(post.id);
    }
  }
  posts.forEach(showPost);
}

//Creates new post from the json structure
async function createPost(image, title, body) {
  console.log("Create post");
  const newPost = { image, title, body };
  //The object gets made to a JSON-string
  const jsonString = JSON.stringify(newPost);
  //Use of fetch to POST the json string
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: jsonString,
  });
  //Update to get the new post shown in the table
  if (response.ok) {
    console.log("creation successful");
    updatePostsGrid();
  }
}

//Delete post by id
async function deletePost(id) {
  console.log("Delete post");
  //Calling fetch to make a request with DELETE on specified object
  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "DELETE",
  });
  //Only updates table if the response is successful
  if (response.ok) {
    console.log("Deletion successful");
    updatePostsGrid();
  }
}

//Update content of a post by id
async function updatePost(id, image, title, body) {
  const postToUpdate = { image, title, body }; //post to update
  const jsonString = JSON.stringify(postToUpdate); //Javascript object to JSON string
  //Fetch PUT request with the specified element(id)
  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "PUT",
    body: jsonString,
  });
  //Only updates table if response is successful
  if (response.ok) {
    console.log("Update successful");
    updatePostsGrid();
  }
}

//Updates post table
async function updatePostsGrid() {
  console.log("Update posts");
  const posts = await getPosts();
  showPosts(posts);
}

/*------------------Preparation of data------------------*/

//Prepares data by making the json-object to an array
function prepareData(dataObject) {
  console.log("Prepare Data");
  let dataArray = [];
  for (const key in dataObject) {
    const data = dataObject[key];
    data.id = key;
    dataArray.push(data);
  }
  return dataArray;
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
  document.querySelector(".user-table").innerHTML = "";

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
    .querySelector(".user-table")
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
      .querySelector(".user-table")
      .insertAdjacentHTML("beforeend", htmlUserData);
  }
  user.forEach(showUser);
}

//Creates new user from the structur of json
async function createUser(image, mail, name, phone, title) {
  console.log("Creat user");
  const newUser = { image, mail, name, phone, title };
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
