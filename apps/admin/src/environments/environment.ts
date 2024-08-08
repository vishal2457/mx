export const environment = {
  production: false,
  api: 'http://localhost:3001',
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '@LAST_BUILD_TIME@',
};
