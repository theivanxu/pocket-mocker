import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export const toasts = writable<ToastMessage[]>([]);

let idCounter = 0;

export function showToast(message: string, type: ToastType = 'info', duration = 3000) {
  const id = idCounter++;
  const newToast = { id, message, type };
  
  toasts.update(all => [...all, newToast]);

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

export function removeToast(id: number) {
  toasts.update(all => all.filter(t => t.id !== id));
}
