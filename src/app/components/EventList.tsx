import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Event } from '../App';
import { EventForm } from './EventForm';

type EventListProps = {
  events: Event[];
  onDelete: (id: string) => void;
  onEdit: (event: Event) => void;
  filter: Event['category'] | 'all';
  onFilterChange: (filter: Event['category'] | 'all') => void;
};

const categoryLabels: Record<Event['category'] | 'all', string> = {
  all: 'Todos',
  music: 'Música',
  theater: 'Teatro',
  food: 'Gastronomia',
  art: 'Arte',
  workshop: 'Oficina',
  other: 'Outros',
};

const categoryColors: Record<Event['category'], string> = {
  music: '#9c27b0',
  theater: '#f44336',
  food: '#ff9800',
  art: '#2196f3',
  workshop: '#4caf50',
  other: '#607d8b',
};

export function EventList({ events, onDelete, onEdit, filter, onFilterChange }: EventListProps) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleSaveEdit = (updatedEvent: Omit<Event, 'id'>) => {
    if (editingEvent) {
      onEdit({ ...updatedEvent, id: editingEvent.id });
      setEditingEvent(null);
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirm(null);
  };

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Filtrar por categoria</InputLabel>
          <Select
            value={filter}
            label="Filtrar por categoria"
            onChange={(e) => onFilterChange(e.target.value as Event['category'] | 'all')}
          >
            <MenuItem value="all">Todos os eventos</MenuItem>
            <MenuItem value="music">Música</MenuItem>
            <MenuItem value="theater">Teatro</MenuItem>
            <MenuItem value="food">Gastronomia</MenuItem>
            <MenuItem value="art">Arte</MenuItem>
            <MenuItem value="workshop">Oficinas</MenuItem>
            <MenuItem value="other">Outros</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {sortedEvents.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.secondary" align="center">
              Nenhum evento encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              {filter !== 'all'
                ? 'Tente alterar o filtro ou adicione um novo evento.'
                : 'Adicione seu primeiro evento!'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {sortedEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" component="h2">
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
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TimeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {event.time}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>

                  {event.organizer && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.organizer}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(event)}
                    aria-label="editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteConfirm(event.id)}
                    aria-label="excluir"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={!!editingEvent} onClose={() => setEditingEvent(null)} maxWidth="md" fullWidth>
        <DialogTitle>Editar Evento</DialogTitle>
        <DialogContent>
          {editingEvent && (
            <EventForm
              initialData={editingEvent}
              onSubmit={handleSaveEdit}
              onCancel={() => setEditingEvent(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
          <Button
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
