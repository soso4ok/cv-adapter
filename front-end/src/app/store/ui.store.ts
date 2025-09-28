import { create } from 'zustand';

type UiState = {
  snackbar: { open: boolean; message: string };
  openSnackbar: (message: string) => void;
  closeSnackbar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  snackbar: { open: false, message: '' },
  openSnackbar: (message) => set({ snackbar: { open: true, message } }),
  closeSnackbar: () => set({ snackbar: { open: false, message: '' } }),
}));