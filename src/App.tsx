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
import Educations from './components/education/Educations.tsx';

const style = {
  container: {
    marginTop: 4,
  },
  linkedinIcon: {
    fontSize: "2rem",
    color: "#0A66C2"
  },
  githubIcon: {
    fontSize: "2rem",
    color: "black"
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
      <Box sx={{ position: 'fixed', top: 0, right: 0, m: 2, zIndex: 100 }}>
        <ThemeModeSwitcher />
        <LanguageSwitcher />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" color="primary">
          Alexi Courieux
        </Typography>
        <Box>
          <IconButton href={links.github} color="inherit">
            <GithubIcon sx={style.githubIcon} />
          </IconButton>
          <IconButton href={links.linkedin} color="inherit">
            <LinkedInIcon sx={style.linkedinIcon} />
          </IconButton>
        </Box>
      </Box>
      <Container maxWidth={"xl"} sx={style.container}>
        <Fade in={true} timeout={1000}>
          <div>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={2}>
                  <Typography component="span" align="left" alignSelf={"flex-start"}>
                    {t("resume.about-me.title")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} align="justify">
                    {t("resume.about-me.description")}
                  </Typography>
                </Box>
              </CardContent>
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
                <Educations />
              </AccordionDetails>
            </Accordion>
          </div>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}

export default App;
