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

    // add a note
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

    // delete note
    removeNote(){
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },

    // clear note contents
    clearNote(){
      if(this.selectedNote && confirm('Clear note contents?')){
        this.selectedNote.content = "";
      }
    },

    // set favorite
    favoriteNote(){
      this.selectedNote.favorite = !this.selectedNote.favorite
    },

    // add gif image
    addGif(){
      alert('Not working right now')
      console.log("add a gif image?")
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
    // note preview
    notePreview(){
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    // note count
    addButtonTitle(){
      return this.notes.length + ' note(s) added'
    },
    // selected note
    selectedNote(){
      return this.notes.find(note => note.id === this.selectedId)
    },
    // sort notes sidebar
    sortedNotes(){
      return this.notes.slice()
        .sort((a, b) => a.created - b.created)
        .sort((a, b) => (a.favorite === b.favorite) ? 0
          : a.favorite? -1
          : 1)
    },
    // line count
    linesCount(){
      if(this.selectedNote){
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    // word count
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
    // character count
    charactersCount(){
      return this.selectedNote.content.replace(/\r\n|\r|\n/g, '').split('').length
    },
    // searchGiphy
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
