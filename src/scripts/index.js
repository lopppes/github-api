// Importando funções e objetos necessários de módulos externos
import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'
import { getEvents } from './services/events.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

// Adicionando um evento de clique ao botão de busca
document.getElementById('btn-search').addEventListener('click', () => {
    // Obtendo o valor do input de busca
    const userName = document.getElementById('input-search').value
    // Validando se o input está vazio e retornando se for o caso
    if(validateEmptyInput(userName)) return
    // Chamando a função para obter dados do usuário
    getUserData(userName)
})

// Adicionando um evento de tecla pressionada ao input de busca
document.getElementById('input-search').addEventListener('keyup', (e) => {
    // Obtendo o valor do input de busca
    const userName = e.target.value
    // Obtendo o código da tecla pressionada
    const key = e.which || e.keyCode
    // Verificando se a tecla pressionada é Enter
    const isEnterKeyPressed = key === 13

    // Se a tecla Enter foi pressionada
    if (isEnterKeyPressed) {
        // Validando se o input está vazio
        validateEmptyInput(userName)
        // Chamando a função para obter dados do usuário
        getUserData(userName)
    }
})

// Função para validar se o input está vazio
function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

// Função assíncrona para obter e renderizar dados do usuário
async function getUserData(userName) {
    // Obtendo informações do usuário
    const userResponse = await getUser(userName)

    // Se o usuário não foi encontrado
    if(userResponse.message === "Not Found"){        
        screen.renderNotFound()
        return
    }

    // Obtendo informações dos repositórios e eventos do usuário
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    // Definindo as informações no objeto de usuário
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    // Renderizando as informações do usuário na tela
    screen.renderUser(user)
}
