export const environment = {
  production: false,
  api: `http://194.238.17.220:3000`,
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '',
};
