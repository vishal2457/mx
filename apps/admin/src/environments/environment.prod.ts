export const environment = {
  production: true,
  api: 'https://localhost:3001',
  get assetsURL() {
    return `${this.api}/static`;
  },
  latestBuildTime: '26/6/2024, 4:10:52 pm',
};
