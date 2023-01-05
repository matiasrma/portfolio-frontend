export class Proyecto {

    id?: number
    nombreProyecto: string;
    descripcionProyecto: string;
    urlProyecto: string;

    constructor(
        nombre: string,
        descripcion: string,
        url: string
        ){
            this.nombreProyecto = nombre;
            this.descripcionProyecto = descripcion;
            this.urlProyecto = url;
        }

}
