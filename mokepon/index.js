const express = require('express')

const app = express()

const jugadores = []

class Jugador {
  constructor(id) {
    this.id = id
  }
}

app.get('/unirse', (req, res) => {
  const id = `${Math.floor(Math.random() * Date.now())}`
  const jugador = new Jugador(id)
  // Header
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(id)
})

app.listen(8080, () => {
  console.log('Servidor funcionando')
})