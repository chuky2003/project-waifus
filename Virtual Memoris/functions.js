const cartas=document.querySelector('#cartas')

function prueba(){
    cartas.innerHTML="";
    fetch(`${window.origin}/api/waifus`, {
        method: 'GET',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      
      .then(data => {
        for(let i=0;i<data.length;i++)
        cartas.innerHTML+=
        `<div class="card">
            <div class="face front">
                <img src=${data[i].imagen} alt="">
                <h3>Miku Nakano</h3>
            </div>
        <div class="face back">
                <h3>${data[i].nombre}</h3>
                <p>${data[i].info}<p>
            <div class="link">
                <a href="#">Details</a>
            </div>
        </div>`;
      })
}

prueba();