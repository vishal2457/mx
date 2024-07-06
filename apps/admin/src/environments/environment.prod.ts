export const environment = {
  production: true,
  api: 'https://undefined:3000',
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '7/6/2024, 4:10:48 PM',
};
