import { Skill } from "./skill";

interface Experience {
    company: string;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    shortDescription: string;
    longDescription: string;
    skills: Skill[];
}

export default Experience;