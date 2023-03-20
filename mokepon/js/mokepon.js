const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionReiniciar = document.getElementById('reiniciar')
const sectionMensajes = document.getElementById('resultado')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

sectionReiniciar.style.display = 'none'

// Variables
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let ataqueEnemigoDisponible = []
let opcionDeMokepones
let mascotaJugador
let mascotaEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
// HTML
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputPydos
let inputTucapalma
let botonTierra
let botonFuego
let botonAgua

class Mokepon
{
    constructor(nombre, foto, vida)
    {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

// Mascotas
// Hipodoge
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
hipodoge.ataques.push(
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '🌱' },
    { nombre: '🔥' },
)
// Capipepo
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
capipepo.ataques.push(
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '💧' },
    { nombre: '🔥' },
)
// Ratigüeya
let ratigueya = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)
ratigueya.ataques.push(
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '💧' },
    { nombre: '🌱' },
)
// Langostelvis
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5)
langostelvis.ataques.push(
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '🌱' },
    { nombre: '🔥' },
)
// Pydos
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5)
pydos.ataques.push(
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '💧' },
    { nombre: '🌱' },
)
// Tucapalma
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5)
tucapalma.ataques.push(
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '💧' },
    { nombre: '🔥' },
)

// Ataques
let ataquesMascotas = {
    '🔥': {
        texto: 'FUEGO',
        clase: 'boton-fuego',
        html: `<button id="boton-fuego" class="boton-de-ataque boton-fuego">Fuego 🔥</button>`
    },
    '💧': {
        texto: 'AGUA',
        clase: 'boton-agua',
        html: `<button id="boton-agua" class="boton-de-ataque boton-agua">Agua 💧</button>`
    },
    '🌱': {
        texto: 'TIERRA',
        clase: 'boton-tierra',
        html: `<button id="boton-tierra" class="boton-de-ataque boton-tierra">Tierra 🌱</button>`
    },
    '🎐': {
        texto: 'AIRE',
        clase: 'boton-aire',
        html: `<button id="boton-aire" class="boton-de-ataque boton-aire">Aire 🎐</button>`
    }
}

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre.toLowerCase()}" />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre.toLowerCase()}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

    });

    inputHipodoge = document.getElementById(hipodoge.nombre.toLowerCase())
    inputCapipepo = document.getElementById(capipepo.nombre.toLowerCase())
    inputRatigueya = document.getElementById(ratigueya.nombre.toLowerCase())
    inputLangostelvis = document.getElementById(langostelvis.nombre.toLowerCase())
    inputPydos = document.getElementById(pydos.nombre.toLowerCase())
    inputTucapalma = document.getElementById(tucapalma.nombre.toLowerCase())
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = hipodoge.nombre
        mascotaJugador = hipodoge.nombre
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = capipepo.nombre
        mascotaJugador = capipepo.nombre
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = ratigueya.nombre
        mascotaJugador = ratigueya.nombre
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = langostelvis.nombre
        mascotaJugador = langostelvis.nombre
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = pydos.nombre
        mascotaJugador = pydos.nombre
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = tucapalma.nombre
        mascotaJugador = tucapalma.nombre
    } else {
        alert('Selecciona una mascota')
    }
    let ataques = extraerAtaques(mascotaJugador)
    mostrarAtaques(ataques)
    secuenciaAtaques()

    seleccionarMascotaEnemigo()
    ataques = extraerAtaques(mascotaEnemigo)
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)

    mascotaEnemigo = mokepones[mascotaAleatoria]
    ataqueEnemigoDisponible = [ ...mascotaEnemigo.ataques ]
    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre
}

function extraerAtaques(mascota) {
    let ataques
    for (let mokepon of mokepones) {
        if (mokepon.nombre === mascota) {
            ataques = mokepon.ataques
        }
    }
    return ataques
}

function mostrarAtaques(ataques) {
    contenedorAtaques.innerHTML = ''
    ataques.forEach((ataque) => {
        contenedorAtaques.innerHTML += ataquesMascotas[ataque.nombre].html
    })

    botonTierra = document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
}

function secuenciaAtaques() {
    document.querySelectorAll('.boton-de-ataque').forEach((boton) => {
        boton.addEventListener('click', (e) => {
            // Deshabilitar el boton del ataque
            e.target.disabled = true
            e.target.style.background = '#112f58'
            // Valida el tipo de ataque del boton
            if (e.target.classList.contains('boton-tierra')) {
                ataqueJugador.push('TIERRA')
            }
            if (e.target.classList.contains('boton-fuego')) {
                ataqueJugador.push('FUEGO')
            }
            if (e.target.classList.contains('boton-agua')) {
                ataqueJugador.push('AGUA')
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    let ataquesLength = ataqueEnemigoDisponible.length
    if (ataquesLength > 0) {
        let ataqueAleatorio = aleatorio(1, ataquesLength)
        let ataqueId = ataqueEnemigoDisponible[ataqueAleatorio - 1].nombre
        ataqueEnemigoDisponible.splice(ataqueAleatorio - 1, 1)
        ataqueEnemigo.push(ataquesMascotas[ataqueId].texto)
        iniciarPelea()
    }
}

function iniciarPelea() {
    if (ataqueJugador.length >= 5) {
        combate()
    }
}

function combate() {
    for (let index = 0, len = ataqueJugador.length; index <= len - 1; index++) {
        let ataqueJugadorTemporal = ataqueJugador[index]
        let ataqueEnemigoTemporal = ataqueEnemigo[index]
        if (ataqueEnemigoTemporal == ataqueJugadorTemporal) {
            crearMensaje("EMPATE", index)
        } else if(ataqueJugadorTemporal == 'FUEGO' && ataqueEnemigoTemporal == 'TIERRA') {
            crearMensaje("GANASTE", index)
            victoriasJugador++
            vidasEnemigo--
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugadorTemporal == 'AGUA' && ataqueEnemigoTemporal == 'FUEGO') {
            crearMensaje("GANASTE", index)
            victoriasJugador++
            vidasEnemigo--
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugadorTemporal == 'TIERRA' && ataqueEnemigoTemporal == 'AGUA') {
            crearMensaje("GANASTE", index)
            victoriasJugador++
            vidasEnemigo--
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            crearMensaje("PERDISTE", index)
            victoriasEnemigo++
            vidasJugador--
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        revisarVidas()
    }
}

function revisarVidas() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal('Empataron')
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado, indexAtaque) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador[indexAtaque]
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo[indexAtaque]

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
