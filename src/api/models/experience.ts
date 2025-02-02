import { Skill } from "./skill";

export interface Experience {
    name: string;
    date: Date;
    shortDescription: string;
    longDescription: string;
    skills: Skill[];
}