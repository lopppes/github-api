const screen = {
    // Obtendo a referência ao elemento onde os dados do perfil serão renderizados
    userProfile: document.querySelector('.profile-data'),

    // Método para renderizar as informações do usuário na tela
    renderUser(user) {
        // Montando a estrutura de HTML para exibir as informações do usuário
        this.userProfile.innerHTML = `
            <div class="info section">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                </div>
                <div class="counters">
                    <div class="followers">
                        <h4>👥 Seguidores</h4>
                        <span>${user.followers}</span>
                    </div>
                    <div class="following">
                        <h4>👥 Seguindo</h4>
                        <span>${user.following}</span>
                    </div>
                </div>
            </div>
        `;

        // Verificando se o usuário possui repositórios para renderizar
        if (user.repositories.length > 0) {
            let repositoriesItens = '';
            // Montando a lista de repositórios
            user.repositories.forEach(repo => {
                repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
                    <h4>${repo.name}</h4>
                    <i class="forks">🍴 ${repo.forks_count}</i>
                    <i class="stars">⭐ ${repo.stargazers_count}</i>
                    <i class="watchers">👀 ${repo.watchers_count}</i>
                    <i class="language">👩‍💻 ${repo.language ?? 'Sem linguagem'}</i>
                </a></li>`;
            });

            // Adicionando a lista de repositórios ao perfil do usuário
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios:</h2>
                    <ul>${repositoriesItens}</ul>
                </div>`;
        }

        // Verificando se o usuário possui eventos para renderizar
        if (user.events.length > 0) {
            let eventsItens = '';
            // Montando a lista de eventos
            user.events.forEach(event => {
                if (event.payload && event.payload.commits) {
                    const commits = event.payload.commits;
                    const commitsList = commits.map(commit => `<span>${commit.message}</span>`).join('');

                    eventsItens += `<li><strong>${event.repo.name}:</strong> ${commitsList}</li>`;
                }
            });

            // Adicionando a lista de eventos ao perfil do usuário
            this.userProfile.innerHTML += `
                <div class="events section">
                    <h2>Atividades:</h2>
                    <ul>${eventsItens}</ul>
                </div>`;
        }
    },

    // Método para renderizar uma mensagem quando o usuário não for encontrado
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
}

// Exportando o objeto "screen" para ser usado em outros módulos
export { screen };
