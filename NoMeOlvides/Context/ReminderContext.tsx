import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Reminder {
  id: string;
  emoji: string;
  text: string;
}

interface ReminderContextProps {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, updated: { emoji: string; text: string }) => void;
  deleteReminder: (id: string) => void;
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

  const updateReminder = (id: string, updated: { emoji: string; text: string }) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, emoji: updated.emoji, text: updated.text } : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, updateReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
