import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import {useTranslation} from "../../../i18n/useTranslation";

const FormButton = ({ size, remove, add }) => {
  const {t} = useTranslation();

    return (
      <div className="flex-wrap-gap-2 mb-2">
        <button type="button" onClick={add}
          aria-label={t('add')}
          className="p-2 text-white bg-fuchsia-700 rounded text-xl">
          <MdAddCircle />
        </button>
        {
          size > 0 &&
          <button type="button" onClick={remove}
            aria-label={t('remove')}
            className="p-2 text-white bg-fuchsia-700 rounded text-xl">
            <MdRemoveCircle />
          </button>
        }
      </div>
    )
  }

export default FormButton;
