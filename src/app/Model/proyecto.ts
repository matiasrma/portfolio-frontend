import { Skill } from "./skill";

export interface Proyecto {
    Id: number;
    nombre_proyecto: string;
    descripcion_proyecto: string;
    url_proyecto: string;
    persona_id: number;
    has_skills: Skill[],
    indexProyecto: number
}
