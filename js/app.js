
document.addEventListener('alpine:init', () => {
    Alpine.data('notesApp', () => {
        const manager = new NotesManager();

        return {
            notes: manager.notes,
            newNote: '',
            newCategory: '',
            filterCategory: '',
            get filteredNotes() {
                return this.filterCategory ? this.notes.filter(n => n.category === this.filterCategory) : this.notes;
            },
            addNote() {
                if (!this.newNote.trim()) {
                    alert("La note ne peut pas être vide !");
                    return;
                }
                if (!this.newCategory) {
                    alert("Veuillez sélectionner une catégorie !");
                    return;
                }
                manager.addNote(this.newNote, this.newCategory);
                this.newNote = '';
                this.newCategory = '';
                this.notes = [...manager.notes];
            },
            deleteNote(id) {
                if (confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
                    manager.deleteNote(id);
                    this.notes = [...manager.notes];
                }
            },
            editNote(id) {
                const newText = prompt("Modifier la note :", this.notes.find(n => n.id === id)?.text);
                if (newText !== null) {
                    manager.editNote(id, newText);
                    this.notes = [...manager.notes];
                }
            }
        };
    });
});
