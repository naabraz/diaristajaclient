export class FiltroLocalizacao {
  latitude: string;
  longitude: string;
  raio: number;

  constructor(lat: string, long: string, raio: number) {
    this.latitude = lat;
    this.longitude = long;
    this.raio = raio;
  }
}
