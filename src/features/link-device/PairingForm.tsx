import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import alertIcon from '../../assets/icons/alert-circle.svg'
import { useNotice } from '../../components/useNotice'
import { paths, type NoticeState } from '../../routes'
import { normalizePairingCode, pairDevice } from './pairingService'

const INPUT_ID = 'pairing-code'
const FORMAT_ERROR_ID = 'pairing-code-format-error'

export function PairingForm() {
  const [code, setCode] = useState('')
  const [formatError, setFormatError] = useState(false)
  const [pending, setPending] = useState(false)
  const { show: showNotice, hide: hideNotice, element: notice } = useNotice()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value.toUpperCase())
    setFormatError(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = normalizePairingCode(code)
    if (!normalized) {
      setFormatError(true)
      return
    }

    setPending(true)
    hideNotice()
    try {
      const result = await pairDevice(normalized)
      if (result.status === 'paired') {
        // Prototype: "Vincular" navigates to Gestión de Alarmas.
        const state: NoticeState = { notice: `Dispositivo ${result.code} vinculado correctamente.` }
        navigate(paths.alarms, { state })
        return
      }
      showNotice('El código de vinculación no fue encontrado.', alertIcon)
    } catch {
      showNotice('No se pudo vincular el dispositivo. Inténtalo de nuevo.', alertIcon)
    }
    setPending(false)
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        bgcolor: 'surfaceContainer',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1.5,
      }}
    >
      <Typography component="label" htmlFor={INPUT_ID} variant="overline" sx={{ color: 'secondary.main' }}>
        Identificador de dispositivo
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <TextField
          id={INPUT_ID}
          value={code}
          onChange={handleChange}
          placeholder="SW-XXXX"
          error={formatError}
          fullWidth
          slotProps={{
            htmlInput: {
              // readOnly rather than disabled so keyboard focus stays on the field while pending.
              readOnly: pending,
              autoComplete: 'off',
              spellCheck: false,
              maxLength: 9,
              'aria-describedby': formatError ? FORMAT_ERROR_ID : undefined,
            },
          }}
        />
        <Button type="submit" variant="contained" loading={pending} sx={{ flexShrink: 0 }}>
          Vincular
        </Button>
      </Box>
      {formatError && (
        <FormHelperText id={FORMAT_ERROR_ID} error sx={{ m: 0 }}>
          Ingresa un código válido con el formato SW-XXXX.
        </FormHelperText>
      )}

      {notice}
    </Box>
  )
}
