import { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, AccessTime, LocationOn } from '@mui/icons-material';
import { events } from '../data/mockData';

const categoryLabels: Record<string, string> = {
  music: 'Música',
  theater: 'Teatro',
  food: 'Gastronomia',
  art: 'Arte',
  workshop: 'Oficina',
  other: 'Outros',
};

const categoryColors: Record<string, string> = {
  music: '#9c27b0',
  theater: '#f44336',
  food: '#ff9800',
  art: '#2196f3',
  workshop: '#4caf50',
  other: '#607d8b',
};

export function Explore() {
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter((event) => {
    const matchesCategory = category === 'all' || event.category === category;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Explorar Eventos
        </Typography>
        <TextField
          fullWidth
          placeholder="Buscar eventos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            bgcolor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { border: 'none' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Tabs
          value={category}
          onChange={(_, newValue) => setCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Todos" value="all" />
          <Tab label="Música" value="music" />
          <Tab label="Teatro" value="theater" />
          <Tab label="Gastronomia" value="food" />
          <Tab label="Arte" value="art" />
          <Tab label="Oficinas" value="workshop" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        {sortedEvents.length === 0 ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary" align="center">
                Nenhum evento encontrado
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sortedEvents.map((event) => (
              <Card key={event.id}>
                <Box
                  sx={{
                    height: 6,
                    bgcolor: categoryColors[event.category],
                  }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flex: 1 }}>
                      {event.title}
                    </Typography>
                    <Chip
                      label={categoryLabels[event.category]}
                      size="small"
                      sx={{
                        bgcolor: categoryColors[event.category],
                        color: 'white',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                      })} às {event.time}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
