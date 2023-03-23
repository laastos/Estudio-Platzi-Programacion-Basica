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

    setMokepon(mokepon) {
        this.mokepon = mokepon
    }

    setPosicion(x, y) {
        this.mokepon.setPosicion(x, y)
    }

    setAtaques(ataques) {
        this.mokepon.setAtaques(ataques)
    }
    getAtaques() {
        return this.mokepon.getAtaques()
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
        this.ataques = []
    }
    setPosicion(x, y) {
        this.x = x
        this.y = y
    }
    setAtaques(ataques) {
        this.ataques = ataques
    }
    getAtaques() {
        return this.ataques
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
        jugadores[jugadorIndex].setMokepon(new Mokepon(mokeponNombre))
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
        jugadores[jugadorIndex].setPosicion(x, y)

        const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
        console.log(jugadores)
        res.send({enemigos})
    } else {
        res.status(400).send('Jugador no encontrado')
    }
})

// Recibir ataques
app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const ataques = req.body.ataques || []
    const jugadorIndex = buscarJugador(jugadorId)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].setAtaques(ataques)
        console.log(jugadores[jugadorIndex])
        res.end()
    } else {
        res.status(400).send('Jugador no encontrado')
    }
})

// Obtener ataques
app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const jugadorIndex = buscarJugador(jugadorId)
    if (jugadorIndex >= 0) {
        let jugador = jugadores[jugadorIndex]
        res.send({
            ataques: jugador.getAtaques() || []
        })
    } else {
        res.status(400).send('Jugador no encontrado')
    }

})

app.listen(8080, () => {
    console.log('Servidor funcionando')
})