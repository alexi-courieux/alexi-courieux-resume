import { Modal, Box, CardMedia, Typography, Divider, IconButton, useTheme as muiTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FC, useEffect } from "react";
import SkillList from "../skills/skillList";
import { useI18n } from "../../hooks/useI18n";
import useSkillApi from "../../hooks/useSkillApi";
import Loading from "../loading";
import { State } from "../../models/requestState";
import ErrorMessage from "../ErrorMessage";
import { ExperienceSchema } from "../../api/generated";
import { useTheme } from "../../hooks/useTheme";
import { ThemeMode } from "../../contextProviders/ThemeContext";

interface IProps {
    modalExperience: ExperienceSchema| null;
    setModalExperience: (experience: ExperienceSchema | null) => void;
}

const ExperienceModal: FC<IProps> = ({ modalExperience , setModalExperience }) => {
    const { t, formatDate } = useI18n();
    const theme = muiTheme();
    const themeMode = useTheme().mode;
    const { list: listSkills, getState: getSkillsState, skills } = useSkillApi({});

    useEffect(() => {
        if (modalExperience) {
            listSkills(modalExperience.id);
        }
    }, [modalExperience, listSkills]);

    let skillContent;
    switch (getSkillsState.state) {
        case State.PENDING:
            skillContent = <Loading messageKey="resume.skill.loading" />;
            break;
        case State.FAILURE:
            skillContent = <ErrorMessage retryFunction={() => listSkills(modalExperience?.id)} />;
            break;
        case State.SUCCESS:
            skillContent = <SkillList skills={skills} />;
            break;
    }

    return (
        <Modal
            open={modalExperience !== null}
            onClose={() => setModalExperience(null)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", md: "60%" },
                    bgcolor: theme.palette.background.default,
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <IconButton onClick={() => setModalExperience(null)} sx={{ position: "absolute", top: 0, right: 0, fontSize: 40 }} aria-label={t("resume.experience.modal.close")}>
                    <CloseIcon />
                </IconButton>
                {modalExperience && (
                    <>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={themeMode === ThemeMode.Dark ? modalExperience.imageUriDark ?? modalExperience.imageUri : modalExperience.imageUri}
                                alt={modalExperience.imageAlt}
                                sx={{ objectFit: "contain", mb: 2, maxWidth: "200px" }}
                            />
                            <Typography variant="h4" id="modal-title" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
                                {modalExperience.companyName}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box id="modal-description" sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {t("resume.experience.modal.position")} {modalExperience.position}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {t("resume.experience.modal.date")} {formatDate(modalExperience.startDate, "MMMM yyyy", true)} - {modalExperience.endDate ? formatDate(modalExperience.endDate, "MMMM yyyy", true) : t("resume.experience.present")}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {modalExperience.description}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {t("resume.experience.modal.skills")}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            {skillContent}
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    )
}

export default ExperienceModal;