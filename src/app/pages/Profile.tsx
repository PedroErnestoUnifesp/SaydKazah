import { Box, Typography, Avatar, Card, CardContent, Chip, Button, useTheme } from '@mui/material';
import { Bookmark, MusicNote, TheaterComedy, Palette } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export function Profile() {
  const navigate = useNavigate();
  const theme = useTheme();

  const preferences = [
    { icon: <MusicNote />, label: 'Música', color: '#9c27b0' },
    { icon: <TheaterComedy />, label: 'Teatro', color: '#f44336' },
    { icon: <Palette />, label: 'Arte', color: '#2196f3' },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      <Box sx={{ bgcolor: '#ff4e00', color: 'white', p: 3, pb: 5 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Perfil</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.25)', fontSize: 40, border: '3px solid rgba(255,255,255,0.5)' }}>
            U
          </Avatar>
          <Typography variant="h6">Usuário</Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, mt: -3 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Preferências</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {preferences.map((pref) => (
                <Chip key={pref.label} icon={pref.icon} label={pref.label} sx={{ bgcolor: pref.color, color: 'white' }} />
              ))}
            </Box>
          </CardContent>
        </Card>

        <Button
          fullWidth variant="contained" startIcon={<Bookmark />}
          onClick={() => navigate('/saved')}
          sx={{ mb: 2, bgcolor: '#ff4e00', py: 1.5, '&:hover': { bgcolor: '#cc3d00' } }}
        >
          Ver Eventos Salvos
        </Button>
      </Box>
    </Box>
  );
}
