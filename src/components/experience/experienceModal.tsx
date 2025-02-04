import { Modal, Box, CardMedia, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";
import { FC } from "react";
import SkillList from "./skillList";
import Experience from "../../api/models/experience";

interface IProps {
    modalExperience: Experience | null;
    setModalExperience: (experience: Experience | null) => void;
}

const getI18nKey = (company: string, key: string) => {
    return `resume.experience.companies.${company}.${key}`;
}

const ExperienceModal: FC<IProps> = ({ modalExperience: modalExperience, setModalExperience }) => {
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
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <IconButton onClick={() => setModalExperience(null)} sx={{ position: "absolute", top: 0, right: 0, fontSize: 40 }} aria-label={t("resume.experience.modal.close")}>
                    <CloseIcon/>
                </IconButton>
                {modalExperience && (
                    <>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={t(getI18nKey(modalExperience.company, "image"))}
                                alt={t(getI18nKey(modalExperience.company, "image-alt"))}
                                sx={{ objectFit: "contain", mb: 2, maxWidth: "200px" }}
                            />
                            <Typography variant="h4" id="modal-title" gutterBottom sx={{flexGrow: 1, textAlign: "center"}}>
                                {modalExperience.companyName}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box id="modal-description" sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {t("resume.experience.modal.position")} {modalExperience.position}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {t("resume.experience.modal.date")} {modalExperience.startDate.toString()} - {modalExperience.endDate ? modalExperience.endDate.toString() : t("resume.experience.present")}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {modalExperience.description}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <SkillList />
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    )
}

export default ExperienceModal;