import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import './index.css'
import App from './App.jsx'

const theme = extendTheme({
  colors: {
    greenOlympcs: {
      50: '#e9f5e8',
      100: '#c7e5c5',
      200: '#a3d5a0',
      300: '#7fc57b',
      400: '#5bb556',
      500: '#369831',
      600: '#2a7a27',
      700: '#1f5c1d',
      800: '#133d13',
      900: '#081f09',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
