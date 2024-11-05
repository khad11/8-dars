// querry selector orqali
const form = document.querySelector("form");
const template = document.querySelector("template");
const tbody = document.querySelector("tbody");

//malumotni local storagega saqlaymiz!!!!
let users = JSON.parse(localStorage.getItem("users")) ?? [];

//MAKE USERS yasab olamiz
const makeUsers = () => {
  tbody.innerHTML = "";
  users.forEach((user) => {
    const clone = template.content.cloneNode(true);
    const avatarImage = clone.querySelector(".avatar-image");
    const userName = clone.querySelector(".user-name");
    const age = clone.querySelector(".age");
    const bio = clone.querySelector(".bio");
    const deleteBtn = clone.querySelector(".delete-btn");
    deleteBtn.setAttribute("onclick", `deletebtn(${user.id})`);

    avatarImage.src = `https://picsum.photos/400?random=${Math.trunc(
      Math.random() * 1000
    )}`;
    userName.textContent = user.firstName;
    age.textContent = user.age;
    bio.textContent = `${user.bio.slice(0, 60)}...`;

    tbody.appendChild(clone);
  });
};

//malumotni oxchirish deleteni bosganda

const deletebtn = (e) => {
  const filteredUsers = users.filter((user) => user.id !== e);
  users = filteredUsers;
  makeUsers();
  localStorage.setItem("users", JSON.stringify(users));
};

//formni eshitamiz

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = form.firstName.value;
  const bio = form.bio.value;
  const age = Number(form.age.value);
  users.push({ id: Math.random(), firstName, age, bio });
  makeUsers();
  form.reset();
  localStorage.setItem("users", JSON.stringify(users));
});

//agar usersni llenghsi bolsa makeUsers funksiyani  chaqir
if (users.length) {
  makeUsers();
}
