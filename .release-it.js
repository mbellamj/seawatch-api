const version = '${version}';
const name = require('./package.json').name;

module.exports = {
  git: {
    requireBranch: 'main',
    tagName: `v${version}`,
    commitMessage: `chore(release): Bumping ${name} to version v${version}`,
    requireCommits: true,
    requireCommitsFail: false,
  },
  hooks: {
    'before:init': [
      'git pull',
      'npm run format',
      'npm run lint',
      'npm run test',
    ],
    'before:git:release': ['git add --all'],
    'after:bump': 'npx auto-changelog -p',
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    releaseName: `${name}-v${version}`,
    autoGenerate: true,
  },
};
