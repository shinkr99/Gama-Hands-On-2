const container = document.querySelectorAll("#containerCards");
const url = "https://xp41-soundgarden-api.herokuapp.com/events";
const button = document.querySelector("#maisEventos");
let contador = 2;

function carregarPg() {
    fetch(url)
        .then((response) => response.json())
        .then(function (json) {
            let eventos = json;
            eventos.map(() => {
                htmlEventos = "";
                for (let i = 0; i < contador; i++) {
                    htmlEventos += `
        <article class="evento card p-5 m-3">
            <h2>${eventos[i].name} - ${eventos[i].scheduled.replace(":00.000Z", "")}</h2>
            <h4>${eventos[i].attractions}</h4>
            <p>${eventos[i].description}</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" data-bs-whatever="@getbootstrap">Reserve seu ingresso</button>

<div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><strong>Evento: </strong>${eventos[i].name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form id="newreserva">
      <div class="mb-3" >
          <label for="nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nome" aria-describedby="nome">
      </div>
      <div class="mb-3" >
          <label for="nome" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" aria-describedby="nome">
      </div>
      <div class="mb-3">
          <label for="lotacao" class="form-label">Quantidade de ingressos</label>
          <input type="number" class="form-control" id="lotacao" aria-describedby="lotacao">
      </div>
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary" onclick="novaReserva('${eventos[i]._id}')">Reservar Ingresso</button>
      </div>
    </div>
  </div>
</div>
        </article>
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

async function novaReserva(idreserva){

const formReserva = document.getElementById('newreserva');
formReserva.addEventListener('submit', evento => 

evento.preventDefault())

    let url = `https://xp41-soundgarden-api.herokuapp.com/bookings`

    let nome = formReserva.elements['nome'].value
    let email = formReserva.elements['email'].value
    let lotacao = formReserva.elements['lotacao'].value

   let novaReserva = {
    "owner_name": nome,
    "owner_email": email,
    "number_tickets": lotacao,
    "event_id": idreserva,
    }

    let request = new Request(url, {
        method: "POST",
        body: JSON.stringify(novaReserva),
        headers: new Headers ({
            'Content-type': 'application/json; charset=UTF-8'
        })
    })
    
   await fetch(request)
    .then(response => response.json()) 
    .then(json => console.log(json))
    .then(alert("Reservado"))
    .then(window.location.href = `${window.location.origin}/index.html`)
    .catch(err => console.log(err));
};

button.addEventListener("click", () => {
    contador += 6
    carregarPg()
})