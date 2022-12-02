var gameName = document.getElementById("game-name")
var gameImage = document.getElementById("game-image")
var gameDescription = document.getElementById("game-description")
var gameReleased = document.getElementById("game-released")
var gamePlatforms = document.getElementById("game-platform")
const key = '64866f372fc747178e868b4b175730e3'

const carregarDetalhesGame = async () => {
  const gameId = window.location.search.substring(1)
  console.log("Game ID " + gameId)
  let url = `https://api.rawg.io/api/games/${gameId}?key=${key}`
  await fetch(url, {
    method: 'get',
    dataType: 'json',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Chamada a RAGW realizada')
      console.log(data)

      gameName.innerHTML = data.name
      gameImage.setAttribute("src", data.background_image)
      gameDescription.innerHTML = data.description
      gameReleased.innerHTML = `Lançado em ${data.released.split('-').reverse().join('/')} pelas empresas ${data.developers[0]?.name} & ${data.developers[1]?.name}`
      let plataformas = data.parent_platforms.map(plat => plat.platform.name)
      gamePlatforms.innerHTML = `Plataformas jogáveis: ${plataformas.join(' - ')}`
    })
    .catch(function (error) {
      console.log(error)
    });
}
carregarDetalhesGame()
