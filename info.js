let infoDelLs = JSON.parse(localStorage.getItem("peliculas"))

const cards = ( array ) => {
    const generarNodos = array.reduce(( acc, element) => {
        return acc + `
            <div class="modal">
                <h1>
                    ${element.original_title}
                </h1>                
                <p>
                    ${element.overview}
                </p>
                <a href="/index.html" id="boton-${element.id}" class="boton-card1">
                    Cerrar Información
                </a>
            </div>
        `
    }, "")

    document.querySelector(".modal-container").innerHTML = generarNodos
}

cards(infoDelLs || [])

function borrarInfo (array) {
    const botonAniadir = document.querySelectorAll(".boton-card1")    
    botonAniadir.forEach( boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)            
            const filtrarProducto = array.filter((elemento, i) => {
                return elemento.id != Number(id)
            })
            infoDelLs = filtrarProducto
            localStorage.setItem("peliculas", JSON.stringify(infoDelLs))
            console.log(infoDelLs)    
            cardHtml(infoDelLs)
            borrarInfo(infoDelLs)       
        }
        
    })
}

borrarInfo(infoDelLs)
