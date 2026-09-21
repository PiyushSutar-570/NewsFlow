import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
      {toast.type === 'success'
        ? <CheckCircle size={16} color="var(--accent-green)" />
        : <AlertCircle size={16} color="var(--accent-coral)" />}
      {toast.msg}
    </div>
  );
}
