const updateTechnologies = (resumeData, setResumeData, workIndex, update) => {
  const workExperience = resumeData.workExperience.map((work, index) =>
    index === workIndex
      ? {...work, technologies: update(work.technologies || [])}
      : work
  );
  setResumeData({...resumeData, workExperience});
};

export const addTechnology = (resumeData, setResumeData, workIndex) =>
  updateTechnologies(resumeData, setResumeData, workIndex, (technologies) => [
    ...technologies,
    {category: "", tech: ""},
  ]);

export const handleTechnology = (resumeData, setResumeData, workIndex, techIndex, field, value) =>
  updateTechnologies(resumeData, setResumeData, workIndex, (technologies) =>
    technologies.map((technology, index) =>
      index === techIndex ? {...technology, [field]: value} : technology
    )
  );

export const removeTechnology = (resumeData, setResumeData, workIndex, techIndex) =>
  updateTechnologies(resumeData, setResumeData, workIndex, (technologies) =>
    technologies.filter((_, index) => index !== techIndex)
  );
