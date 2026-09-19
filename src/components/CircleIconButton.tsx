import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { AssetIcon, type IconAsset } from './AssetIcon'
import { hoverLayer } from '../theme'

type CircleIconButtonProps = {
  icon: IconAsset
  /** Accessible name, also shown as a tooltip on hover (M3 guidance for icon buttons on web). */
  label: string
  /** Omit for purely informational buttons whose content is the tooltip. */
  onClick?: () => void
  /** `outlined`: container with border (M3 icon button in the Figma kit). `tonal`: same fill, no border. */
  variant?: 'outlined' | 'tonal'
}

/** 40px round icon button inside a 48px touch target. */
export function CircleIconButton({ icon, label, onClick, variant = 'outlined' }: CircleIconButtonProps) {
  const outlined = variant === 'outlined'
  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={onClick}
        sx={{
          flexShrink: 0,
          width: 40,
          height: 40,
          m: '4px',
          p: 0,
          color: 'text.primary',
          bgcolor: 'surfaceContainer',
          border: outlined ? 1 : 0,
          borderColor: 'divider',
          transition: 'background-color 200ms cubic-bezier(0.2, 0, 0, 1)',
          '&:hover': { bgcolor: 'surfaceContainer', backgroundImage: hoverLayer },
        }}
      >
        <AssetIcon icon={icon} tinted />
      </IconButton>
    </Tooltip>
  )
}
