export class Educacion {

    id?: number;
    nombreEdu: string;
    descripcionEdu: string;
    tiempoEdu: string;
    imgEdu: string;

    constructor(nombre: string, descripcion: string, tiempoEdu: string, imgEdu: string){
        this.descripcionEdu = descripcion;
        this.nombreEdu = nombre;
        this.tiempoEdu = tiempoEdu;
        this.imgEdu = imgEdu;
    }
}
