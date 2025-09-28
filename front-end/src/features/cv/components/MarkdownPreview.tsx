import ReactMarkdown from 'react-markdown';
import { Paper, Box, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const MarkdownPreview = ({
  markdown,
  onCopy,
}: { markdown: string; onCopy: () => void }) => (
  <Paper sx={{ p: 2, mt: 3 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h6">✨ Adapted CV</Typography>
      <Tooltip title="Copy Markdown">
        <IconButton onClick={onCopy} size="small">
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
    <Box 
      sx={{ 
        mt: 1,
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          color: 'primary.main',
          borderBottom: '1px solid',
          borderColor: 'divider',
          paddingBottom: 1,
          marginTop: 2,
          marginBottom: 1,
        },
        '& h1': { fontSize: '1.8rem', fontWeight: 'bold' },
        '& h2': { fontSize: '1.5rem', fontWeight: 'bold' },
        '& h3': { fontSize: '1.3rem', fontWeight: 'bold' },
        '& p': {
          marginBottom: 1,
          lineHeight: 1.6,
        },
        '& ul, & ol': {
          paddingLeft: 3,
          marginBottom: 1,
        },
        '& li': {
          marginBottom: 0.5,
        },
        '& strong': {
          fontWeight: 'bold',
          color: 'primary.main',
        },
        '& em': {
          fontStyle: 'italic',
        },
        '& code': {
          backgroundColor: 'action.hover',
          padding: '2px 4px',
          borderRadius: 1,
          fontFamily: 'monospace',
        },
        '& pre': {
          backgroundColor: 'action.hover',
          padding: 2,
          borderRadius: 1,
          overflow: 'auto',
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          paddingLeft: 2,
          marginLeft: 0,
          fontStyle: 'italic',
        },
      }}
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Box>
  </Paper>
);