export const environment = {
  production: true,
  api: 'host.internal.docker:3000',
  get assetsURL() {
    return `${this.api}/static`;
  },
};
