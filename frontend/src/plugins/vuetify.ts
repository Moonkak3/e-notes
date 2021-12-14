import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import Config from "@/store/config"

Vue.use(Vuetify);
try {
    Config.dark;
} catch (e) {
    localStorage.clear();
    location.reload();
}

export default new Vuetify({
    theme: {
        options: {customProperties: true},
        themes: {
            light: {
                primary: '#009A90',
                secondary: '#314159',
                accent: '#414288',
                error: '#D1345B',
                success: '#4CAF50',
                warning: '#FFC107',
                background: '#eeeeee'
            },
            dark: {
                primary: '#009A90',
                secondary: '#FFFFFF',
                accent: '#7A7DFF',
                error: '#D1345B',
                success: '#4CAF50',
                warning: '#FFC107',
                background: '#1E1E1E'
            },
        },
        dark: Config.dark
    },
});
