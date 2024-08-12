export const environment = {
  production: true,
  api: 'https://undefined:3001',
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '12/8/2024, 4:29:32 pm',
};
