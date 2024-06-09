export const environment = {
  production: true,
  api: 'http://194.238.17.220:3000',
  get assetsURL() {
    return `${this.api}/static`;
  },
};
