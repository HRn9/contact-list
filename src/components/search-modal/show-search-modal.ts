import { searchModal, searchInput } from "../../consts/temp-consts";
import { disableScroll } from "../../utils/disable-scroll";

export function showSearchModal() {
  searchModal!.parentElement!.classList.remove('hidden')
  disableScroll()
  searchInput.value = '';
}