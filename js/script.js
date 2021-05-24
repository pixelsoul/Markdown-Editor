Vue.filter('date', time => moment(time)
  .format('MMM DD, YYYY, HH:mm a'))

new Vue({

  el: '#notebook',

  data(){
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: null,
    }
  },

  methods: {
    addNote(){
      const time = Date.now()

      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi!** this notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting! \n\r [![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/6A5EpqqDOdk/0.jpg)](http://www.youtube.com/watch?v=6A5EpqqDOdk) \n\r ![sprinkle](https://media.giphy.com/media/xTiTnEHBh7qapyuvwQ/giphy.gif)',
        created: time,
        favorite: false,
      }
      this.notes.push(note)
    },
    removeNote(){
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },
    clearNote(){
      if(this.selectedNote && confirm('Clear note contents?')){
        this.selectedNote.content = "";
      }
    },
    favoriteNote(){
      this.selectedNote.favorite = !this.selectedNote.favorite
    },
    addGif(){
      alert('Not working right now')
      console.log("add a gif image?")
    },
    selectNote(note){
      this.selectedId = note.id
      localStorage.setItem('selectedNote', note.id)
    },
    saveNotes(){
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
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
      let selected = localStorage.getItem('selectedNote') ?? null

      return this.notes.find(note => note.id === this.selectedId) ?? this.sortedNotes[0]
    },
    sortedNotes(){
      return this.notes.slice()
        .sort((a, b) => b.created - a.created)
        .sort((a, b) => (a.favorite === b.favorite) ? 0
          : a.favorite? -1
          : 1)
    },
    linesCount(){
      if(this.selectedNote){
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    wordsCount(){
      if(this.selectedNote){
        var s = this.selectedNote.content
        // turn new line characters into white space
        s = s.replace(/\n/g, ' ')
        // exclude start and end white spaces
        s = s.replace(/(^\s*) | (\s*$)/gi, '')
        // turn 2 or more duplicate white space into 1
        s = s.replace(/\s\s+/gi, ' ')
        // return the number of spaces
        return s.split(' ').length
      }
    },
    charactersCount(){
      return this.selectedNote.content.replace(/\r\n|\r|\n/g, '').split('').length
    },
    searchGif(){
      //
    },
  },

  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
  },

})
