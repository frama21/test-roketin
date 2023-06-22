import { defineStore } from 'pinia';
import http from '@/plugins/axios';

export const useHomeStore = defineStore('home', {
  state: () => ({
    home_loading: false,
    home_users: [],
  }),
  actions: {
    /**
     * @description for get data
     *
     * @method GET
     * @url https://randomuser.me/api/
     * @param {String} results
     * @public
     *
     * @return {Promise}
     */
    async home_getUser() {
      this.home_loading = true;
      try {
        const response = await http.get('https://randomuser.me/api/?results=25');

        this.home_users = response.data.results;
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.home_loading = false;
      }
    },
  },
});
