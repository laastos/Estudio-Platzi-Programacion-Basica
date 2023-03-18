const jugarPartida = () => {
  const maquina = Math.floor(Math.random() * 3 + 1);
  const usuario = parseInt(prompt('Piedra=1; Papel=2; Tijera=3'));
  // Combinaciones de juego
  if (maquina == usuario) {
    alert('Empatados');
  }
  if ((maquina == 1) && (usuario == 2)) {
    alert('Usuario gana')
  }
  if ((maquina == 1) && (usuario == 3)) {
    alert('PC gana')
  }
  if ((maquina == 2) && (usuario == 1)) {
    alert('PC gana')
  }
  if ((maquina == 2) && (usuario == 3)) {
    alert('Usuario gana')
  }
  if ((maquina == 3) && (usuario == 1)) {
    alert('Usuario gana')
  }
  if ((maquina == 3) && (usuario == 2)) {
    alert('PC gana')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  while (true) {
    jugarPartida();
  }
}, false);