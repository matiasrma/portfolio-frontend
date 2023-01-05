export class Skill {

    id?: number;
    nombreSkill: string;
    percentageSkill: number;
    imgSkill: string;    
    showImg: boolean;

    constructor(
        nombreSkill: string,
        percentageSkill: number,
        imgSkill: string,
        showImg: boolean        
        )        
        {
            this.nombreSkill = nombreSkill;
            this.percentageSkill = percentageSkill;
            this.imgSkill = imgSkill;            
            this.showImg = showImg;
        }
}
