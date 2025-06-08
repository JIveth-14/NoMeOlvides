import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Reminder {
  id: string;
  emoji: string;
  text: string;
}

interface ReminderContextProps {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
}

const ReminderContext = createContext<ReminderContextProps | undefined>(undefined);

export const useReminders = () => {
  const context = useContext(ReminderContext);
  if (!context) throw new Error('useReminders must be used within ReminderProvider');
  return context;
};

export const ReminderProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', emoji: '🔌', text: 'Llevar cargador' },
    { id: '2', emoji: '📚', text: 'Regresar libro' },
    { id: '3', emoji: '🚿', text: 'Cerrar la llave' },
  ]);

  const addReminder = (reminder: Reminder) => {
    setReminders((prev) => [...prev, reminder]);
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};