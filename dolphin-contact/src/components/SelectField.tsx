"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  required?: boolean;
};

export function SelectField({
  id,
  name,
  value,
  onChange,
  options,
  required,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const buttonId = id ?? `${name}-select`;

  const placeholder =
    options.find((option) => option.value === "")?.label ?? "Select an option";
  const selectableOptions = options.filter((option) => option.value !== "");
  const selectedOption = selectableOptions.find((option) => option.value === value);
  const hasSelection = value !== "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function openList() {
    const selectedIndex = selectableOptions.findIndex(
      (option) => option.value === value,
    );
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  }

  function closeList() {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function selectOption(optionValue: string) {
    onChange(optionValue);
    closeList();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOpen) {
        openList();
      }
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setHighlightedIndex(selectableOptions.length - 1);
        setIsOpen(true);
      }
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (!isOpen) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) =>
        current < selectableOptions.length - 1 ? current + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : selectableOptions.length - 1,
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = selectableOptions[highlightedIndex];
      if (option) {
        selectOption(option.value);
      }
    }

    if (event.key === "Tab") {
      closeList();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => (isOpen ? closeList() : openList())}
        onKeyDown={handleTriggerKeyDown}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#1a2238] px-4 py-3 text-left text-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-[#1f2842] focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 ${
          isOpen
            ? "border-blue-400/60 bg-[#1f2842] ring-2 ring-blue-500/20"
            : "border-white/10"
        }`}
      >
        <span className={hasSelection ? "text-white" : "text-slate-400"}>
          {hasSelection ? selectedOption?.label : placeholder}
        </span>

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`ml-3 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-300" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-white/10 bg-[#121a2f] p-1.5 shadow-2xl shadow-black/40 backdrop-blur"
        >
          {selectableOptions.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => selectOption(option.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm transition-all duration-150 ${
                    isSelected
                      ? "bg-blue-500/20 text-white"
                      : isHighlighted
                        ? "bg-white/10 text-white"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="pr-3">{option.label}</span>
                  {isSelected ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-blue-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
