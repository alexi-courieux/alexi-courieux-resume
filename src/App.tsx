import './App.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography
} from "@mui/material";
import {useI18n} from "./hooks/useI18n.tsx";
import {links} from "./assets/links.ts";
import Experiences from "./components/experiences.tsx";
import { Height } from '@mui/icons-material';

function App() {

  const { t } = useI18n();

  return (
      <Container maxWidth={"lg"} sx={style.container}>
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
        <Accordion expanded={true}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">{t("resume.experience.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Experiences/>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">{t("resume.education.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">{t("resume.projects.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography component="span">{t("resume.skills.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
  )
}

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    marginBottom: '20px',
  },
  accordionContainer: {
    width: '100%',
  },
  githubIcon: {
    color: 'black',
    fontSize: 40,
  },
  linkedinIcon: {
    color: '#0A66C2',
    fontSize: 40,
  }
}

export default App
