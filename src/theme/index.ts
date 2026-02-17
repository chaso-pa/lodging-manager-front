import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif",
  headings: {
    fontWeight: '600'
  },
  defaultRadius: 'md',
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 2px 6px rgba(0, 0, 0, 0.08)'
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md'
      }
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        padding: 'lg'
      }
    },
    Badge: {
      defaultProps: {
        radius: 'md',
        variant: 'light'
      }
    },
    Modal: {
      defaultProps: {
        radius: 'lg'
      }
    },
    Drawer: {
      defaultProps: {
        radius: 'lg'
      }
    },
    Notification: {
      defaultProps: {
        radius: 'md'
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    Table: {
      defaultProps: {
        highlightOnHover: true,
        withTableBorder: true,
        withColumnBorders: false
      }
    }
  }
});
