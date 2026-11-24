import { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { useI18n } from "./hooks/useI18n.tsx";
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
      <Header/>

      <Box component="main" id="main" tabIndex={-1} sx={{outline: 'none'}}>
        <Hero experiences={experiences} skills={skillApi.skills}/>

        <Section id="experience" title={t("resume.experience.title")}>
          <Experiences
            experiences={experiences}
            state={experienceApi.getState.state}
            retry={() => experienceApi.list()}
          />
        </Section>

        <Section id="education" title={t("resume.education.title")}>
          <Educations/>
        </Section>

        <Section id="skills" title={t("resume.skills.title")}>
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
