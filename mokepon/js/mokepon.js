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
let opcionDeMokepones
let mascotaJugador
let mascotaEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
// HTML
let inputHipodoge
let inputCapipepo
let inputRatigueya
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
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)
// Ataques
let ataquesMascotas = {
    '🔥': `<button id="boton-fuego" class="boton-de-ataque boton-fuego">Fuego 🔥</button>`,
    '💧': `<button id="boton-agua" class="boton-de-ataque boton-agua">Agua 💧</button>`,
    '🌱': `<button id="boton-tierra" class="boton-de-ataque boton-tierra">Tierra 🌱</button>`
}

hipodoge.ataques.push(
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '🌱' },
    { nombre: '🔥' },
)
capipepo.ataques.push(
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '💧' },
    { nombre: '🔥' },
)
ratigueya.ataques.push(
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '💧' },
    { nombre: '🌱' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

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
    } else {
        alert('Selecciona una mascota')
    }
    extraerAtaques('JUGADOR')
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
}

function extraerAtaques(jugador) {
    let ataques
    for (let mokepon of mokepones) {
        if (mokepon.nombre === mascotaJugador) {
            ataques = mokepon.ataques
        }
    }
    mostrarAtaques(ataques, jugador)
}

function mostrarAtaques(ataques, jugador) {
    contenedorAtaques.innerHTML = ''
    ataques.forEach((ataque) => {
        contenedorAtaques.innerHTML += ataquesMascotas[ataque.nombre]
    })

    botonTierra = document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')

    secuenciaAtaques()
}

function secuenciaAtaques() {
    document.querySelectorAll('.boton-de-ataque').forEach((boton) => {
        boton.addEventListener('click', (e) => {
            console.log(e.target.classList)
            if (e.target.classList.contains('boton-tierra')) {
                ataqueJugador.push('TIERRA')
                ataqueTierra()
            }
            if (e.target.classList.contains('boton-fuego')) {
                ataqueJugador.push('FUEGO')
                ataqueFuego()
            }
            if (e.target.classList.contains('boton-agua')) {
                ataqueJugador.push('AGUA')
                ataqueAgua()
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
