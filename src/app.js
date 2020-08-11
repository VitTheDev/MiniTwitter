import { ui } from './ui';
import axios from 'axios';

// fetch data from db on app load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for addPost
document.querySelector('.post-submit').addEventListener('click', () => {
  if (ui.formState === 'add') {
    submitPost();
  } else {
    editPost();
  }
});

// listen for post deletion and edit
document.querySelector('#posts').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('fa-remove')) {
    const id = e.target.parentElement.id;
    deletePost(id);
  }
  if (e.target.classList.contains('fa-pencil')) {
    const id = e.target.parentElement.id;
    enableEdit(id);
  }
});

// get all the posts
async function getPosts() {
  await axios
    .get('http://localhost:3000/posts')
    .then((response) => ui.showPosts(response.data))
    .catch((err) => console.log(err));
}

// create a new post
async function submitPost() {
  console.log('inside create');
  const newPost = {
    id: Math.floor(Math.random() * 1000000),
    title: ui.titleInput.value,
    body: ui.bodyInput.value,
  };
  await axios
    .post('http://localhost:3000/posts', newPost)
    .then((res) => {
      if (res.status === 201) {
        ui.clearInputs();
        ui.showAlert('Post successfully added', 'alert-success');
        getPosts();
        hideMessage();
      }
    })
    .catch((err) => ui.showAlert(err.message, 'alert-danger'));
}

// delete post cia it's id
async function deletePost(id) {
  await axios
    .delete(`http://localhost:3000/posts/${id}`)
    .then((res) => {
      ui.showAlert('Post successfully removed', 'alert-warning');
      getPosts();
      hideMessage();
    })
    .catch((err) => {
      ui.showAlert(err.message, 'alert-danger');
    });
}

function hideMessage() {
  setTimeout(() => {
    ui.hideAlert();
  }, 1500);
}

// change form state from add to edit and fetch post to be edited
async function enableEdit(id) {
  await axios
    .get(`http://localhost:3000/posts/${id}`)
    .then((res) => {
      ui.fillFormWithEditData(res.data);
      ui.formState = 'edit';
      ui.changeFormState();
    })
    .catch((err) => ui.showAlert(err.message, 'alert-danger'));
}

// edit post fetched via enable edit
async function editPost() {
  console.log('inside edit');
  const id = ui.idInput.value;
  const editedPost = {
    id: id,
    title: ui.titleInput.value,
    body: ui.bodyInput.value,
  };
  await axios
    .patch(`http://localhost:3000/posts/${id}`, editedPost)
    .then((res) => {
      console.log(res);
      ui.formState = 'add';
      ui.changeFormState();
      ui.clearInputs();
      getPosts();
    })
    .catch((err) => ui.showAlert(err.message, 'alert-danger'));
}
