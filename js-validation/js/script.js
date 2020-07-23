const form = document.querySelector("form");
const name = document.querySelector('input[type="text"]');
const email = document.querySelector('input[type="email"]');
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");

function showError(input, mess) {
  const parent = input.parentElement;
  parent.className = "error";
  const puncture = parent.querySelector(".err-messages");
  puncture.textContent = mess;
  puncture.style.display = "block";

  const timer = setTimeout(() => {
    puncture.style.display = "none";
    parent.className = "";
    clearTimeout(timer);
  }, 2000);
}

function done(input) {
  let parent = input.parentElement;
  parent.className = "Done";

  const timer = setTimeout(() => {
    parent.style.display = "Reset";
    parent.className = "";
    clearTimeout(timer);
  }, 5000);
}

function checkEmail(input) {
  let alt = /^\S+@\S+\.\S+$/;

  alt.test(input.value.trim())
    ? done(input)
    : showError(input, `This email does not exist!`);
}

function checkReq(Arr) {
  Arr.forEach((input) => {
    input.value.trim() === ""
      ? showError(input, `Confirm is required!`)
      : done(input);
  });
}

function checked(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must contain at least ${min} characters!`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters!`
    );
  } else {
    done(input);
  }
}

function checkPasswordsMatch(input, input2) {
  if (input.value !== input2.value) showError(input2, `Passwords don't match`);
}

function getFieldName(input) {
  return input.previousElementSibling.textContent;
}

form.addEventListener("submit", (eqw) => {
  eqw.preventDefault();
  checkReq([email, password2]);
  checked(name, 3, 10);
  checked(password, 6, 15);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
