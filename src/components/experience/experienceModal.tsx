import { Modal, Box, CardMedia, Typography } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import SkillList from "./skillList";

interface IProps {
    modalCompany: string | null;
    setModalCompany: (company: string | null) => void;
}

const getI18nKey = (company: string, key: string) => {
    return `resume.experience.companies.${company}.${key}`;
}

const ExperienceModal: FC<IProps> = ({ modalCompany, setModalCompany }) => {
    return (
        <Modal
            open={modalCompany !== null}
            onClose={() => setModalCompany(null)}
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
                {modalCompany && (
                    <>
                        <CardMedia
                            component="img"
                            height="140"
                            image={t(getI18nKey(modalCompany, "image"))}
                            alt={t(getI18nKey(modalCompany, "image-alt"))}
                            sx={{ objectFit: "contain", mb: 2 }}
                        />
                        <Typography variant="h4" id="modal-title" gutterBottom>
                            {t(getI18nKey(modalCompany, "name"))}
                        </Typography>
                        <Box id="modal-description" sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {t("resume.experience.modal.position")} {t(getI18nKey(modalCompany, "position"))}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {t("resume.experience.modal.date")} {t(getI18nKey(modalCompany, "date"))}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {t(getI18nKey(modalCompany, "description"))}
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