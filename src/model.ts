import fetch from "isomorphic-unfetch";

export default class Model {
  private rocket: any;
  public constructor(rocket: any) {
    this.rocket = rocket;
  }
  public async run(img: string, apiVisualize: boolean = true) {
    const apiUrl = this.rocket.apiUrl;
    const formData = new FormData();
    formData.append('input', {
      // @ts-ignore
      uri: img,
      type: 'image/jpg',
      name: 'input'
    });
    formData.append('visualize', apiVisualize.toString());
    const apiResponse = fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    return apiResponse;
  }
}
