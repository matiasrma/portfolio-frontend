export class Social {

    id?: number;
    urlSocial: string;
    imgSocial: string;    

    constructor(urlSocial: string, imgSocial: string){
        this.imgSocial = imgSocial;
        this.urlSocial = urlSocial;        
    }
}
