// services/ApiClient.ts
import axios from "axios";

export class ApiClient {
  protected baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async postUsers<T>(users: T, endPoint: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseURL}/${endPoint}`, users);
      console.log(`Resposne from ${endPoint}`, { response });
      return true;
    } catch (err) {
      throw new Error(
        `Error while inserting user data [${JSON.stringify(err)}]`
      );
    }
  }

  public async getUsers<T>(endPoint: string): Promise<T[]> {
    try {
      const response = await axios.get(`${this.baseURL}/${endPoint}`);
      console.log(`Resposne from ${endPoint}`, { response });
      return response.data.users as T[];
    } catch (err) {
      throw new Error(
        `Error while retriving users data [${JSON.stringify(err)}]`
      );
    }
  }

  public async deleteUser(endPoint: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${this.baseURL}/${endPoint}`);
      console.log(`Resposne from ${endPoint}`, { response });
      return true;
    } catch (err) {
      throw new Error(
        `Error while retriving users data [${JSON.stringify(err)}]`
      );
    }
  }
}
