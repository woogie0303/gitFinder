class Model {
    static instance;
    #user;
    #repos;

    constructor() {
        if (Model.instance) return instance;
    }
    async changeJSONFormat(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    async getUserData(inputValue) {
        const userUrl = "https://api.github.com/users/";
        const [user, repos] = await Promise.all([this.changeJSONFormat(`${userUrl}${inputValue}`), this.changeJSONFormat(`${userUrl}${inputValue}/repos`)]);

        this._setUserData(user);
        this._setRepoData(repos);

        return [this.#user, this.#repos];
    }

    _setUserData(user) {
        console.log(user);
        this.#user = {
            profileUrl: user.avatar_url,
            followers: user.followers,
            following: user.following,
            reposNum: user.public_repos,
            gistsNum: user.public_gists,
            company: user.company,
            blog: user.blog,
            location: user.location,
            createdAt: user.created_at,
        };
    }

    _setRepoData(repos) {
        const repoData = [];

        repos.forEach((repo) => {
            repoData.push({
                repoUrl: repo.html_url,
                starsCount: repo.stargazers_count,
                watchersCount: repo.watchers_count,
                forksCount: repo.forks_count,
                title: repo.name,
            });
        });

        this.#repos = repoData;
    }
}

export default Model;
