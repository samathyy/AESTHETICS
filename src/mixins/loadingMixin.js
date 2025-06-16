// src/mixins/loadingMixin.js

export default {
  data() {
    return {
      loading: true,
      barWidth: 0,
      randomQuote: '',
      quotes: [
        "Design is intelligence made visible",
        "Simplicity is the ultimate sophistication",
        "Where innovation meets aesthetics",
        "Creating visual harmony"
      ]
    }
  },
  methods: {
    startLoading() {
      this.loading = true;
      this.barWidth = 0;
      this.randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      
      const increment = () => {
        if (this.barWidth < 100) {
          this.barWidth += Math.random() * 15;
          if (this.barWidth > 100) this.barWidth = 100;
          setTimeout(increment, 100);
        } else {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      }
      
      increment();
    }
  },
  created() {
    // Force loading state on component creation
    this.loading = true;
  },
  mounted() {
    // Start loading animation when component is mounted
    this.startLoading();
  },
  activated() {
    // Handle when component is re-activated (with keep-alive)
    this.startLoading();
  }
}
