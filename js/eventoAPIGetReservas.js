const container = document.querySelectorAll(".table tbody");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getId = urlParams.get("id");
const url = `https://xp41-soundgarden-api.herokuapp.com/bookings/event/${getId}`;
const button = document.querySelector("button");

function carregarPg() {
    fetch(url)
      .then((response) => response.json())
      .then(function (json) {
        let eventos = json;
        if (eventos.length == 0){
          window.alert("Sem Reservas")
        }
        eventos.map(() => {
          htmlEventos = "";
          for (let i = 0; i < eventos.length; i++) {
            htmlEventos += `
                <tr>
                  <th scope="row">${i + 1}</th>
                  <td>${eventos[i].owner_name}</td>
                  <td>${eventos[i].owner_email}</td>
                  <td>${eventos[i].number_tickets}</td>
                  <td>
                      <button onclick = apagarIngresso("${eventos[i]._id}") id = "delEventForm" class="btn btn-danger">excluir</button>
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
function apagarIngresso(idIngresso){
  
    let url = `https://xp41-soundgarden-api.herokuapp.com/bookings/${idIngresso}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(alert("Ingresso Deletado"))
      .then(window.location.reload(true))
      .catch((err) => console.log(err));
}