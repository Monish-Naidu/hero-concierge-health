// Colors are now loaded from API and set as CSS variables
// Default values are used as fallback
const colors = {
    gradientFromBooking: "var(--gradient-from-booking, #A86A45)",
    gradientToBooking: "var(--gradient-to-booking, #D8BFA6)",
    hoverBooking: "var(--hover-booking, rgb(245,239,231))",
    borderBooking: "var(--border-booking, rgb(245,239,231))",
    textColorInBg: "var(--text-color-in-bg, #ffffff)",
    textColorSelectText: "var(--text-color-select-text, #45597c)",
    sectionColor: "var(--section-color, #f5f8ff)",
    textColorMain: "var(--text-color-main, #2d2525)",
    background: "var(--background, #fff)",
    popover: "var(--popover, #fff)",
    ring: "var(--ring, rgba(168,106,69,0.4))"
};

const config = {
    theme: {
        extend: {
            colors,
        },
    },
};

export default config;
