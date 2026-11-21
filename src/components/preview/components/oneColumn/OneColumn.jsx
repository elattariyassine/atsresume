import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslation } from "../../../../i18n/useTranslation";

const Droppable = dynamic(
  () =>
    import("@hello-pangea/dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("@hello-pangea/dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);


const hasValue = (value) =>
  typeof value === "string"
    ? value.trim().length > 0
    : value !== undefined && value !== null;

const workItemHasContent = (item) =>
  hasValue(item.company) ||
  hasValue(item.position) ||
  hasValue(item.location) ||
  (hasValue(item.workType) && item.workType !== "None") ||
  hasValue(item.startYear) ||
  hasValue(item.endYear) ||
  hasValue(item.description) ||
  hasValue(item.keyAchievements) ||
  (item.technologies || []).some(
    (technology) => hasValue(technology.category) || hasValue(technology.tech)
  );

const projectItemHasContent = (item) =>
  hasValue(item.name) ||
  hasValue(item.link) ||
  hasValue(item.startYear) ||
  hasValue(item.endYear) ||
  hasValue(item.description) ||
  hasValue(item.keyAchievements);

const externalHref = (link) =>
  /^https?:\/\//i.test(link) ? link : `http://${link}`;

const InlineText = ({ items, dateRange, className }) => {
  const values = items.filter(hasValue);

  if (values.length === 0 && !dateRange) return null;

  return (
    <p className={className}>
      {values.map((value, index) => (
        <React.Fragment key={`${value}-${index}`}>
          {index > 0 && (
            <span className="cv-one-column-separator" aria-hidden="true">
              {" · "}
            </span>
          )}
          {value}
        </React.Fragment>
      ))}
      {dateRange && (
        <>
          {values.length > 0 && (
            <span className="cv-one-column-separator" aria-hidden="true">
              {" · "}
            </span>
          )}
          {dateRange}
        </>
      )}
    </p>
  );
};

const InlineElements = ({ items, className }) => {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="cv-one-column-separator" aria-hidden="true">
              {" · "}
            </span>
          )}
          {item}
        </React.Fragment>
      ))}
    </div>
  );
};

const OneColumnHeader = ({ resumeData }) => {
  const contactItems = [];

  if (hasValue(resumeData.email)) {
    contactItems.push(
      <a key="email" href={`mailto:${resumeData.email}`}>
        {resumeData.email}
      </a>
    );
  }
  if (hasValue(resumeData.contactInformation)) {
    contactItems.push(
      <a key="phone" href={`tel:${resumeData.contactInformation}`}>
        {resumeData.contactInformation}
      </a>
    );
  }
  if (hasValue(resumeData.address)) {
    contactItems.push(<span key="address">{resumeData.address}</span>);
  }

  const socialItems = (resumeData.socialMedia || [])
    .filter((socialMedia) => hasValue(socialMedia.link))
    .map((socialMedia, index) => (
      <a
        href={externalHref(socialMedia.link)}
        aria-label={socialMedia.socialMedia}
        key={`${socialMedia.socialMedia}-${index}`}
        target="_blank"
        rel="noreferrer"
      >
        {socialMedia.link}
      </a>
    ));

  return (
    <header className="cv-one-column-header">
      <div className="cv-one-column-header-info">
        <h1 className="cv-one-column-name">{resumeData.name}</h1>
        {hasValue(resumeData.position) && (
          <p className="cv-one-column-position">{resumeData.position}</p>
        )}
        <InlineElements
          items={contactItems}
          className="cv-one-column-contact content"
        />
        <InlineElements
          items={socialItems}
          className="cv-one-column-social sub-content"
        />
      </div>
      {hasValue(resumeData.profilePicture) && (
        <div className="cv-one-column-photo" aria-hidden="true">
          <Image
            src={resumeData.profilePicture}
            alt=""
            width={88}
            height={88}
            className="cv-one-column-photo-image"
          />
        </div>
      )}
    </header>
  );
};

const OneColumnSection = ({ title, children, className = "" }) => (
  <section className={`cv-one-column-section ${className}`}>
    <h2 className="cv-one-column-section-title">{title}</h2>
    {children}
  </section>
);

const WorkExperience = ({ items, tr }) => (
  <OneColumnSection title={tr.t("workExperience")} className="cv-one-column-work">
    <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => {
            const metadata = [
              item.position,
              item.location,
              item.workType && item.workType !== "None"
                ? tr.workTypeLabel(item.workType)
                : null,
            ];
            const dateRange = tr.formatDateRange(item.startYear, item.endYear);
            const achievements =
              typeof item.keyAchievements === "string"
                ? item.keyAchievements.split("\n").filter(hasValue)
                : [];
            const technologies = (item.technologies || [])
              .filter(
                (technology) =>
                  hasValue(technology.category) || hasValue(technology.tech)
              )
              .map((technology) =>
                [technology.category, technology.tech]
                  .filter(hasValue)
                  .join(": ")
              );

            return (
              <Draggable
                key={`${item.company}-${index}`}
                draggableId={`WORK_EXPERIENCE-${index}`}
                index={index}
              >
                {(draggableProvided, snapshot) => (
                  <article
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className={`cv-one-column-job cv-resume-item ${
                      snapshot.isDragging ? "cv-one-column-dragging" : ""
                    }`}
                  >
                    {hasValue(item.company) && (
                      <h3 className="cv-one-column-job-company">
                        {item.company}
                      </h3>
                    )}
                    <InlineText
                      items={metadata}
                      dateRange={dateRange}
                      className="cv-one-column-job-meta"
                    />
                    {hasValue(item.description) && (
                      <p className="cv-one-column-job-description content">
                        {item.description}
                      </p>
                    )}
                    {achievements.length > 0 && (
                      <Droppable
                        droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                        type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                      >
                        {(achievementProvided) => (
                          <ul
                            className="cv-one-column-bullets"
                            {...achievementProvided.droppableProps}
                            ref={achievementProvided.innerRef}
                          >
                            {achievements.map((achievement, subIndex) => (
                              <Draggable
                                key={`${item.company}-${index}-${subIndex}`}
                                draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                index={subIndex}
                              >
                                {(achievementDraggableProvided, achievementSnapshot) => (
                                  <li
                                    ref={achievementDraggableProvided.innerRef}
                                    {...achievementDraggableProvided.draggableProps}
                                    {...achievementDraggableProvided.dragHandleProps}
                                    className={
                                      achievementSnapshot.isDragging
                                        ? "cv-one-column-dragging"
                                        : ""
                                    }
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: achievement,
                                      }}
                                      contentEditable
                                      suppressContentEditableWarning
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {achievementProvided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    )}
                    {technologies.length > 0 && (
                      <p className="cv-one-column-technologies content">
                        <span className="i-semi-bold">{tr.t("technologies")}:</span>{" "}
                        {technologies.join(" · ")}
                      </p>
                    )}
                  </article>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </OneColumnSection>
);

const Projects = ({ items, tr }) => (
  <OneColumnSection title={tr.t("projects")} className="cv-one-column-projects">
    <Droppable droppableId="projects" type="PROJECTS">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => {
            const dateRange = tr.formatDateRange(item.startYear, item.endYear);
            const achievements =
              typeof item.keyAchievements === "string"
                ? item.keyAchievements.split("\n").filter(hasValue)
                : [];

            return (
              <Draggable
                key={`${item.name}-${index}`}
                draggableId={`PROJECTS-${index}`}
                index={index}
              >
                {(draggableProvided, snapshot) => (
                  <article
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className={`cv-one-column-job cv-resume-item ${
                      snapshot.isDragging ? "cv-one-column-dragging" : ""
                    }`}
                  >
                    {hasValue(item.name) && (
                      <h3 className="cv-one-column-job-company">{item.name}</h3>
                    )}
                    <InlineText
                      items={[]}
                      dateRange={dateRange}
                      className="cv-one-column-job-meta"
                    />
                    {hasValue(item.link) && (
                      <a
                        href={externalHref(item.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-one-column-project-link content"
                      >
                        {item.link}
                      </a>
                    )}
                    {hasValue(item.description) && (
                      <p className="cv-one-column-job-description content">
                        {item.description}
                      </p>
                    )}
                    {achievements.length > 0 && (
                      <Droppable
                        droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                        type="PROJECTS_KEY_ACHIEVEMENT"
                      >
                        {(achievementProvided) => (
                          <ul
                            className="cv-one-column-bullets"
                            {...achievementProvided.droppableProps}
                            ref={achievementProvided.innerRef}
                          >
                            {achievements.map((achievement, subIndex) => (
                              <Draggable
                                key={`${item.name}-${index}-${subIndex}`}
                                draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                index={subIndex}
                              >
                                {(achievementDraggableProvided, achievementSnapshot) => (
                                  <li
                                    ref={achievementDraggableProvided.innerRef}
                                    {...achievementDraggableProvided.draggableProps}
                                    {...achievementDraggableProvided.dragHandleProps}
                                    className={
                                      achievementSnapshot.isDragging
                                        ? "cv-one-column-dragging"
                                        : ""
                                    }
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: achievement,
                                      }}
                                      contentEditable
                                      suppressContentEditableWarning
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {achievementProvided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    )}
                  </article>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </OneColumnSection>
);

const skillSectionHasContent = (section) => {
  if (Array.isArray(section.groups)) {
    return section.groups.some(
      (group) => hasValue(group.groupName) || hasValue(group.skills)
    );
  }

  return Array.isArray(section.skills) && section.skills.some(hasValue);
};

const getSkillSections = (resumeData) => {
  const sections = resumeData.useGroupedSkills
    ? resumeData.groupedSkills || []
    : resumeData.skills || [];

  return sections.filter(skillSectionHasContent);
};

const SkillLines = ({ sections, grouped, tr }) => {
  const lines = [];

  sections.forEach((section) => {
    if (grouped) {
      (section.groups || []).forEach((group) => {
        const value = [group.groupName, group.skills]
          .filter(hasValue)
          .join(": ");
        if (hasValue(value)) lines.push(value);
      });
      return;
    }

    const skills = (section.skills || []).filter(hasValue).join(", ");
    if (skills) lines.push(`${tr.skillTitle(section.title)}: ${skills}`);
  });

  return (
    <div className="cv-one-column-skill-lines">
      {lines.map((line, index) => {
        const separatorIndex = line.indexOf(": ");
        const label = separatorIndex >= 0 ? line.slice(0, separatorIndex) : "";
        const value = separatorIndex >= 0 ? line.slice(separatorIndex + 2) : line;

        return (
          <p className="cv-one-column-skill-line sub-content" key={index}>
            {label && <span className="i-semi-bold">{label}:</span>}{" "}
            {value}
          </p>
        );
      })}
    </div>
  );
};

const TechnicalSkills = ({ section, grouped, tr }) => (
  <OneColumnSection
    title={tr.skillTitle(section.title)}
    className="cv-one-column-technical-skills"
  >
    <SkillLines sections={[section]} grouped={grouped} tr={tr} />
  </OneColumnSection>
);

const SecondarySkills = ({ sections, grouped, tr }) => {
  if (sections.length === 0) return null;

  // Grouped lines don't name their section, so each section keeps its own title.
  if (grouped) {
    return sections.map((section, index) => (
      <OneColumnSection
        key={index}
        title={tr.skillTitle(section.title)}
        className="cv-one-column-secondary-skills"
      >
        <SkillLines sections={[section]} grouped tr={tr} />
      </OneColumnSection>
    ));
  }

  // Simple lines are prefixed with their section title, so one section is enough.
  const title = sections.map((section) => tr.skillTitle(section.title)).join(" / ");

  return (
    <OneColumnSection title={title} className="cv-one-column-secondary-skills">
      <SkillLines sections={sections} grouped={false} tr={tr} />
    </OneColumnSection>
  );
};

const Education = ({ items, tr }) => (
  <OneColumnSection title={tr.t("education")} className="cv-one-column-education">
    {items.map((item, index) => {
      const title = [item.school, item.degree].filter(hasValue).join(" - ");
      const dateRange = tr.formatDateRange(item.startYear, item.endYear);

      return (
        <article className="cv-one-column-education-item" key={index}>
          {title && <p className="content i-bold">{title}</p>}
          {dateRange && (
            <p className="cv-one-column-education-meta sub-content">
              {dateRange}
            </p>
          )}
        </article>
      );
    })}
  </OneColumnSection>
);

const Certifications = ({ certifications, tr }) => (
  <OneColumnSection title={tr.t("certifications")} className="cv-one-column-certifications">
    <ul className="cv-one-column-certification-list sub-content">
      {certifications.map((certification, index) => (
        <li key={index}>
          <span
            dangerouslySetInnerHTML={{ __html: certification }}
            contentEditable
            suppressContentEditableWarning
          />
        </li>
      ))}
    </ul>
  </OneColumnSection>
);

const Languages = ({ languages, tr }) => (
  <OneColumnSection title={tr.t("languages")} className="cv-one-column-languages">
    <p className="sub-content">{languages.join(" · ")}</p>
  </OneColumnSection>
);

const OneColumn = ({ resumeData }) => {
  const tr = useTranslation();
  const grouped = Boolean(resumeData.useGroupedSkills);
  const skills = getSkillSections(resumeData);
  // The first skill section (Technical Skills by default, whatever the user
  // renamed it to) is the main one; reordering sections changes which it is.
  const [technicalSkills = null, ...secondarySkills] = skills;
  const education = (resumeData.education || []).filter(
    (item) =>
      hasValue(item.school) ||
      hasValue(item.degree) ||
      hasValue(item.startYear) ||
      hasValue(item.endYear)
  );
  const certifications = (resumeData.certifications || []).filter(hasValue);
  const languages = (resumeData.languages || []).filter(hasValue);
  const workExperience = resumeData.workExperience || [];
  const projects = resumeData.projects || [];

  return (
    <>
      <OneColumnHeader resumeData={resumeData} />
      <hr className="cv-one-column-divider" />
      {hasValue(resumeData.summary) && (
        <OneColumnSection title={tr.t("summary")} className="cv-one-column-summary">
          <p className="cv-one-column-summary-text content">{resumeData.summary}</p>
        </OneColumnSection>
      )}
      {workExperience.some(workItemHasContent) && (
        <WorkExperience items={workExperience} tr={tr} />
      )}
      {projects.some(projectItemHasContent) && (
        <Projects items={projects} tr={tr} />
      )}
      {technicalSkills && (
        <TechnicalSkills section={technicalSkills} grouped={grouped} tr={tr} />
      )}
      {education.length > 0 && (
        <Education items={education} tr={tr} />
      )}
      {certifications.length > 0 && (
        <Certifications certifications={certifications} tr={tr} />
      )}
      {languages.length > 0 && <Languages languages={languages} tr={tr} />}
      <SecondarySkills sections={secondarySkills} grouped={grouped} tr={tr} />
    </>
  );
};

export default OneColumn;
