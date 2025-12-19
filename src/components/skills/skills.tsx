import { FC, useMemo } from "react";
import useSkillApi from "../../hooks/useSkillApi";
import Loading from "../loading";
import SkillList from "./skillList";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import { Box, SxProps, Theme } from "@mui/material";

interface SkillsProps {
    sx?: SxProps<Theme>;
}

const Skills : FC<SkillsProps> = ({ sx }) => {
    const { skills, getState, list } = useSkillApi({getOnLoad: true});

    const content = useMemo(() => {
        switch (getState.state) {
            case State.PENDING:
                return <Loading messageKey="resume.skill.loading" />;
            case State.FAILURE:
                return <ErrorMessage retryFunction={() => list()} />;
            case State.SUCCESS:
                return <SkillList skills={skills} />;
        }
    }, [getState.state, skills, list]);

    return <Box sx={sx}>{content}</Box>;
}

export default Skills;