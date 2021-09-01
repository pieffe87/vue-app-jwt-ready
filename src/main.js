import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import { createAuth } from '@websanova/vue-auth/src/v3.js';
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.js';
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.js';
// import driverOAuth2Google from '@websanova/vue-auth/dist/drivers/oauth2/google.esm.js';
// import driverOAuth2Facebook from '@websanova/vue-auth/dist/drivers/oauth2/facebook.esm.js';
import store from "./store";
import globalComponents from "./global-components";
import utils from "./utils";
import "./libs";

// SASS Theme
import "./assets/sass/app.scss";

var auth = createAuth({
	plugins: {
		http: axios,
		router: router
	},
	drivers: {
		http: driverHttpAxios,
		auth: driverAuthBearer,
		router: driverRouterVueRouter,
		// oauth2: {
		// 	google: driverOAuth2Google,
		// 	facebook: driverOAuth2Facebook,
		// }
	},
	options: {
		tokenStore: ['localStorage'],
		rolesKey: 'type',
		authRedirect: '/login',
		loginData: {
			url: `${process.env.VUE_APP_AXIOSBASEURL}auth/login`,
			method: 'POST',
			redirect: '/',
			fetchUser: true,
			staySignedIn: false
		},
		registerData: {
			url: `${process.env.VUE_APP_AXIOSBASEURL}auth/register`,
			method: 'POST',
			redirect: '/login',
			autoLogin: false
		},
		fetchData: {
			url: `${process.env.VUE_APP_AXIOSBASEURL}auth/user`,
			method: 'GET',
			redirect: '/',
			fetchUser: true,
			staySignedIn: false
		},
		refreshData: {
			url: `${process.env.VUE_APP_AXIOSBASEURL}auth/refresh`,
			method: 'GET',
			enabled: true,
			interval: 30
		}
	}
});

const app = createApp(App)
  .use(store)
  .use(router)
	.use(auth);

globalComponents(app);
utils(app);

app.mount("#app");
