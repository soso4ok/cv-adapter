import { LoadingButton } from '@mui/lab';

export const GenerateButton = ({
  loading,
  onClick,
}: { loading: boolean; onClick: () => void }) => (
  <LoadingButton
    loading={loading}
    variant="contained"
    onClick={onClick}
    sx={{ mt: 2 }}
  >
    🚀 Generate CV
  </LoadingButton>
);