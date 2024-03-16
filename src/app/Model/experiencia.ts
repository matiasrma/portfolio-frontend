import { Skill } from "./skill";

export interface Experiencia {
    Id: number,
    nombre_exp: string,
    descripcion_exp: string,
    tiempo_exp: string,
    img_exp: string,
    persona_id: number,
    has_skills: Skill[],
    indexExperiencia: number
}
