import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider, useThemeMode } from './context/ThemeContext';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

export type Event = {
  id: string;
  title: string;
  category: 'music' | 'theater' | 'food' | 'art' | 'workshop' | 'other';
  date: string;
  time: string;
  location: string;
  description: string;
  organizer?: string;
  venueId: string;
  image?: string;
  views?: number;
};

export type Venue = {
  id: string;
  name: string;
  type: 'park' | 'cultural-center' | 'event-center' | 'theater' | 'gallery' | 'other';
  address: string;
  description: string;
  image?: string;
  eventCount: number;
};

function AppWithTheme() {
  const { darkMode } = useThemeMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#ff4e00' },
      secondary: { main: '#ff4e00' },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}
