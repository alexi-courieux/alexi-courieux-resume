import { Skill } from "./skill";

interface Experience {
    id: string;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    shortDescription: string;
    description: string;
    skills: Skill[];
}

export default Experience;