const theme = {
  extend: {
    colors: {
      black: {
        primary: "#1B2021",
        opacity50: "1B202122"
      },
      grey: "#7F7F7F",
      white: {
        full: "#FFFFFF",
        primary: "#FFFCF2",
        secondary: "#FAF9F9",
      },
      green: {
        primary: "#9BC53D",
        opacity50: "#9BC53D22",
        opacity90: "#9BC53DCC",
      },
      error: "F02D3A",
      info: "#4EA5FF",
      disabled: { input: "#DCDCDD", button: "#BCBABA" },
    },
    screens: {
      xxs: "370px", // smaller mobile
      xs: "440px", // mobile
      sm: "790px", // dont know
      sl: "900px", // tablet
      lg: "1024px", // pc pequeño
      xl: "1280px", // pc pequeño-mediano
      xxl: "1440px",
      "2xl": "3080px", // pc grande
    },
  },
};

export default theme;
