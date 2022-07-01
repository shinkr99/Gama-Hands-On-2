const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getId = urlParams.get("id");
console.log(getId);

async function carregarEvento() {
  await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${getId}`)
    .then((resp) => resp.json())
    .then(function (json) {
      let evento = json;
      document.getElementById("nome").value = evento.name;
      document.getElementById("banner").value = evento.poster;
      document.getElementById("atracoes").value = evento.attractions;
      document.getElementById("descricao").value = evento.description;
      document.querySelector('#data').value = evento.scheduled.replace(":00.000Z", "")
      document.getElementById("lotacao").value = evento.number_tickets;
    })
    .catch(function () {
      console.log("error");
      alert("error");
    });
}

carregarEvento();

const form = document.getElementById("delEventForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let url = `https://xp41-soundgarden-api.herokuapp.com/events/${getId}`;

  fetch(url, {
    method: 'DELETE'
  })
    .then(alert("DELETADO"))
    .then(window.location.href = `${window.location.origin}/admin.html`)
    .catch((err) => console.log(err));
});
