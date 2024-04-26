export const controlsWrapper = document.querySelector(".controls__wrapper");
export const [nameInputMain, vacancyInputMain, phoneNumInputMain] =
  document.querySelectorAll(
    ".controls__input"
  ) as unknown as HTMLInputElement[];
export const editsInputGroup = document.querySelectorAll(
  ".editors__input"
) as unknown as HTMLInputElement[];

export const contactListEl = document.querySelector(".contact-list");
export const editModal = document.querySelector(".editor-modal") as HTMLElement;

export const searchModal = document.querySelector(".search-modal");
export const searchListEl = document.querySelector(
  ".search-list"
) as HTMLElement;
export const searchInput = document.querySelector(
  ".search-inp"
) as HTMLInputElement;
