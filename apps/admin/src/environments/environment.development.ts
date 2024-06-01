export const environment = {
  production: false,
  api: 'http://localhost:3000',
  socketUrl: 'http://localhost:3000',
  get assetsURL() {
    return `${this.api}/static`;
  },
};
