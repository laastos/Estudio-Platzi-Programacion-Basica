// Mascotas
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const botonMascotaJugador = document.getElementById('boton-mascota')
// Mapa
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
// Controles
const sectionReiniciar = document.getElementById('reiniciar')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionMensajes = document.getElementById('resultado')
// Ataques
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
// Mascotas seleccionadas
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
// Vidas / Victorias
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
// Log de ataques
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
// Constantes
let intervaloTiempo = 50

// Variables
let jugadorId
let enemigoId
let mokepones = []
let mokeponesEnemigos = []
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
// Canva
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let anchoMapaMaximo = 350
let anchoMapa = (window.innerWidth - 20 > anchoMapaMaximo) ? anchoMapaMaximo - 20 : window.innerWidth - 20
let altoMapa = anchoMapa * 600 / 800

// Inicializacion
sectionReiniciar.style.display = 'none'

class Mokepon
{
    constructor(nombre, foto, vida, fotoMapa, id = null)
    {
        this.id = undefined
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        // Ubicacion
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.velocidadX = 0
        this.velocidadY = 0
        // Lienzo
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
    }

    asignarId(id) {
        this.id = id
    }

    asignarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )    
    }
}

// Mascotas
// Hipodoge
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.webp')
HIPODOGE_ATAQUES = [
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '🌱' },
    { nombre: '🔥' }
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)
// Capipepo
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp')
CAPIPEPO_ATAQUES = [
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '💧' },
    { nombre: '🔥' },
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
// Ratigüeya
let ratigueya = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.webp')
RATIGUEYA_ATAQUES = [
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '💧' },
    { nombre: '🌱' }
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

// Langostelvis
/*let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5)
LANGOSTELVIS_ATAQUES = [
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '💧' },
    { nombre: '🌱' },
    { nombre: '🔥' },
]
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)*/
// Pydos
/*let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5)
PYDOS_ATAQUES = [
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '🔥' },
    { nombre: '💧' },
    { nombre: '🌱' },
]
pydos.ataques.push(...PYDOS_ATAQUES)*/
// Tucapalma
/*let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5)
TUCAPALMA_ATAQUES = [
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '🌱' },
    { nombre: '💧' },
    { nombre: '🔥' },
]
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)*/

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

//mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)
mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch('http://localhost:8080/unirse')
        .then((response) => {
            if (response.ok) {
                response.text()
                    .then((responseText) => {
                        jugadorId = responseText
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    // Validar mascota seleccionada
    let mascotaSeleccionada = false
    mokepones.forEach((mokepon) => {
        if (document.getElementById(mokepon.nombre.toLowerCase()).checked) {
            spanMascotaJugador.innerHTML = mokepon.nombre
            mascotaJugador = mokepon
            mascotaJugador.asignarId(jugadorId)
            mascotaSeleccionada = true
        }
    })
    if (mascotaSeleccionada) {
        // Registrar la mascota seleccionada en el API
        seleccionarMokepon(mascotaJugador)
        // Oculta la seleccion de mascotas
        sectionSeleccionarMascota.style.display = 'none'
        // Iniciar mapa
        sectionVerMapa.style.display = 'flex'
        iniciarMapa()
        // Cargar los ataques
        let ataques = extraerAtaques(mascotaJugador.nombre)
        mostrarAtaques(ataques)
        secuenciaAtaques()
    } else {
        alert('Seleccione una mascota para iniciar el juego')
    }
}

function seleccionarMokepon (mascotaJugador) {
    fetch(
        `http://localhost:8080/mokepon/${jugadorId}`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mokepon: mascotaJugador.nombre
            })
        }
    )
}

function seleccionarMascotaEnemigo(enemigo = undefined) {
    if (enemigo === undefined) {
        let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
        mascotaEnemigo = mokepones[mascotaAleatoria]
    } else {
        mascotaEnemigo = enemigo
    }
    // Ataques del enemigo
    //ataqueEnemigoDisponible = [ ...mascotaEnemigo.ataques ]
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
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(
        `http://localhost:8080/mokepon/${jugadorId}/ataques`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ataques: ataqueJugador
            })
        }
    )

    intervalo = setInterval(obtenerAtaques, intervaloTiempo)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then(({ ataques }) => {
                        if (ataques.length === 5) {
                            clearInterval(intervalo)
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
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

// Canvas
function iniciarMapa() {
    mapa.width = anchoMapa
    mapa.height = altoMapa
    intervalo = setInterval(pintarCanvas, intervaloTiempo)
    enviarPosicion(mascotaJugador.x, mascotaJugador.y)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas() {
    mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX
    mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    // Pinta la mascota del jugador
    mascotaJugador.pintarMokepon()
    if (mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !== 0) {
        enviarPosicion(mascotaJugador.x, mascotaJugador.y)
    }
    // Pinta los enemigos
    mokeponesEnemigos.forEach((mokepon) => {
        mokepon.pintarMokepon()
    })
    // Revisar colision
    if (mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !== 0) {
        mokeponesEnemigos.forEach((mokepon) => {
            if (revisarColision(mokepon)) {
                enemigoId = mokepon.id
                let enemigoIndex = buscarEnemigoIndex(enemigoId)
                detenerMovimiento()
                clearInterval(intervalo)
                // Muestra la sección de los ataques
                sectionSeleccionarAtaque.style.display = 'flex'
                // Oculta el mapa
                sectionVerMapa.style.display = 'none'
                seleccionarMascotaEnemigo(mokeponesEnemigos[enemigoIndex])
            }
        })
    }
}

function enviarPosicion(x, y) {
    fetch(
        `http://localhost:8080/mokepon/${jugadorId}/posicion`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
    }).then((response) => {
        if (response.ok) {
            response.json().then(({enemigos}) => {
                // Agrega los mokepones al mapa
                enemigos.forEach((mokepon) => {
                    let mokeponEnemigoIndex = mokeponesEnemigos.findIndex((mokeponTemp) => mokeponTemp.id === mokepon.id)
                    if ('mokepon' in mokepon) {
                        if (mokeponEnemigoIndex === -1) {
                            let mokeponNombre = mokepon.mokepon.nombre || ''
                            let mokeponEnemigo = null
                            switch(mokeponNombre) {
                            case 'Hipodoge':
                                mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.webp')
                                mokeponEnemigo.ataques.push(...HIPODOGE_ATAQUES)
                                break;
                            case 'Capipepo':
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp')
                                mokeponEnemigo.ataques.push(...CAPIPEPO_ATAQUES)
                                break;
                            case 'Ratigüeya':
                                mokeponEnemigo = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.webp')
                                mokeponEnemigo.ataques.push(...RATIGUEYA_ATAQUES)
                                break;
                            }
                            mokeponEnemigo.asignarId(mokepon.id)
                            mokeponEnemigoIndex = mokeponesEnemigos.push(mokeponEnemigo) - 1
                        }
                        mokeponesEnemigos[mokeponEnemigoIndex].asignarPosicion(mokepon.mokepon.x, mokepon.mokepon.y)
                    }
                })
            })
        }
    })
}

function moverMokeponIzquierda() {
    mascotaJugador.velocidadX = -5
}

function moverMokeponDerecha() {
    mascotaJugador.velocidadX = 5
}

function moverMokeponArriba() {
    mascotaJugador.velocidadY = -5
}

function moverMokeponAbajo() {
    mascotaJugador.velocidadY = 5
}

function detenerMovimiento() {
    mascotaJugador.velocidadX = 0
    mascotaJugador.velocidadY = 0
}

function revisarColision(enemigo) {
    // Mascota
    arribaMascota = mascotaJugador.y
    abajoMascota = mascotaJugador.y + mascotaJugador.alto
    izquierdaMascota = mascotaJugador.x
    derechaMascota = mascotaJugador.x + mascotaJugador.ancho
    // Enemigo
    arribaEnemigo = enemigo.y
    abajoEnemigo = enemigo.y + enemigo.alto
    izquierdaEnemigo = enemigo.x
    derechaEnemigo = enemigo.x + enemigo.ancho

    if (
        (abajoMascota < arribaEnemigo)
        || (arribaMascota > abajoEnemigo)
        || (derechaMascota < izquierdaEnemigo)
        || (izquierdaMascota > derechaEnemigo)
    ) {
        return false
    }
    return true
}

function sePresionoUnaTecla(event) {
    switch(event.key) {
        case 'ArrowUp':
            moverMokeponArriba()
            break;
        case 'ArrowDown':
            moverMokeponAbajo()
            break;
        case 'ArrowLeft':
            moverMokeponIzquierda()
            break;
        case 'ArrowRight':
            moverMokeponDerecha()
            break;
        }
}

// Buscar enemigo
function buscarEnemigoIndex(enemigoId) {
    return mokeponesEnemigos.findIndex((mokeponTemp) => mokeponTemp.id === enemigoId)
}

window.addEventListener('load', iniciarJuego)
