class SwapService {
  _apiBase = 'https://conduit.productionready.io/api';

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  };

  getArticlesList = async (offset, author = '') => {
    if (author !== '') {
      author = `author=${author}&`;
    }
    const res = await this.getResource(`/articles?${author}limit=10&offset=${offset}`);
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

  getCurrentUserInfo = async () => {
    const res = await fetch(`${this._apiBase}/user`, {
      method: "GET",
      headers: { "authorization": `Token ${localStorage.getItem('token')}` }
    });
    const resource = await res.json();
    return resource;
  }

  postResource = async (url, data) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data)
    });
    // if (!res.ok) {
    //   throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    // }
    return await res.json();
  }

  postLoggedInResource = async (url, data) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  }

  postCreateUser = async (username, email, password) => {
    const data = {
      user: {
        username: username,
        email: email,
        password: password
      }
    }
    const res = await this.postResource(`/users`, data);
    return res;
  }

  postLoginUser = async (email, password) => {
    const data = {
      user: {
        email: email,
        password: password
      }
    }
    const res = await this.postResource('/users/login', data);
    return res;
  }

  postNewArticle = async (title, description, body, tagList) => {
    const data = {
      article: {
        body: body,
        description: description,
        tagList: tagList,
        title: title
      }
    }
    const res = await this.postLoggedInResource('/articles/', data);
    return res;
  }
}

export default SwapService;
