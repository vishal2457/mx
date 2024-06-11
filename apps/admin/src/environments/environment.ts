export const environment = {
  production: true,
  api: 'http://localhost:3000',
  get assetsURL() {
    return `${this.api}/static`;
  },
};
