export class Persona{
    id?: number;
    nombre: string;
    apellido: string;
    img: string;
    descripcion: string;
    ubicacion: string;
    intereses: string;
    correo: string;
    banner: string;

    constructor(
        nombre: string, 
        apellido: string, 
        img: string, 
        descripcion: string, 
        ubicacion: string,
        intereses: string,
        correo: string,
        banner: string){
            this.nombre = nombre;
            this.apellido = apellido;
            this.img = img;
            this.descripcion = descripcion;
            this.ubicacion = ubicacion;
            this.intereses = intereses;
            this.correo = correo;
            this.banner = banner;
    }

}