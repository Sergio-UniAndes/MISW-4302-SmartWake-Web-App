import { useCallback, useState } from 'react'
import { Notice } from './Notice'

type NoticeData = {
  id: number
  message: string
  icon?: string
}

/** Manages a single snackbar. Render `element` anywhere in the page and call `show` to display a message. */
export function useNotice() {
  const [notice, setNotice] = useState<NoticeData | null>(null)
  const [open, setOpen] = useState(false)

  const show = useCallback((message: string, icon?: string) => {
    setNotice({ id: Date.now(), message, icon })
    setOpen(true)
  }, [])

  const hide = useCallback(() => setOpen(false), [])

  const element = notice && (
    <Notice key={notice.id} open={open} message={notice.message} icon={notice.icon} onClose={hide} />
  )

  return { show, hide, element }
}
