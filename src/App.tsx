import './App.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Container,
  Fade,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useI18n } from "./hooks/useI18n.tsx";
import { links } from "./assets/links.ts";
import Experiences from "./components/experience/experiences.tsx";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useEffect, useState } from 'react';
import ThemeModeSwitcher from './components/ThemeModeSwitcher.tsx';
import Educations from './components/education/Educations.tsx';
import Skills from './components/skills/skills.tsx';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';

function App() {
  const { t, i18n } = useI18n();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const style = {
    container: {
      marginTop: 4,
    },
    linkedinIcon: {
      fontSize: "2rem",
      color: "#0A66C2"
    },
    githubIcon: {
      fontSize: "2rem"
    },
    accordionContainer: {
      marginTop: 2,
    },
  };

  useEffect(() => {
    document.title = t("resume.title");
  }, [i18n.language, t]);

  const renderMobileContent = () => {
    switch (value) {
      case 0:
        return <Experiences />;
      case 1:
        return <Educations />;
      case 2:
        return <Skills />;
      default:
        return <Experiences />;
    }
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      {!isMobile && (
        <Box sx={{ position: 'fixed', top: 0, right: 0, m: { xs: 0, lg: 2 }, zIndex: 100 }}>
          <ThemeModeSwitcher />
          <LanguageSwitcher />
        </Box>
      )}
      {isMobile && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, m: { xs: 0, lg: 2 }, zIndex: 100 }}>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ThemeModeSwitcher />
                  </ListItemIcon>
                  <ListItemText primary={t("theme.mode")} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageSwitcher />
                  </ListItemIcon>
                  <ListItemText primary={t("language.switcher")} />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mr={4}>
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
          <IconButton onClick={toggleDrawer(true)} color="inherit" sx={{ ml: 2 }}>
            <MenuIcon />
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
            {!isMobile && (
              <>
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
                <Accordion expanded={true} sx={style.accordionContainer}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <Typography component="span">{t("resume.skills.title")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Skills />
                  </AccordionDetails>
                </Accordion>
              </>
            )}
            {isMobile && (
              <Box mt={2}>
                {renderMobileContent()}
              </Box>
            )}
          </div>
        </Fade>
      </Container>
      {isMobile && (
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          showLabels
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        >
          <BottomNavigationAction label={t("resume.experience.title")} icon={<WorkIcon />} />
          <BottomNavigationAction label={t("resume.education.title")} icon={<SchoolIcon />} />
          <BottomNavigationAction label={t("resume.skills.title")} icon={<BuildIcon />} />
        </BottomNavigation>
      )}
    </>
  );
}

export default App;
