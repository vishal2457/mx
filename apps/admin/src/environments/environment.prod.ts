export const environment = {
  production: true,
  api: 'http://undefined:3000',
  get assetsURL() {
    return 'this.api' + '/static';
  },
  latestBuildTime: 'Thu Jun 13 2024, 16:31',
};
