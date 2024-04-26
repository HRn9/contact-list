import { searchModal, searchListEl } from "../../consts/temp-consts";
import { allowScroll } from "../../utils/allow-scroll";

export function closeSearchModal() {
  searchModal!.parentElement!.classList.add('hidden');
  searchListEl!.innerHTML = '';
  allowScroll()
}
