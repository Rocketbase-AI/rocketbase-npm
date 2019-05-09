import fetch from "isomorphic-unfetch";

export default class Model {
  private rocket: any;
  public constructor(rocket: any) {
    this.rocket = rocket;
  }
  public async run(img: string, api_visualize: boolean = true) {
    const apiUrl = this.rocket.apiUrl;
    const formData = new FormData();
    formData.append("files", img);
    formData.append("visualize", api_visualize.toString());
    // const reqBody = { visualize: api_visualize };
    const apiResponse = await fetch(apiUrl, {
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const response = await apiResponse.json();
    return response;
  }
}
