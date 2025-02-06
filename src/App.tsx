import './App.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Fade,
  IconButton,
  Typography
} from "@mui/material";
import { useI18n } from "./hooks/useI18n.tsx";
import { links } from "./assets/links.ts";
import Experiences from "./components/experience/experiences.tsx";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useEffect } from 'react';
import { ThemeProvider } from './contextProviders/ThemeContextProvider.tsx';
import ThemeModeSwitcher from './components/ThemeModeSwitcher.tsx';

const style = {
  container: {
    marginTop: 4,
  },
  linkedinIcon: {
    fontSize: "2rem", // Adjust the size as needed
  },
  githubIcon: {
    fontSize: "2rem", // Adjust the size as needed
  },
  accordionContainer: {
    marginTop: 2,
  },
};

function App() {
  const { t, i18n } = useI18n();

  useEffect(() => {
    document.title = t("resume.title");
  }, [i18n.language, t]);

  return (
    <ThemeProvider>
      <Box sx={{ position: 'fixed', top: 0, right: 0, m: 2}}>
        <ThemeModeSwitcher />
        <LanguageSwitcher />
      </Box>
      <Container maxWidth={"xl"} sx={style.container}>
        <Fade in={true} timeout={500}>
          <div>
            <Card>
              <CardHeader
                title="Alexi Courieux"
                subheader={t("resume.about-me.title")}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t("resume.about-me.description")}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: 'end' }}>
                <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label={t("resume.about-me.linkedin.aria-label")}>
                  <IconButton aria-label="linkedIn" title={t("resume.about-me.linkedin.tooltip")}>
                    <LinkedInIcon sx={style.linkedinIcon} />
                  </IconButton>
                </a>
                <a href={links.github} target="_blank" rel="noreferrer" aria-label={t("resume.about-me.github.aria-label")}>
                  <IconButton aria-label="github" title={t("resume.about-me.github.tooltip")}>
                    <GithubIcon sx={style.githubIcon} />
                  </IconButton>
                </a>
              </CardActions>
            </Card>
            <Accordion expanded={true} sx={style.accordionContainer}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">{t("resume.experience.title")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Experiences />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={true} sx={style.accordionContainer}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">{t("resume.education.title")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {/* Education content goes here */}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}

export default App;
