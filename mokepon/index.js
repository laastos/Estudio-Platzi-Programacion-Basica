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
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

// Generacion de identificador en el juego
app.get('/unirse', (req, res) => {
    const id = `${Math.floor(Math.random() * Date.now())}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    // Header
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(id)
})

// Seleccionar mokepon
app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const mokeponNombre = req.body.mokepon || ''
    const jugadorIndex = jugadores.findIndex((jugador) => jugador.id === jugadorId)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(new Mokepon(mokeponNombre))
    }
    console.log(jugadores)
    res.end()
})

app.listen(8080, () => {
    console.log('Servidor funcionando')
})