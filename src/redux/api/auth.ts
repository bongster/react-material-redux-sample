import Axios, { AxiosStatic } from "axios";

export class AuthApi {
  api: any;
  endpoint: any;

  constructor(endpoint: string | undefined, api: AxiosStatic) {
    this.endpoint = endpoint;
    this.api = api;
  }
  async login(email: string, password: string): Promise<any> {
    if (email === "admin@test.com" && password === "password") {
      return Promise.resolve({
        data: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTYwOTk4NzI2OCwiZXhwIjoxNjE3NzYzMjY4fQ.ecSWM5xZ5oR97awnfspo8YAFBMroZpkqTu2laUrmwe0",
        },
      });
    } else {
      return Promise.reject(new Error("Incorrect email and password"));
    }
  }
}

export default new AuthApi(process.env.REACT_APP_API_ENDPOINT, Axios);
