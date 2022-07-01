const container = document.querySelectorAll(".table tbody");
const url = "https://xp41-soundgarden-api.herokuapp.com/events";
const button = document.querySelector("button");
let contador = 3;

function carregarPg() {
    fetch(url)
      .then((response) => response.json())
      .then(function (json) {
        let eventos = json;
        eventos.map(() => {
          htmlEventos = "";
          for (let i = 0; i < contador; i++) {
            htmlEventos += `
                <tr>
                  <th scope="row">${i + 1}</th>
                  <td>${eventos[i].scheduled}</td>
                  <td>${eventos[i].name}</td>
                  <td>${eventos[i].attractions}</td>
                  <td>
                      <a href="reservas.html?id=${eventos[i]._id}" class="btn btn-dark">ver reservas</a>
                      <a href="editar-evento.html?id=${eventos[i]._id}" class="btn btn-secondary">editar</a>
                      <a href="excluir-evento.html?id=${eventos[i]._id}" class="btn btn-danger">excluir</a>
                  </td>
                </tr>
                `;
          }
          container.forEach((element) => (element.innerHTML = htmlEventos));
        });
      })
      .catch(function () {
        console.log("error");
        alert("error");
      });
}

carregarPg();

button.addEventListener("click",() => {
    contador += 10
    carregarPg()
})


