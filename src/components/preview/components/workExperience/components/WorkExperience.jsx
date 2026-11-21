import React from 'react';
import DateRange from "../../../../utility/DateRange";
import dynamic from "next/dynamic";
import {useTranslation} from "../../../../../i18n/useTranslation";

const Droppable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Droppable),
  {ssr: false}
);
const Draggable = dynamic(
  () => import("@hello-pangea/dnd").then((mod) => mod.Draggable),
  {ssr: false}
);

const WorkExperience = ({item, index}) => {
  const {t, workTypeLabel} = useTranslation();
  const workMeta = [
    item.location?.trim(),
    item.workType && item.workType !== "None" ? workTypeLabel(item.workType) : null,
  ].filter(Boolean).join(" · ");
  const technologies = (item.technologies || []).filter(
    (technology) => technology.category?.trim() || technology.tech?.trim()
  );

  return (
    <Draggable
      key={`${item.company}-${index}`}
      draggableId={`WORK_EXPERIENCE-${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-1 ${
            snapshot.isDragging &&
            "outline-dashed outline-2 outline-gray-400 bg-white"
          }`}
        >
          <div className="flex flex-row justify-between space-y-1">
            <p className="content i-bold">{item.company}</p>
            <DateRange
              startYear={item.startYear}
              endYear={item.endYear}
              id={`work-experience-start-end-date`}
            />
          </div>
          <div className="flex justify-between items-baseline gap-2">
            <p className="content">{item.position}</p>
            {workMeta && <p className="sub-content text-right">{workMeta}</p>}
          </div>
          <p className="content hyphens-auto">{item.description}</p>

          <Droppable
            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
          >
            {(provided) => (
              <ul
                className="list-disc ul-padding content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {typeof item.keyAchievements === "string" &&
                  item.keyAchievements
                    .split("\n")
                    .map((achievement, subIndex) => (
                      <Draggable
                        key={`${item.company}-${index}-${subIndex}`}
                        draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                        index={subIndex}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                                          hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                          ${
                              snapshot.isDragging &&
                              "outline-dashed outline-2 outline-gray-400 bg-white"
                            }`}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: achievement,
                              }}
                              contentEditable
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>

          {technologies.length > 0 && (
            <div className="mb-1">
              <p className="content i-semi-bold">{t('technologies')}</p>
              {technologies.map((technology, techIndex) => (
                <p key={techIndex} className="content">
                  {technology.category && (
                    <span className="underline">{technology.category}:</span>
                  )}{" "}
                  {technology.tech}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default WorkExperience;
