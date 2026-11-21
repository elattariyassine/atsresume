import React, {useId, useState} from "react";
import {BsChevronDown, BsArrowUp, BsArrowDown, BsTrash3, BsPlusLg} from "react-icons/bs";
import {useTranslation} from "../../../i18n/useTranslation";

/* Shared building blocks for the editor panel. Styles live in globals.css
   under "Editor panel". */

export const Field = ({label, counter, className = "", children}) => {
  const id = useId();
  const child = React.Children.only(children);
  return (
    <div className={`field ${className}`}>
      <div className="field-head">
        <label htmlFor={child.props.id || id} className="field-label">{label}</label>
        {counter && (
          <span
            className={`field-counter ${counter.value >= counter.max ? "field-counter-full" : ""}`}
            aria-live="polite"
          >
            {counter.value}/{counter.max}
          </span>
        )}
      </div>
      {React.cloneElement(child, {id: child.props.id || id})}
    </div>
  );
};

export const TextInput = (props) => <input type="text" {...props} className={`form-input ${props.className || ""}`}/>;

export const TextArea = (props) => <textarea {...props} className={`form-input form-textarea ${props.className || ""}`}/>;

export const Select = ({children, ...props}) => (
  <select {...props} className={`form-input ${props.className || ""}`}>{children}</select>
);

export const Section = ({title, count, defaultOpen = true, children}) => {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <section className="form-section">
      <h2 className="form-section-heading">
        <button
          type="button"
          className="form-section-toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen(!open)}
        >
          <span>{title}</span>
          {count !== undefined && <span className="form-count">{count}</span>}
          <BsChevronDown className={`form-chevron ${open ? "rotate-180" : ""}`} aria-hidden="true"/>
        </button>
      </h2>
      <div id={bodyId} hidden={!open} className="form-section-body">
        {children}
      </div>
    </section>
  );
};

export const IconButton = ({label, onClick, disabled, children, tone = "default"}) => (
  <button
    type="button"
    className={`icon-button ${tone === "danger" ? "icon-button-danger" : ""}`}
    aria-label={label}
    title={label}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

/**
 * Open/closed state for a list of item cards, kept by the list so it follows
 * an item when it is moved or when an item above it is removed.
 */
export const useItemCards = () => {
  const [openByIndex, setOpenByIndex] = useState({});
  const toList = (length) => Array.from({length}, (_, i) => openByIndex[i]);
  const fromList = (list) => Object.fromEntries(list.map((value, i) => [i, value]));

  return {
    props: (index, defaultOpen) => ({
      open: openByIndex[index] ?? defaultOpen,
      onToggle: () => setOpenByIndex((current) => ({...current, [index]: !(current[index] ?? defaultOpen)})),
    }),
    move: (length, from, to) => setOpenByIndex(fromList(moveItem(toList(length), from, to))),
    remove: (length, index) => setOpenByIndex(fromList(toList(length).filter((_, i) => i !== index))),
  };
};

/** A collapsible card for one repeatable item (a job, a degree, a project). */
export const ItemCard = ({title, subtitle, index, total, onMove, onRemove, open, onToggle, children}) => {
  const {t} = useTranslation();
  const bodyId = useId();
  return (
    <div className="item-card">
      <div className="item-card-head">
        <button
          type="button"
          className="item-card-toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          <BsChevronDown className={`form-chevron ${open ? "rotate-180" : ""}`} aria-hidden="true"/>
          <span className="min-w-0">
            <span className="item-card-title">{title}</span>
            {subtitle && <span className="item-card-subtitle">{subtitle}</span>}
          </span>
        </button>
        {onMove && (
          <>
            <IconButton label={t("moveUp")} onClick={() => onMove(index, index - 1)} disabled={index === 0}>
              <BsArrowUp/>
            </IconButton>
            <IconButton label={t("moveDown")} onClick={() => onMove(index, index + 1)} disabled={index === total - 1}>
              <BsArrowDown/>
            </IconButton>
          </>
        )}
        <IconButton label={t("remove")} onClick={onRemove} tone="danger">
          <BsTrash3/>
        </IconButton>
      </div>
      <div id={bodyId} hidden={!open} className="item-card-body">
        {children}
      </div>
    </div>
  );
};

/** One line in a simple list (a skill, a language, a certification). */
export const ListRow = ({children, onRemove, removeLabel}) => (
  <div className="list-row">
    {children}
    <IconButton label={removeLabel} onClick={onRemove} tone="danger">
      <BsTrash3/>
    </IconButton>
  </div>
);

export const AddButton = ({label, onClick}) => (
  <button type="button" className="add-button" onClick={onClick}>
    <BsPlusLg aria-hidden="true"/>
    {label}
  </button>
);

export const SegmentedControl = ({label, value, options, onChange}) => {
  const name = useId();
  return (
    <fieldset className="segmented">
      <legend className="field-label">{label}</legend>
      <div className="segmented-track">
        {options.map((option) => (
          <label key={String(option.value)} className="segmented-option">
            <input
              type="radio"
              name={name}
              className="sr-only peer"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="segmented-label">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export const moveItem = (list, from, to) => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const isEmptyValue = (value) =>
  value === undefined || value === null || value === "" ||
  (Array.isArray(value) && value.length === 0);

/** True for a freshly added item, so its card starts open. */
export const isBlankItem = (item, ignored = []) =>
  Object.entries(item).every(([key, value]) => ignored.includes(key) || isEmptyValue(value));
