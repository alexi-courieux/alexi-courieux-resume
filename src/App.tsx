import { useEffect, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { useI18n } from "./hooks/useI18n.tsx";
import DotGrid from "./components/decorative/DotGrid.tsx";
import Header from "./components/layout/Header.tsx";
import Section from "./components/layout/Section.tsx";
import Contact from "./components/layout/Contact.tsx";
import StickyCta from "./components/layout/StickyCta.tsx";
import Hero from "./components/hero/Hero.tsx";
import Experiences from "./components/experience/experiences.tsx";
import Educations from "./components/education/Educations.tsx";
import Skills from "./components/skills/skills.tsx";
import useExperienceApi from "./hooks/useExperienceApi.tsx";
import useSkillApi from "./hooks/useSkillApi.tsx";
import { State } from "./models/requestState.ts";

function App() {
  const {t, i18n} = useI18n();
  const theme = useTheme();
  const experienceApi = useExperienceApi({getOnLoad: true});
  const skillApi = useSkillApi({getOnLoad: true});

  useEffect(() => {
    document.title = t("resume.title");
  }, [i18n.language, t]);

  const experiences = useMemo(
    () => (Array.isArray(experienceApi.experiences) ? experienceApi.experiences : []),
    [experienceApi.experiences],
  );

  return (
    <Box id="app">
      <Box aria-hidden sx={{position: 'fixed', inset: 0, zIndex: -1, opacity: theme.palette.mode === 'dark' ? 0.55 : 0.4}}>
        <DotGrid
          dotSize={3}
          gap={44}
          baseColor={theme.palette.mode === 'dark' ? '#2a3050' : '#c9cde6'}
          activeColor={theme.palette.primary.main}
          proximity={110}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={0.8}
        />
      </Box>

      <Header/>

      <Box component="main" id="main" tabIndex={-1} sx={{outline: 'none'}}>
        <Hero experiences={experiences} skills={skillApi.skills}/>

        <Section id="experience" index="01" title={t("resume.experience.title")}>
          <Experiences
            experiences={experiences}
            state={experienceApi.getState.state}
            retry={() => experienceApi.list()}
          />
        </Section>

        <Section id="education" index="02" title={t("resume.education.title")}>
          <Educations/>
        </Section>

        <Section id="skills" index="03" title={t("resume.skills.title")}>
          <Skills
            skills={skillApi.skills}
            state={skillApi.getState.state === State.IDLE ? State.PENDING : skillApi.getState.state}
            retry={() => skillApi.list()}
          />
        </Section>

        <Contact/>
      </Box>

      <StickyCta/>
    </Box>
  );
}

export default App;
