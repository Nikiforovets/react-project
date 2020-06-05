class SwapService {
  _apiBase = 'https://conduit.productionready.io/api';

  getResource = async url => {
    let authorization;
    if (localStorage.getItem('token')) {
      authorization = { "Authorization": `Token ${localStorage.getItem('token')}` };
    }
    const res = await fetch(`${this._apiBase}${url}`, {
      headers: authorization
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  };

  getArticlesList = async (offset, author = '', feed) => {
    if (author !== '') {
      author = `author=${author}&`;
    }
    const res = await this.getResource(`/articles${feed}?${author}limit=10&offset=${offset}`);
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
    if (localStorage.getItem('token')) {
      const res = await this.getResource("/user");
      return res;
    } else {
      return '';
    }
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

  postFollow = async (username) => {
    const res = await this.postLoggedInResource(`/profiles/${username}/follow`, {});
    return res;
  }

  deleteLoggedInResource = async (url, data) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  }

  deleteFollow = async (username) => {
    const res = await this.deleteLoggedInResource(`/profiles/${username}/follow`, {});
    return res;
  }
}

export default SwapService;
