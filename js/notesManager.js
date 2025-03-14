class NotesManager {
    constructor() {
        this.notes = StorageManager.load('notes');
    }

    addNote(text, category) {
        if (!text.trim()) return;
        this.notes.push({ id: Date.now(), text, category, date: new Date().toLocaleDateString() });
        this.saveNotes();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
    }

    editNote(id, newText) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            // Crée un nouvel objet pour la note modifiée
            const updatedNote = { ...this.notes[noteIndex], text: newText };
            
            // Remplace l'ancienne note par la nouvelle dans le tableau
            this.notes = [
                ...this.notes.slice(0, noteIndex), 
                updatedNote, 
                ...this.notes.slice(noteIndex + 1)
            ];
            this.saveNotes();
        }
    }

    saveNotes() {
        StorageManager.save('notes', this.notes);
    }
}