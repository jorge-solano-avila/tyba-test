import request from "request-promise-native";


export class RestaurantService {
  //#region Public methods
  async getNear(data: { latitude: number, longitude: number }): Promise<{ [key: string]: any }[]> {
    const response = await request.get(`${process.env.ZOMATO_HOST_URL}geocode/?lat=${data.latitude}&lon=${data.longitude}`, {
        headers: { "user-key": process.env.ZOMATO_API_KEY },
        resolveWithFullResponse: true,
      });

    return response.body.nearby_restaurants;
  }
  //#endregion
}
