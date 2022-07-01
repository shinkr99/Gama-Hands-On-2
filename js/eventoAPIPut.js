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

const form = document.getElementById("editEventForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let url = `https://xp41-soundgarden-api.herokuapp.com/events/${getId}`;

  let nome = form.elements["nome"].value;
  let banner = form.elements["banner"].value;
  let atracao = form.elements["atracoes"].value;
  let descricao = form.elements["descricao"].value;
  let data = form.elements["data"].value;
  let lotacao = form.elements["lotacao"].value;

  let eventoEditado = {
    name: nome,
    poster: banner,
    attractions: [atracao],
    description: descricao,
    scheduled: data,
    number_tickets: lotacao,
  };

  let request = new Request(url, {
    method: "PUT",
    body: JSON.stringify(eventoEditado),
    headers: new Headers({
      "Content-type": "application/json; charset=UTF-8",
    }),
  });

  fetch(request)
    .then((response) => response.json())
    .then(alert("Alterado"))
    .then(window.location.href = `${window.location.origin}/admin.html`)
    .catch((err) => console.log(err));
});
