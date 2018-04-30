new Vue({

  el: '#notebook',

  data(){
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: null,
    }
  },

  methods: {

    // add a note
    addNote(){
      const time = Date.now()

      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi!** this notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
        created: time,
        favorite: false,
      }
      this.notes.push(note)
      console.log(this.notes)

    },

    removeNote(){
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },

    // retrieve note
    selectNote(note){
      this.selectedId = note.id
    },

    saveNotes(){
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved!', new Date())
    },

    // report operation
    reportOperation(opName){
      console.log('the', opName, 'operation was completed!')
    },
  },

  computed: {
    notePreview(){
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    addButtonTitle(){
      return this.notes.length + ' note(s) added'
    },
    selectedNote(){
      return this.notes.find(note => note.id === this.selectedId)
    },
  },

  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
  },

})
