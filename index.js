let users = [
          {
                    id: "123456789",
                    createdDate: "2021-01-06T00:00:00.000Z",
                    status: "En validation",
                    firstName: "Mohamed",
                    lastName: "Taha",
                    userName: "mtaha",
                    registrationNumber: "2584",
          },
          {
                    id: "987654321",
                    createdDate: "2021-07-25T00:00:00.000Z",
                    status: "Validé",
                    firstName: "Hamid",
                    lastName: "Orrich",
                    userName: "horrich",
                    registrationNumber: "1594",
          },
          {
                    id: "852963741",
                    createdDate: "2021-09-15T00:00:00.000Z",
                    status: "Rejeté",
                    firstName: "Rachid",
                    lastName: "Mahidi",
                    userName: "rmahidi",
                    registrationNumber: "3576",
          }
]

var form = document.querySelector('form');



var serializeForm = function (form) {
          var obj = {};
          var formData = new FormData(form);
          for (var key of formData.keys()) {
                    obj[key] = formData.get(key);
          }
          return obj;
};

var myList = document.getElementById("table-container");

const displayUsers = () => { 
          users.map((user, index) => {
                    var li = document.createElement("li");
                    li.setAttribute("class", "table-content");
                    li.setAttribute("key", index);
                    Object.keys(user).map((key, index) => {
                              var data_container = document.createElement("div");
                              var data = document.createElement("div");
                              if (key == "status") {
                                        data_container.setAttribute('class', 'data-container-badge');
                                        data.appendChild(document.createTextNode(user[key].split('T')[0].replaceAll("-", "/")));
                                        if (user[key] == "En validation")
                                                  data.setAttribute('class', 'Actif on-validation');
                                        else if (user[key] == "Rejeté")
                                                  data.setAttribute('class', 'Actif rejected');
                                        else if (user[key] == "Validé")
                                                  data.setAttribute('class', 'Actif valide');
                              }
                              else if (key == "createdDate") {
                                        data_container.setAttribute('class', 'data-container');
                                        data.appendChild(document.createTextNode(user[key].split('T')[0].replaceAll("-", "/")));
                                        data.setAttribute('class', 'data');
                              }
                              else {
                                        data_container.setAttribute('class', 'data-container');
                                        data.setAttribute('class', 'data');
                                        data.appendChild(document.createTextNode(user[key]));
                              }
                              data_container.appendChild(data);
                              li.appendChild(data_container);
                    })
                    var data_container = document.createElement("div");
                    data_container.setAttribute('class', 'data-container-trash');
                    var data = document.createElement("button");
                    data.setAttribute('class', 'data-button');
                    data.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
                    data_container.appendChild(data);
                    li.appendChild(data_container);

                    myList.appendChild(li);

          });
}
displayUsers();

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
let removeButton = document.querySelectorAll('.data-button');

document.addEventListener('submit', function (event) {
          // Prevent form from submitting to the server
          event.preventDefault();
          var divs = document.querySelectorAll('.table-content');
          divs.forEach(div => {
                    div.remove();
          });
          // Do some stuff...
          var data = serializeForm(form)
          users.push({
                    id: JSON.stringify(Math.floor(Math.random() * 1000000000)),
                    createdDate: data.date,
                    status: data.etat,
                    firstName: data.prenom,
                    lastName: data.nom,
                    userName: data.username,
                    registrationNumber: data.mac,
          })
          console.log(users);
          displayUsers();
          closeModal(modal);
          removeButton = document.querySelectorAll('.data-button');
          console.log(removeButton)
          removeButton.forEach(button => {
                    button.addEventListener('click', function (event) {
                              var row = event.target.parentElement.parentElement.parentElement;
                              console.log("row",row);
                              console.log("key",row.getAttribute('key'));
                              users.splice(row.getAttribute('key'), 1);
                              console.log("users",users);
                              row.remove();
                    })
          })

});

openModalButtons.forEach(button => {
          button.addEventListener('click', () => {
                    const modal = document.querySelector(button.dataset.modalTarget)
                    openModal(modal)
          })
})

overlay.addEventListener('click', () => {
          const modals = document.querySelectorAll('.modal.active')
          modals.forEach(modal => {
                    closeModal(modal)
          })
})

closeModalButtons.forEach(button => {
          button.addEventListener('click', () => {
                    const modal = button.closest('.modal')
                    closeModal(modal)
          })
})

function openModal(modal) {
          if (modal == null) return
          modal.classList.add('active')
          overlay.classList.add('active')
}

function closeModal(modal) {
          if (modal == null) return
          modal.classList.remove('active')
          overlay.classList.remove('active')
}

removeButton.forEach(button => {
          button.addEventListener('click', function (event) {
                    var row = event.target.parentElement.parentElement.parentElement;
                    console.log("row",row);
                    console.log("key",row.getAttribute('key'));
                    users.splice(row.getAttribute('key'), 1);
                    console.log("users",users);
                    row.remove();
          })
})