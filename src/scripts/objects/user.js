// Definindo um objeto chamado "user" para armazenar informações do usuário
const user = {
    // Propriedades para armazenar os detalhes do usuário
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: 0,
    following: 0,
    repositories: [],
    events: [],

    // Método para definir as informações básicas do usuário
    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url;
        this.name = gitHubUser.name;
        this.bio = gitHubUser.bio;
        this.userName = gitHubUser.login;
        this.followers = gitHubUser.followers;
        this.following = gitHubUser.following;
    },

    // Método para definir a lista de repositórios do usuário
    setRepositories(repositories) {
        this.repositories = repositories;
    },

    // Método para definir a lista de eventos do usuário
    setEvents(events) {
        this.events = events;
    }
};

// Exportando o objeto "user" para ser usado em outros módulos
export { user };
