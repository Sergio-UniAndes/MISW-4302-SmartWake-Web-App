import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { ReactNode } from 'react'
import { AssetIcon, type IconAsset } from '../../components/AssetIcon'
import { hoverLayer } from '../../theme'

type ActionButtonProps = {
  icon: IconAsset
  /** `surface`: outlined neutral button. `primary`: filled primary-container button. */
  tone: 'surface' | 'primary'
  onClick: () => void
  children: ReactNode
}

/** Compact icon + two-line label button used in the alarms header and next-alarm banner. */
export function ActionButton({ icon, tone, onClick, children }: ActionButtonProps) {
  const surface = tone === 'surface'
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        flexShrink: 0,
        gap: surface ? 1 : 0.75,
        borderRadius: '12px',
        fontSize: 12,
        lineHeight: '16px',
        textAlign: 'center',
        '&:hover': { backgroundImage: hoverLayer },
        ...(surface
          ? {
              px: '17px',
              py: '11px',
              bgcolor: 'tertiary.container',
              border: 1,
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: 500,
            }
          : {
              px: 2,
              py: 1,
              bgcolor: 'primary.container',
              color: 'primary.onContainer',
              fontWeight: 600,
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
            }),
      }}
    >
      <AssetIcon icon={icon} />
      <Box component="span" sx={{ px: surface ? '10px' : 2 }}>
        {children}
      </Box>
    </ButtonBase>
  )
}
