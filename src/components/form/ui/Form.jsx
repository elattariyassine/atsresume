import React, {useContext} from 'react';
import {ResumeContext} from "../../builder";
import Toolbar from "./Toolbar";
import ResumeSettings from "./ResumeSettings";
import PersonalInformation from "../components/PersonalInformation";
import SocialMedias from "../components/socialMedia/ui/SocialMedias";
import Summary from "../components/Summary";
import Educations from "../components/education/ui/Educations";
import WorkExperiences from "../components/workExperience/ui/WorkExperiences";
import Projects from "../components/projects/ui/Projects";
import Skills from "../components/skills/ui/Skills";
import Languages from "../components/languages/ui/Languages";
import TestsAndCertifications from "../components/testsAndCertifications/ui/TestsAndCertifications";

const Form = () => {
  const {loadVersion} = useContext(ResumeContext);
  return (
    <form className="form-panel exclude-print" onSubmit={(e) => e.preventDefault()}>
      <Toolbar/>
      <div className="form-panel-body" key={loadVersion}>
        <ResumeSettings/>
        <PersonalInformation/>
        <SocialMedias/>
        <Summary/>
        <WorkExperiences/>
        <Projects/>
        <Skills/>
        <Educations/>
        <TestsAndCertifications/>
        <Languages/>
      </div>
    </form>
  );
};

export default Form;
