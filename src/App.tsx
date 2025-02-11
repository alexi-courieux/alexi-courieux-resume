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
  ListItemIcon,
  CardActions,
  Tooltip,
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
        <>
          <Box sx={{ position: 'fixed', top: 0, right: 0, m: { xs: 0, lg: 2 }, zIndex: 100 }}>
            <Tooltip title={t("drawerMenu.open.tooltip")}>
              <IconButton onClick={toggleDrawer(true)} sx={{ m: 2 }} aria-label={t("drawerMenu.open.aria-label")}>
                <MenuIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          </Box>
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
                      <ThemeModeSwitcher showLabel/>
                    </ListItemIcon>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LanguageSwitcher />
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
        </>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mr={4}>
        <Typography variant="h4" color="primary">
          Alexi Courieux
        </Typography>
        <Box>

        </Box>
      </Box>
      <Container maxWidth={"xl"} className='container'>
        <Fade in={true} timeout={1000}>
          <div>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={2}>
                  <Typography component="span" align="left" alignSelf={"flex-start"}>
                    {t("resume.about-me.title")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} align="left">
                    {t("resume.about-me.description")}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Tooltip title={t("resume.about-me.github.tooltip")}>
                  <IconButton href={links.github} color="inherit" aria-label={t("resume.about-me.github.aria-label")}>
                    <GithubIcon fontSize='medium' />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("resume.about-me.linkedin.tooltip")}>
                  <IconButton href={links.linkedin} color="inherit" aria-label={t("resume.about-me.linkedin.aria-label")}>
                    <LinkedInIcon className='linkedinIcon' fontSize='medium' />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
            {!isMobile && (
              <>
                <Accordion expanded={true} className='accordionContainer'>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant='h4'>{t("resume.experience.title")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Experiences />
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={true} className='accordionContainer'>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography variant='h4'>{t("resume.education.title")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Educations />
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={true} className='accordionContainer'>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <Typography variant='h4'>{t("resume.skills.title")}</Typography>
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
        <>
          <div className='mobile-footer-margin' />
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
        </>
      )}
    </>
  );
}

export default App;
