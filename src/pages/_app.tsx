import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Raleway } from 'next/font/google';

const font = Raleway({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#EA99A3'
    },
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  )
}
