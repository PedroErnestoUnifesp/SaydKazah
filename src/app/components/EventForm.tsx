import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { Event } from '../App';

type EventFormProps = {
  onSubmit: (event: Omit<Event, 'id'>) => void;
  onCancel?: () => void;
  initialData?: Event;
};

export function EventForm({ onSubmit, onCancel, initialData }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'other' as Event['category'],
    date: '',
    time: '',
    location: '',
    description: '',
    organizer: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        date: initialData.date,
        time: initialData.time,
        location: initialData.location,
        description: initialData.description,
        organizer: initialData.organizer || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }

    if (!formData.date) {
      newErrors.date = 'A data é obrigatória';
    }

    if (!formData.time) {
      newErrors.time = 'O horário é obrigatório';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'O local é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({
          title: '',
          category: 'other',
          date: '',
          time: '',
          location: '',
          description: '',
          organizer: '',
        });
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {initialData ? 'Editar Evento' : 'Novo Evento'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título do Evento"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.category}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={formData.category}
                  label="Categoria"
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  <MenuItem value="music">Música</MenuItem>
                  <MenuItem value="theater">Teatro</MenuItem>
                  <MenuItem value="food">Gastronomia</MenuItem>
                  <MenuItem value="art">Arte</MenuItem>
                  <MenuItem value="workshop">Oficina</MenuItem>
                  <MenuItem value="other">Outros</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organizador"
                value={formData.organizer}
                onChange={(e) => handleChange('organizer', e.target.value)}
                placeholder="Opcional"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Horário"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.time}
                helperText={errors.time}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Local"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                error={!!errors.location}
                helperText={errors.location}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {onCancel && (
                  <Button onClick={onCancel} variant="outlined">
                    Cancelar
                  </Button>
                )}
                <Button type="submit" variant="contained" color="primary">
                  {initialData ? 'Salvar Alterações' : 'Adicionar Evento'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
