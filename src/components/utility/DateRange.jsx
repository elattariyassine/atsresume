import {useTranslation} from "../../i18n/useTranslation";

const DateRange = ({startYear, endYear, id}) => {
  const {formatDateRange} = useTranslation();

  return (
    <p id={id} className="sub-content">
      {formatDateRange(startYear, endYear, " — ")}
    </p>
  );
};

export default DateRange;
