import { FC } from "react";
import Loading from "../loading";
import SkillsShowcase from "./skillsShowcase";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import { SkillSchema } from "../../api/generated";

interface SkillsProps {
    skills: SkillSchema[];
    state: State;
    retry: () => void;
}

const Skills: FC<SkillsProps> = ({ skills, state, retry }) => {
    switch (state) {
        case State.FAILURE:
            return <ErrorMessage retryFunction={retry} />;
        case State.SUCCESS:
            return <SkillsShowcase skills={skills} />;
        default:
            return <Loading messageKey="resume.skill.loading" />;
    }
};

export default Skills;
