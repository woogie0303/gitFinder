class View {
    static instance;
    #main;
    constructor() {
        if (View.instance) return instance;
        this.#main = document.querySelector(".userContainer");
    }

    render(data) {
        data.then((res) => {
            const [user, repos] = res;

            this.#main.innerHTML = "";
            this.renderProfile(user);
            this.renderRepos(repos);
        });
    }

    renderProfile(user) {
        const userInfo = { ...user };
        const isEmptyValue = (property) => {
            return property ? property : "Empty";
        };

        const porfileHTML = `
        <div class="profileContainer">
            <div class="imgWrapper">
                <img src=${userInfo.profileUrl} />
                <button>View Profile</button>
            </div>
            <div class="profileInformationWrapper">
                <div class="profileInformationWrapper__countItems">
                    <div class="primaryBtn profileInformationWrapper__countItem">
                        <span>Public Repos: ${userInfo.reposNum}</span>
                    </div>
                    <div class="secondaryBtn profileInformationWrapper__countItem">
                        <span>Public Gists: ${userInfo.gistsNum}</span>
                    </div>
                    <div class="thirdBtn profileInformationWrapper__countItem">
                        <span>Follwers: ${userInfo.followers}</span>
                    </div>
                    <div class="fourthBtn profileInformationWrapper__countItem">
                        <span>Following: ${userInfo.following}</span>
                    </div>
                </div>
                <div class="profileInformationWrapper__informItems">
                    <div class="profileInformationWrapper__informItem"><span>Company: ${isEmptyValue(userInfo.company)}</span></div>
                    <div class="profileInformationWrapper__informItem"><span> Website/Blog: ${isEmptyValue(userInfo.blog)} </span></div>
                    <div class="profileInformationWrapper__informItem">
                        <span>Location: ${isEmptyValue(userInfo.location)}</span>
                    </div>
                    <div class="profileInformationWrapper__informItem">
                        <span>Member Since: ${isEmptyValue(userInfo.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.#main.insertAdjacentHTML("beforeend", porfileHTML);
    }

    renderRepos(repos) {
        const latestRepoHTML = `
        <div class="reposContainer">
            <h2>Latest Repos</h2>
            <div class="reposContainer__repoBoxes">
            ${repos.map((repo) => {
                return `
                <div class="reposContainer__repoBox">
                    <a class="repoTitle" href=${repo.repoUrl}>${repo.title}</a>
                    <div class="reapoCountItems">
                        <div class="primaryBtn repoCountItem">Stars:${repo.starsCount}</div>
                        <div class="secondaryBtn repoCountItem">Watchers: ${repo.watchersCount}</div>
                        <div class="thirdBtn repoCountItem">Forks: ${repo.forksCount}</div>
                    </div>
                </div>
                `;
            })}
            </div>
        </div>
        `;

        this.#main.insertAdjacentHTML("beforeend", latestRepoHTML);
    }
}

export default View;
