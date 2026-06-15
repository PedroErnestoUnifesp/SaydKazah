import { Box, Typography, Card, CardContent, Chip, IconButton, useTheme } from '@mui/material';
import { AccessTime, LocationOn, Visibility, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { events, venues } from '../data/mockData';

const categoryColors: Record<string, string> = {
  music: '#9c27b0', theater: '#f44336', food: '#ff9800', art: '#2196f3', workshop: '#4caf50', other: '#607d8b',
};
const categoryLabels: Record<string, string> = {
  music: 'Música', theater: 'Teatro', food: 'Gastronomia', art: 'Arte', workshop: 'Oficina', other: 'Outros',
};
const venueTypeLabels: Record<string, string> = {
  park: 'Parque', 'cultural-center': 'Centro Cultural', 'event-center': 'Centro de Eventos',
  theater: 'Teatro', gallery: 'Galeria', other: 'Outro',
};

export function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const popularEvents = [...events].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      <Box sx={{ bgcolor: '#ff4e00', color: 'white', p: 3, pb: 4 }}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Olá! 👋</Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Descubra eventos incríveis na sua cidade
        </Typography>
      </Box>

      <Box sx={{ p: 2, mt: -2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Eventos Populares</Typography>
          <Visibility sx={{ color: 'text.secondary', fontSize: 20 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, mb: 3 }}>
          {popularEvents.map((event) => (
            <Card
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              sx={{ minWidth: 280, maxWidth: 280, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}
            >
              <Box
                sx={{
                  height: 140,
                  bgcolor: categoryColors[event.category],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative',
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'center', px: 2 }}>{event.title}</Typography>
                <Chip
                  label={categoryLabels[event.category]}
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.3)', color: 'white' }}
                />
              </Box>
              <CardContent sx={{ pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} às {event.time}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" noWrap>{event.location}</Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mt: 1.5,
                    mb: 1.5,
                    fontSize: '0.85rem',
                    lineHeight: 1.3,
                  }}
                >
                  {event.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <Visibility sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">{event.views} visualizações</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>Locais com Eventos</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {venues.map((venue) => {
            const venueEvents = events.filter(e => e.venueId === venue.id);
            return (
              <Card
                key={venue.id}
                onClick={() => navigate(`/venue/${venue.id}`)}
                sx={{ cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateX(4px)', boxShadow: 3 } }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box
                    sx={{
                      width: 120, minHeight: 120, bgcolor: '#ff4e00',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 40,
                    }}
                  >
                    {venue.type === 'park' && '🌳'}
                    {venue.type === 'cultural-center' && '🎭'}
                    {venue.type === 'event-center' && '🎪'}
                    {venue.type === 'theater' && '🎬'}
                    {venue.type === 'gallery' && '🖼️'}
                    {venue.type === 'other' && '📍'}
                  </Box>
                  <CardContent sx={{ flex: 1, position: 'relative', pr: 5 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>{venue.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      {venueTypeLabels[venue.type]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem' }}>
                      {venue.description}
                    </Typography>
                    <Chip
                      label={`${venueEvents.length} eventos`}
                      size="small"
                      sx={{ fontSize: '0.75rem', bgcolor: '#ff4e00', color: 'white' }}
                    />
                    <IconButton sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
                      <ChevronRight />
                    </IconButton>
                  </CardContent>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
