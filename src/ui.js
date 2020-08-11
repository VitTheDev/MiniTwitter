class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.alert = document.getElementById('message');
    this.formState = 'add';
  }
  // show all posts
  showPosts(posts) {
    let output = '';
    posts.reverse().map((post) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" id=${post.id}>
            <i class="fa fa-pencil"></i>
          </a>
          
          <a href="#" class="delete card-link" id=${post.id}>
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });

    this.post.innerHTML = output;
  }
  // reset the value of all inputs
  clearInputs() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.idInput.value = '';
  }
  // show a status message to user after an action has been performed
  showAlert(message, type) {
    console.log('showing');
    this.alert.classList.add(`${type}`);
    this.alert.classList.remove('hidden');
    this.alert.textContent = `${message}`;
  }
  // hide message from user
  hideAlert() {
    this.alert.classList.add('hidden');
  }
  // fill form inputs with fetched post data
  fillFormWithEditData(data) {
    console.log(data.title);
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
  }

  changeFormState() {
    if (this.formState === 'edit') {
      this.postSubmit.textContent = 'Update Post';
    } else {
      this.postSubmit.textContent = 'Add Post';
    }
  }
}

export const ui = new UI();
