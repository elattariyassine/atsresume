const GroupedSkills = ({title, groups = []}) => {
  const visibleGroups = groups.filter(
    (group) => group.groupName?.trim() || group.skills?.trim()
  );

  if (visibleGroups.length === 0) return null;

  return (
    <>
      <h2 className="section-title mb-1 border-b-2 border-gray-300">{title}</h2>
      {visibleGroups.map((group, index) => (
        <div key={index} className="mb-1">
          {group.groupName && (
            <p className="sub-content i-semi-bold underline">{group.groupName}:</p>
          )}
          <p className="sub-content">{group.skills}</p>
        </div>
      ))}
    </>
  );
};

export default GroupedSkills;
