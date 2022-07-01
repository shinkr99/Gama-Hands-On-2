const form = document.getElementById('newEventForm');

form.addEventListener('submit', (event) => {
    event.preventDefault()

    let url = "https://xp41-soundgarden-api.herokuapp.com/events"

    let nome = form.elements['nome'].value
    let atracao = form.elements['atracoes'].value
    let descricao = form.elements['descricao'].value
    let data = form.elements['data'].value
    let lotacao = form.elements['lotacao'].value

   let novoEvento = {
        "name": nome,
        "poster": "link da imagem",
        "attractions": [
            atracao
        ],
        "description": descricao,
        "scheduled": data,
        "number_tickets": lotacao 
    }

    let request = new Request(url, {
        method: "POST",
        body: JSON.stringify(novoEvento),
        headers: new Headers ({
            'Content-type': 'application/json; charset=UTF-8'
        })
    })
    
    fetch(request)
    .then(response => response.json()) 
    .then(json => console.log(json))
    .then(alert("Alterado"))
    .then(window.location.href = `${window.location.origin}/admin.html`)
    .catch(err => console.log(err));
});

