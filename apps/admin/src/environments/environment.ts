export const environment = {
  production: true,
  api: 'https://afraid-melons-peel.loca.lt',
  get assetsURL() {
    return `${this.api}/static`;
  },
};
