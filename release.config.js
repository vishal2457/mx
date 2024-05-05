const { execSync } = require('child_process');

module.exports = isDryRun() ? getDryRunConfig() : getCIConfig();

function getDryRunConfig() {
  return {
      repositoryUrl: getLocalRepoUrl(),
      branches: getCurrentBranch(),
      generateNotes: [
        '@semantic-release/release-notes-generator',
      ],
      plugins: [
        [
          "@semantic-release/commit-analyzer",
          {
            "preset": "angular",
            "releaseRules": [
              { "type": "docs", "scope": "README", "release": "patch" },
              { "type": "refactor", "release": "patch" },
              { "type": "style", "release": "patch" }
            ],
            "parserOpts": {
              "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
            }
          }
        ],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
      ],
  };
}

function getCIConfig() {
  // contains your normal semantic-release config
  // this will be used on your CI environment
  return {
    repositoryUrl: getLocalRepoUrl(),
    branches: ['main'],
    plugins: [
      [
        "@semantic-release/commit-analyzer",
        {
          "preset": "angular",
          "releaseRules": [
            { "type": "docs", "scope": "README", "release": "patch" },
            { "type": "refactor", "release": "patch" },
            { "type": "style", "release": "patch" },
            { "type": "feat", "release": "minor" },
            { "type": "bug", "release": "patch" },
            { "type": "perf", "release": "patch" },
          ],
          "parserOpts": {
            "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
          }
        }
      ],
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      // '@semantic-release/npm',
      // '@semantic-release/github',
    ],
  };
}

function isDryRun() {
  return process.argv.includes('--dry-run');
}

function getLocalRepoUrl() {
  const topLevelDir = execSync('git rev-parse --show-toplevel')
    .toString()
    .trim();

  return `file://${topLevelDir}/.git`;
}

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
