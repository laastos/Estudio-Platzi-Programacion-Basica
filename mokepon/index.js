const express = require('express')
const cors = require('cors')

const app = express()
// Gestion de CORS
app.use(cors())
// Habilita la gestión de JSON en las peticiones
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.mokepon.asignarPosicion(x, y)
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
    asignarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

function buscarJugador(jugadorId) {
    return jugadores.findIndex((jugador) => jugador.id === jugadorId)

}

// Generacion de identificador en el juego
app.get('/unirse', (req, res) => {
    const id = `${Math.floor(Math.random() * Date.now())}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    console.log(jugadores)
    // Header
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(id)
})

// Seleccionar mokepon
app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const mokeponNombre = req.body.mokepon || ''
    const jugadorIndex = buscarJugador(jugadorId)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(new Mokepon(mokeponNombre))
        console.log(jugadores)
        res.end()
    } else {
        res.status(400).send('Jugador no encontrado')
    }
})

// Coordenadas
app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = buscarJugador(jugadorId)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)

        const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
        console.log(jugadores)
        res.send({enemigos})
    } else {
        res.status(400).send('Jugador no encontrado')
    }
})

app.listen(8080, () => {
    console.log('Servidor funcionando')
})