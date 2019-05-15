import fetch from "isomorphic-unfetch";
import Model from "./model";

export default class Rocket {
  private clientToken: string;
  private rocketApiUrl: string;
  public constructor(clientToken: string = "") {
    this.clientToken = clientToken;
    console.log(this.clientToken);
    this.rocketApiUrl = "https://europe-west1-rockethub.cloudfunctions.net/getAvailableModels";
  }

  public async land(rocketSlug: string) {
    const trimmedSlug = rocketSlug.trim().toLowerCase();
    const splittedSlug = trimmedSlug.split("/");
    const [userName, modelName, label] = splittedSlug;
    let queryUrl = `${this.rocketApiUrl}?username=${userName}&modelName=${modelName}`;
    if (label) {
      queryUrl = queryUrl.concat(`&label=${label}`);
    }
    const apiResponse = await fetch(queryUrl, {
      method: "GET",
    });
    const availableRockets: any[] = await apiResponse.json();
    if (!availableRockets.length) {
      // tslint:disable-next-line:no-console
      console.error(`No rockets found with the name ${trimmedSlug}`);
      return;
    }
    const rocket = availableRockets[0];

    if (rocket.apiUrl) {
      return new Model(rocket);
    } else {
      // tslint:disable-next-line:no-console
      console.error(`Given rocket does not yet support API inference`);
      return;
    }
  }
}
