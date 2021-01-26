import Axios, { AxiosStatic } from "axios";

export interface UpdateTaskGroup {
  path?: string;
  name?: string;
  status?: string;
}
export class TaskGroupApi {
  api: any;
  endpoint: any;

  constructor(endpoint: string | undefined, api: AxiosStatic) {
    this.endpoint = endpoint;
    this.api = api;
  }
  async list(query?: any, headers?: any): Promise<any> {
    return this.api.get(`${this.endpoint}/task_groups`, {
      headers: headers || {},
      params: query || {},
    });
  }
  async create(data: any, headers?: any): Promise<any> {
    return this.api.post(`${this.endpoint}/task_groups`, data, {
      headers: headers || {},
    });
  }
  async update(id: number, data: UpdateTaskGroup, headers?: any): Promise<any> {
    return this.api.put(`${this.endpoint}/task_groups/${id}`, data, {
      headers: headers || {},
    });
  }
  async getUploadUrl(filename: string): Promise<any> {
    return this.api.post(`${this.endpoint}/createUploadUrl`, {
      filename,
    });
  }
  async upload(url: string, file: File): Promise<any> {
    return this.api.put(url, file);
  }
  async generate(taskGroupId: number, headers?: any): Promise<any> {
    return this.api.post(
      `${this.endpoint}/task_groups/${taskGroupId}/generate`,
      {},
      {
        headers: headers || {},
      }
    );
  }
}

export default new TaskGroupApi(process.env.REACT_APP_API_ENDPOINT, Axios);
