import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'
import apartmentIcon from '../../assets/icons/apartment.svg'
import addIcon from '../../assets/icons/add-fab.svg'
import homeIcon from '../../assets/icons/home.svg'
import nearMeIcon from '../../assets/icons/near-me.svg'
import searchIcon from '../../assets/icons/search.svg'
import { AssetIcon } from '../../components/AssetIcon'
import { ShellTopBar } from '../../layout/ShellTopBar'

type Location = { id: number; name: string; address: string; type: 'Casa' | 'Trabajo' | 'Otro' }

const initialLocations: Location[] = [
  { id: 1, name: 'Casa', address: 'Carrera 13 # 93-24, Bogotá', type: 'Casa' },
  { id: 2, name: 'Trabajo', address: 'Calle 100 # 8A-55, Bogotá', type: 'Trabajo' },
]

const icons = {
  Casa: { src: homeIcon, width: 11, height: 12 },
  Trabajo: { src: apartmentIcon, width: 12, height: 12 },
  Otro: { src: nearMeIcon, width: 12, height: 12 },
}

export function LocationsPage() {
  const [locations, setLocations] = useState(initialLocations)
  const [query, setQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return normalizedQuery
      ? locations.filter(({ name: locationName, address: locationAddress }) =>
          `${locationName} ${locationAddress}`.toLowerCase().includes(normalizedQuery),
        )
      : locations
  }, [locations, query])

  const closeDialog = () => {
    setDialogOpen(false)
    setName('')
    setAddress('')
    setEditingId(null)
  }

  const saveLocation = () => {
    if (!name.trim() || !address.trim()) return
    setLocations((current) => editingId === null
      ? [...current, { id: Date.now(), name: name.trim(), address: address.trim(), type: 'Otro' }]
      : current.map((location) => location.id === editingId ? { ...location, name: name.trim(), address: address.trim() } : location),
    )
    closeDialog()
  }

  const openEditDialog = (location: Location) => {
    setEditingId(location.id)
    setName(location.name)
    setAddress(location.address)
    setDialogOpen(true)
  }

  return (
    <>
      <ShellTopBar title="Dashboard" />
      <Box component="main" sx={{ flex: 1, px: { xs: 2, sm: 4, md: 6 }, pt: { xs: 3, sm: 4 }, pb: { xs: 4, sm: 6 }, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 1120, width: '100%', boxSizing: 'border-box' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: 28, sm: 32 }, lineHeight: '40px' }}>Gestión de Ubicaciones</Typography>
            <Typography sx={{ mt: 0.75, color: 'text.secondary', fontSize: 14 }}>Administra los lugares que usas en tus rutinas y alarmas.</Typography>
          </Box>
          <Button variant="contained" startIcon={<AssetIcon icon={{ src: addIcon, width: 16, height: 16 }} />} onClick={() => setDialogOpen(true)}>Nueva ubicación</Button>
        </Box>

        <TextField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar ubicación" aria-label="Buscar ubicación" fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><AssetIcon icon={{ src: searchIcon, width: 14, height: 14 }} /></InputAdornment> } }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="h2" component="h2">Mis ubicaciones</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{filteredLocations.length} guardadas</Typography>
        </Box>

        {filteredLocations.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 2 }}>
            {filteredLocations.map((location) => (
              <Card key={location.id}>
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'primary.container', color: 'primary.onContainer' }}><AssetIcon icon={icons[location.type]} /></Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{location.name}</Typography>
                      <Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: 13, lineHeight: '20px' }}>{location.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: -0.5 }}>
                      <ButtonBase sx={{ color: 'text.secondary', fontSize: 12, p: 0.5 }} aria-label={`Editar ${location.name}`} onClick={() => openEditDialog(location)}>Editar</ButtonBase>
                      <ButtonBase sx={{ color: 'text.secondary', fontSize: 12, p: 0.5 }} aria-label={`Eliminar ${location.name}`} onClick={() => setLocations((current) => current.filter(({ id }) => id !== location.id))}>Eliminar</ButtonBase>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, pt: 1.5, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>Usada en tus rutinas</Typography>
                    <Typography sx={{ color: 'primary.main', fontSize: 12, fontWeight: 700 }}>Ver detalles</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ py: 8, textAlign: 'center', border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="h2">No encontramos ubicaciones</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>Prueba con otra búsqueda o agrega una nueva ubicación.</Typography>
          </Box>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingId === null ? 'Nueva ubicación' : 'Editar ubicación'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '8px !important' }}>
          <TextField autoFocus label="Nombre" placeholder="Ej. Gimnasio" value={name} onChange={(event) => setName(event.target.value)} />
          <TextField label="Dirección" placeholder="Escribe una dirección" value={address} onChange={(event) => setAddress(event.target.value)} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button variant="contained" onClick={saveLocation} disabled={!name.trim() || !address.trim()}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}