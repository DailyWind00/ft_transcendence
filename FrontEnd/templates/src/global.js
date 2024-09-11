export default {
    data() {
      return {
        my_font_size: localStorage.getItem('my_font_size') || 'medium',
        my_BG_color: localStorage.getItem('my_BG_color') || 'purple' ,
        my_daltonism: localStorage.getItem('my_daltonism') || 'without'
      };
    },
    methods: {
      set_font_size(size) {
        this.my_font_size = `${size}`;
        localStorage.setItem('my_font_size', this.my_font_size);
        window.location.reload();
      },
      get_font_size() {
        return this.my_font_size;
      },
      set_BG_color(color) {
        this.my_BG_color = `${color}`;
        localStorage.setItem('my_BG_color', this.my_BG_color);
        window.location.reload();
      },
      get_BG_color() {
        return this.my_BG_color;
      },
      set_daltonism(daltonism) {
        this.my_daltonism = `${daltonism}`;
        localStorage.setItem('my_daltonism', this.my_daltonism);
        window.location.reload();
      },
      get_daltonism() {
        return this.my_daltonism;
      },
    }
  };