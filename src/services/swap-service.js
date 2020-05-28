class SwapService {
  _apiBase = 'https://conduit.productionready.io/api';

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  };

  getArticlesList = async offset => {
    const res = await this.getResource(`/articles?limit=10&offset=${offset}`);
    //const result = res.map(this._transformPerson);
    return res;
  };

  getArticle = async title => {
    const res = await this.getResource(title);
    return res;
  }

  getUserProfile = async username => {
    const res = await this.getResource(username);
    return res;
  }
}

export default SwapService;
