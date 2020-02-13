var app = new Vue({
    el: '#app',
    data: {
      searchFor: null,
      films: []
    },

    filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },

    computed: {
        sortedFilms() {
          let filmsCopy = this.films.concat();

          return filmsCopy.sort((filmA, filmB) => {
              return filmA.title.localeCompare(filmB.title);
          });
        }
    },
    
    methods: {
      userChangedSearchFor(event) {
          this.searchFor = event.target.value;
          this.loadFilms();
      },
      async loadFilms() {
          //запрос к апи
          let result = await axios.get('https://swapi.co/api/films/?search='+this.searchFor);
          this.films = result.data.results;
      }
    }
  })