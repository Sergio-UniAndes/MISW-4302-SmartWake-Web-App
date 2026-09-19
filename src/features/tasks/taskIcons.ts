import addConfirm from '../../assets/icons/add-confirm.svg'
import addFab from '../../assets/icons/add-fab.svg'
import addQuick from '../../assets/icons/add-quick.svg'
import addTag from '../../assets/icons/add-tag.svg'
import arrowBack from '../../assets/icons/arrow-back.svg'
import check from '../../assets/icons/check.svg'
import chevronBackward from '../../assets/icons/chevron-backward.svg'
import close from '../../assets/icons/close.svg'
import info from '../../assets/icons/info.svg'
import play from '../../assets/icons/play.svg'
import search from '../../assets/icons/search.svg'
import tag from '../../assets/icons/tag.svg'
import taskCheck from '../../assets/icons/task-check.svg'
import type { IconAsset } from '../../components/AssetIcon'

// Icons exported from Figma (Vista Gestión de Tareas 310:993, dialogs 319:10612 and 343:777) at their drawn size.
export const taskIcons = {
  addConfirm: { src: addConfirm, width: 20, height: 20 },
  addFab: { src: addFab, width: 16, height: 16 },
  addQuick: { src: addQuick, width: 16, height: 16 },
  addTag: { src: addTag, width: 24, height: 24 },
  arrowBack: { src: arrowBack, width: 24, height: 24 },
  check: { src: check, width: 24, height: 24 },
  chevron: { src: chevronBackward, width: 16, height: 16 },
  close: { src: close, width: 24, height: 24 },
  info: { src: info, width: 18, height: 18 },
  play: { src: play, width: 20, height: 20 },
  search: { src: search, width: 14, height: 14 },
  tag: { src: tag, width: 18, height: 18 },
  taskCheck: { src: taskCheck, width: 14, height: 14 },
} satisfies Record<string, IconAsset>
