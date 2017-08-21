export class FiltroLocalizacao {
    latitude: String;
    longitude: String;
    raio: Number

     constructor(lat: String, long: String, raio: Number){
         this.latitude = lat;
         this.longitude = long;
         this.raio = raio;
     }
}