import { editModal, editsInputGroup } from "../../consts/temp-consts";
import { decodeItemKey } from "../../utils/decode-Item-key";
import { disableScroll } from "../../utils/disable-scroll";

export function showEditModal(itemKey: string) {
  editModal!.parentElement!.classList.remove('hidden')
  disableScroll()

  editModal!.dataset.initialKey = itemKey;
  const targetContactItem = decodeItemKey(itemKey);
  
  editsInputGroup.forEach((inp) => {
    const content = inp.dataset.content || '';
    if (content in targetContactItem) {
      inp.value = targetContactItem[content as keyof typeof targetContactItem];
    }
  })
}