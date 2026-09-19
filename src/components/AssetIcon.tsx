import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

/** An icon exported from Figma, with the size it is drawn at in the design. */
export type IconAsset = {
  src: string
  width: number
  height: number
}

type AssetIconProps = {
  icon: IconAsset
  /** Paint the icon with the current text color instead of the SVG's own fill. */
  tinted?: boolean
  sx?: SxProps<Theme>
}

export function AssetIcon({ icon, tinted = false, sx }: AssetIconProps) {
  const size = { width: icon.width, height: icon.height, flexShrink: 0, display: 'block' }
  const extra = Array.isArray(sx) ? sx : [sx]

  if (tinted) {
    const mask = `url("${icon.src}") center / contain no-repeat`
    return (
      <Box
        component="span"
        aria-hidden
        sx={[size, { bgcolor: 'currentColor', mask, WebkitMask: mask }, ...extra]}
      />
    )
  }

  return <Box component="img" src={icon.src} alt="" sx={[size, ...extra]} />
}
