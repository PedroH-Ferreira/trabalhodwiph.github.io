var sectionToListGames = document.getElementById("game-section")
var listGenres = document.getElementById("genres")
const key = '64866f372fc747178e868b4b175730e3'
var page = 1
const pageSize = 12
const search = ''

var input = document.getElementById("game-name");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    limparLista()
    listarGames(input.value)

  }
})
const listarGames = async (search) => {
  let url = `https://api.rawg.io/api/games?key=${key}&page=${page}&page_size=${pageSize}&search=${search}`
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
      data.results.map((game) => {
        let article = document.createElement("article")
        let span = document.createElement("span")
        let img = document.createElement("img")
        let anchor = document.createElement("a")
        let h2 = document.createElement("h2")
        let div = document.createElement("div")
        let p = document.createElement("p")
        span.setAttribute("class", "image")
        div.setAttribute("class", "content")
        img.setAttribute("src", game.background_image)
        anchor.setAttribute("href", `detalhes.html?${game.id}`)
        h2.innerHTML = game.name
        p.innerHTML = `Gênero: ${game.genres[0]?.name} / Lançamento: ${game.released.split('-').reverse().join('/')}`
        div.appendChild(p)
        anchor.appendChild(h2)
        anchor.appendChild(div)
        span.appendChild(img)
        article.appendChild(span)
        article.appendChild(anchor)
        sectionToListGames.appendChild(article)
      })
    })
    .catch(function (error) {
      console.log(error)
    });
}
listarGames('')

const listaGeneros = async () => {
  let url = `https://api.rawg.io/api/genres?key=${key}`
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
      const genres = data.results.map(genre => genre.name)
      listGenres.innerHTML = genres.join(' - ')
    })
    .catch(function (error) {
      console.log(error)
    });
}
listaGeneros()

const limparLista = () => {
  while (sectionToListGames.firstChild) {
    sectionToListGames.removeChild(sectionToListGames.lastChild);
  }
}

const nextPage = async = () => {
  limparLista()
  this.page = page + 1
  listarGames('')
}

const previousPage = async = () => {
  limparLista()
  if (page >= 2) {
    this.page = page - 1
    listarGames('')
  }
}
