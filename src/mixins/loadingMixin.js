// src/mixins/loadingMixin.js
export default {
  data() {
    return {
      navLoading: false
    };
  },
  methods: {
    showNavLoading() {
      this.navLoading = true;
    },
    hideNavLoading() {
      this.navLoading = false;
    }
  }
};
