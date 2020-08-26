import { create } from "apisauce";

const api = create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

class ApiSauce {
  async post(url, payload) {
    const Header = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    };
    const response = await api.post(url, payload, { headers: Header });
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async postWithToken(url, payload, token) {
    const Header = {
      headers: {
        Authorization: token,
      }
    };
    const response = await api.post(url, payload, Header);
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async getWithToken(url, payload, token) {
    const Header = {
      headers: {
        Authorization: token,
      }
    };
    const response = await api.get(url, payload, Header);
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }
  async getData(url, token) {
    const Header = {
      headers: {
        Authorization: token,
      }
    };
    const response = await api.get(url, {}, Header);
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async get(url, data) {
    const token = data && data.token && data.token;
    api.setHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`
    });
    const response = await api.get(url);

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  handlePromise = (resolve, reject, response) => {
    if (
      response.ok &&
      response.data &&
      response.originalError === null &&
      response.status === 200
    ) {
      resolve(response.data);
    } else {
      if (
        !response.ok &&
        response.originalError !== null &&
        response.status === 401 &&
        response.problem === "CLIENT_ERROR"
      ) {
        reject(response?.data?.title);
      }
    }
  };
}

export default new ApiSauce();
