'use script';

function init() {
  const formContainer = document.querySelector('.customer__main');
  const infoContainer = document.querySelector('.info');
  let nameInput = document.querySelector('input[name="name"]');
  let surnameInput = document.querySelector('input[name="surname"]');
  let mailInput = document.querySelector('input[name="mail"]');
  let phoneInput = document.querySelector('input[name="phone"]');
  let innInput = document.querySelector('input[name="inn"]');


  formContainer.addEventListener('submit', e => {
    e.preventDefault()
    infoContainer.querySelector('.info__name').textContent = nameInput.value.trim();
    infoContainer.querySelector('.info__surname').textContent = surnameInput.value.trim();
    infoContainer.querySelector('.info__mail').textContent = mailInput.value.trim();
    infoContainer.querySelector('.info__phone').textContent = phoneInput.value.trim();
    infoContainer.querySelector('.info__inn').textContent = innInput.value.trim();

    infoContainer.classList.remove('invisible');

  })
}


init();
