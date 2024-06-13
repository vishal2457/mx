export const environment = {
  production: true,
  api: 'https://localhost:3000',
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '@LAST_BUILD_TIME@',
};
