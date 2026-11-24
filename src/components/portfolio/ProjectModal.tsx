import { Modal, Box, Typography, Divider, IconButton, Button, useTheme as muiTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { FC, useEffect } from "react";
import SkillsShowcase from "../skills/skillsShowcase";
import { useI18n } from "../../hooks/useI18n";
import { useProjectDetail } from "../../hooks/usePortfolioApi";
import Loading from "../loading";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import { ProjectSummary } from "../../api/models/project";

interface IProps {
    project: ProjectSummary | null;
    onClose: () => void;
}

const ProjectModal: FC<IProps> = ({ project, onClose }) => {
    const { t, formatDate } = useI18n();
    const theme = muiTheme();
    const { project: detail, getState, read } = useProjectDetail();

    useEffect(() => {
        if (project) read(project.id);
    }, [project, read]);

    let body;
    switch (getState.state) {
        case State.SUCCESS:
            body = detail && (
                <>
                    <Typography sx={{ mt: 2, whiteSpace: "pre-line" }}>{detail.description}</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3 }}>
                        {detail.linkUrl && (
                            <Button variant="contained" href={detail.linkUrl} target="_blank" rel="noopener noreferrer" endIcon={<ArrowOutwardIcon />}>
                                {detail.linkLabel ?? t("resume.projects.modal.visit")}
                            </Button>
                        )}
                        {detail.repositoryUrl && (
                            <Button variant="outlined" href={detail.repositoryUrl} target="_blank" rel="noopener noreferrer" startIcon={<GitHubIcon />}>
                                {t("resume.projects.modal.repository")}
                            </Button>
                        )}
                    </Box>
                </>
            );
            break;
        case State.FAILURE:
            body = <ErrorMessage retryFunction={() => project && read(project.id)} />;
            break;
        default:
            body = <Loading messageKey="resume.projects.loading" />;
    }

    return (
        <Modal open={project !== null} onClose={onClose} aria-labelledby="project-modal-title">
            <Box sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", md: "60%" },
                bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 3,
                maxHeight: "80vh", display: "flex", flexDirection: "column", p: 3,
            }}>
                <IconButton onClick={onClose} sx={{ position: "absolute", top: 20, right: 44, zIndex: 1 }} aria-label={t("resume.projects.modal.close")}>
                    <CloseIcon />
                </IconButton>
                {project && (
                    <Box sx={{ p: 2, overflowY: "auto", minHeight: 0, scrollbarGutter: "stable" }}>
                        <Typography variant="h4" id="project-modal-title" gutterBottom sx={{ pr: 5 }}>{project.title}</Typography>
                        <Typography color="text.secondary" gutterBottom>{formatDate(project.projectDate, "MMMM yyyy", true)}</Typography>
                        <Divider />
                        {body}
                        {project.skills.length > 0 && (
                            <>
                                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>{t("resume.projects.modal.skills")}</Typography>
                                <SkillsShowcase skills={project.skills} compact />
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ProjectModal;
