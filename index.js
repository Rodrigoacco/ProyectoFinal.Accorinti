//PELICULAS
/////////////////////////////////////////////////////////////////////////

const formLogin = document.querySelector("#login")
const inputUser = document.querySelector("#input-user")
const inputPass = document.querySelector("#input-pass")
const loginIncorrecto = document.querySelector("#logint")
const contenedorForm = document.querySelector(".box")
const logout = document.querySelector("#logout")
const botonModos = document.querySelector("#claro-oscuro")
const body = document.querySelector(".modo-claro")
const inicio = document.querySelector("#inicio")
const busqueda = document.querySelector(".buscador")
const contenedor = document.querySelector(".movie")
let inputBusqueda = document.querySelector("#search")
const navegador = document.querySelector(".navegation")
const apiKey = "d2119c45b88e1c632166d214bd44773a"
let paginado = 1
const primerPagina = document.querySelector("#primerPagina")
const atras = document.querySelector("#atras")
const siguiente = document.querySelector("#siguiente")
const ultimaPagina = document.querySelector("#ultimaPagina")
const spinner = document.querySelector("#spinner")

/////////////////////////////////////////////////////////////////////////

botonModos.onclick = () => {
    body.classList.toggle("modo-oscuro")
    if (body.className === "modo-claro modo-oscuro"){
        botonModos.textContent = "Modo Claro"
    } else {
        botonModos.textContent = "Modo Oscuro"
    }
}

/////////////////////////////////////////////////////////////////////////

const datosUsuario = {
    user: "rodrigo",
    password: "rodrigo123"
}

const subirAlLs = ( clave, valor ) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const obtenerDelLs = ( clave ) => {
    return JSON.parse(localStorage.getItem(clave))
}

/////////////////////////////////////////////////////////////////////////

formLogin.onsubmit = ( event ) => {
    event.preventDefault()
    if ( inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password ) {
        subirAlLs("login", true)
        swal({
            title: "¡Bienvenido!",
            icon: "success",
        });
        contenedorForm.style.display = "none"  
        logout.style.display = "block" 
        contenedor.style.display = "flex"
        busqueda.style.display = "flex"
        navegador.style.display = "flex"
        inicio.style.display = "flex"
    } else {        
        loginIncorrecto.style.display = "block"
        busqueda.style.display = "none"
        logout.style.display = "none"
        contenedor.style.display = "none"
        navegador.style.display = "none"
        inicio.style.display = "none"
        contenedorForm.reset();
    }

}

/////////////////////////////////////////////////////////////////////////

function validarLogin ( clave ) {
    if ( clave !== true ) {
        contenedorForm.style.display = "flex"
        logout.style.display = "none" 
        busqueda.style.display = "none"
        logout.style.display = "none"
        contenedor.style.display = "none"
        navegador.style.display = "none"
        inicio.style.display = "none"
    } else {
        contenedorForm.style.display = "none"  
        logout.style.display = "block" 
        contenedor.style.display = "flex"
        busqueda.style.display = "flex"
        navegador.style.display = "flex"
        inicio.style.display = "flex"
    }
    
}

validarLogin(obtenerDelLs("login"))

/////////////////////////////////////////////////////////////////////////

logout.onclick = () => {
    localStorage.removeItem( "login" )
    validarLogin(obtenerDelLs("login"))
    formLogin.reset()
    location.reload()
}

/////////////////////////////////////////////////////////////////////////

const cards = (array) => {
    const nodos = array.reduce((acc, element) => {
        return acc + `
            <div class="movies">
            <img class= "imagenPeliculas" src="https://image.tmdb.org/t/p/original${element.poster_path}" alt=${element.title}>

            <a href="/Section/info.html" id="boton-${element.id}" class="boton-card">
                Información
            </a>
            </div>
        `
    }, "")
    contenedor.innerHTML = nodos
    
}

let peliculas = []

const aniadirInfo = (array) => {
    const botonAniadir = document.querySelectorAll(".boton-card")
    botonAniadir.forEach( boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)
            const filtrarPeli = array.find((elemento) => {
                return elemento.id === Number(id)
            })
            peliculas.push(filtrarPeli)   
            console.log(peliculas)
            localStorage.setItem("peliculas", JSON.stringify(peliculas))
        }
        
    })
}

const peliculasElegidas = JSON.parse(localStorage.getItem("peliculas"))
peliculas = peliculasElegidas || []

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${paginado}`)
.then( respuesta => respuesta.json())
.then( data => {
    console.log(data)
    cards(data.results)
    spinner.style.display = "none"
    aniadirInfo(data.results)
})
.catch((error) => console.log(error))



/////////////////////////////////////////////////////////////////////////

inicio.onclick = () => {
    spinner.style.display = "block"
    if( paginado !==1 ){
        paginado = 1
        primerPagina.disabled = true
        atras.disabled = true
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        cards(data.results)
        spinner.style.display = "none"
    })
}

/////////////////////////////////////////////////////////////////////////

busqueda.onsubmit = (e) => {
    e.preventDefault()
    spinner.style.display = "block"
    fetch(`https://api.themoviedb.org/3/search/movie?query=${inputBusqueda.value}&api_key=${apiKey}&language=es-ES&page=${paginado}&include_adult=false`)
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        cards(data.results)
        spinner.style.display = "none"
    })
}

/////////////////////////////////////////////////////////////////////////

primerPagina.onclick = () => {
    spinner.style.display = "block"
    if( paginado !==1 ){
        paginado = 1
        ultimaPagina.disabled = false
        siguiente.disabled = false
    }else if( paginado === 1 ){
        primerPagina.disabled = true
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        cards(data.results)
        spinner.style.display = "none"
    })
}

/////////////////////////////////////////////////////////////////////////

atras.onclick = () => {
    spinner.style.display = "block"
    if( paginado !==1){
        paginado--
        ultimaPagina.disabled = false
        siguiente.disabled = false
    }else if( paginado === 1){
        atras.disabled = true
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        cards(data.results)
        spinner.style.display = "none"
    })
}

/////////////////////////////////////////////////////////////////////////

siguiente.onclick = () => {
    spinner.style.display = "block"
    if( paginado !==500 ){
        paginado++
        primerPagina.disabled = false
        atras.disabled = false
    }else if( paginado === 500 ){
        siguiente.disabled = true
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        cards(data.results)
        spinner.style.display = "none"
    })
}

/////////////////////////////////////////////////////////////////////////

ultimaPagina.onclick = () => {
    spinner.style.display = "block"
    if( paginado !==500 ){
        paginado = 500
        primerPagina.disabled = false
        atras.disabled = false
    }else if( paginado === 500 ){
        ultimaPagina.disabled = true
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        cards(data.results)
        spinner.style.display = "none"
    })
}

/////////////////////////////////////////////////////////////////////////