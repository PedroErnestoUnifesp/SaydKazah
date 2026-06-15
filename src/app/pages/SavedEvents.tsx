import { useNavigate } from 'react-router';
import { Box, Typography, Card, CardContent, IconButton, Chip, useTheme } from '@mui/material';
import { ArrowBack, AccessTime, LocationOn } from '@mui/icons-material';

const categoryColors: Record<string, string> = {
  music: '#9c27b0', theater: '#f44336', food: '#ff9800', art: '#2196f3', workshop: '#4caf50', other: '#607d8b',
};
const categoryLabels: Record<string, string> = {
  music: 'Música', theater: 'Teatro', food: 'Gastronomia', art: 'Arte', workshop: 'Oficina', other: 'Outros',
};

export function SavedEvents() {
  const navigate = useNavigate();
  const theme = useTheme();

  const savedEvents = [
    { id: '1', title: 'Festival de Jazz na Cidade', category: 'music' as const, date: '2026-06-15', time: '20:00', location: 'Parque da Cidade' },
    { id: '3', title: 'Festival Gastronômico', category: 'food' as const, date: '2026-05-25', time: '11:00', location: 'Centro de Eventos' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Box sx={{ bgcolor: '#ff4e00', color: 'white', p: 2, pb: 4 }}>
        <IconButton onClick={() => navigate('/profile')} sx={{ color: 'white', mb: 1 }}><ArrowBack /></IconButton>
        <Typography variant="h5">Eventos Salvos</Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          {savedEvents.length} {savedEvents.length === 1 ? 'evento salvo' : 'eventos salvos'}
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {savedEvents.length === 0 ? (
          <Card><CardContent><Typography color="text.secondary" align="center">Você ainda não salvou nenhum evento</Typography></CardContent></Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {savedEvents.map((event) => (
              <Card key={event.id} onClick={() => navigate(`/event/${event.id}`)} sx={{ cursor: 'pointer' }}>
                <Box sx={{ height: 6, bgcolor: categoryColors[event.category] }} />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flex: 1 }}>{event.title}</Typography>
                    <Chip label={categoryLabels[event.category]} size="small" sx={{ bgcolor: categoryColors[event.category], color: 'white' }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })} às {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{event.location}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
