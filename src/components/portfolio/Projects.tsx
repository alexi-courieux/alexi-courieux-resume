import { Box, Chip, ButtonBase, Skeleton, Typography, useTheme as muiTheme } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { FC, useState } from "react";
import { useI18n } from "../../hooks/useI18n.tsx";
import { State } from "../../models/requestState.ts";
import ErrorMessage from "../ErrorMessage.tsx";
import { ProjectSummary } from "../../api/models/project.ts";
import { radius } from "../../theme/theme.ts";
import ProjectModal from "./ProjectModal.tsx";

interface IProps {
  projects: ProjectSummary[];
  state: State;
  retry: () => void;
}

const Projects: FC<IProps> = ({ projects, state, retry }) => {
  const { t, formatDate } = useI18n();
  const theme = muiTheme();
  const [selected, setSelected] = useState<ProjectSummary | null>(null);

  if (state === State.FAILURE) return <ErrorMessage retryFunction={retry} />;

  if (state !== State.SUCCESS) {
    return (
      <Box role="status" aria-label={t("resume.projects.loading")} sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" } }}>
        {[0, 1].map((i) => <Skeleton key={i} variant="rounded" height={360} sx={{ borderRadius: `${radius.card}px` }} />)}
      </Box>
    );
  }

  return (
    <>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" } }}>
        {projects.map((project) => (
          <Box component="li" key={project.id} sx={{ display: "flex" }}>
            <ButtonBase
              onClick={() => setSelected(project)}
              aria-label={t("resume.projects.modal.aria-label", { title: project.title })}
              sx={{
                display: "flex", flexDirection: "column", alignItems: "stretch", width: "100%", textAlign: "left", overflow: "hidden", minWidth: 0, overflowWrap: "anywhere",
                borderRadius: `${radius.card}px`, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}`,
                transition: "transform .2s, border-color .2s",
                "&:hover, &:focus-visible": { transform: "translateY(-2px)", borderColor: "text.primary" },
                "&:hover .arrow, &:focus-visible .arrow": { transform: "translate(3px,-3px)", opacity: 1 },
              }}
            >
              <Box component="img" src={project.thumbnailUri} alt={project.thumbnailAlt} loading="lazy"
                sx={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", borderBottom: `1px solid ${theme.palette.divider}` }} />
              <Box sx={{ p: { xs: 2.5, md: 3 }, display: "flex", flexDirection: "column", gap: 1.5, flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Typography variant="h5" component="h3" sx={{ flexGrow: 1, lineHeight: 1.2, fontSize: { xs: "1.2rem", md: "1.4rem" } }}>{project.title}</Typography>
                  {project.featured && <Chip size="small" label={t("resume.projects.featured")} />}
                  <ArrowOutwardIcon className="arrow" aria-hidden sx={{ opacity: 0.5, transition: "transform .2s, opacity .2s" }} />
                </Box>
                <Typography color="text.secondary" sx={{ fontSize: "0.95rem" }}>{formatDate(project.projectDate, "MMMM yyyy", true)}</Typography>
                <Typography>{project.shortDescription}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: "auto", pt: 1 }}>
                  {project.skills.map((skill) => <Chip key={skill.id} size="small" variant="outlined" label={skill.name} />)}
                </Box>
              </Box>
            </ButtonBase>
          </Box>
        ))}
      </Box>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Projects;
