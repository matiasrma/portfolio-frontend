export class Experiencia {

    id?: number;
    nombreExp: string;
    descripcionExp: string;
    tiempoExp: string;
    imgExp: string;

    constructor(nombreExp: string, descripcionExp: string, tiempoExp: string, imgExp: string){
        this.nombreExp = nombreExp;
        this.descripcionExp = descripcionExp;
        this.tiempoExp = tiempoExp;
        this.imgExp = imgExp;
    }
}
