# Key Passport

Key Passport allows you to manage your identity, attestations, proofs or any kind keys using your existing Ethereum account. It uses Metamask Snaps as a way to deterministically generate keys based on your existing account and stores those safely in their sandboxed environment. Giving full control and sovereignty over your keys and identities.

## Why

- Inspired by this cast from Vitalik https://warpcast.com/vitalik.eth/0x576454
- New chains, layers and applications require new accounts, identities and signature schemes
- Generate App-specific or ZK-proof credentials to increase privacy

## What

- A MetaMask Snap to manage and interact with your attestations, identities and keys
- Deterministic generation based on a single recovery root
- Upload offchain credentials and proofs
- All managed and safely stored inside your MetaMask account single recovery root

## Demo

- https://key-passport.vercel.app/
- NPM https://www.npmjs.com/package/key-passport

## Configuration

You need the following environment variables to run the app
- INFURA_API_KEY - to create and join Semaphore groups
- DEPLOYER_KEY - to create and join Semaphore groups
- NEXT_PUBLIC_SNAP_ORIGIN - location of deployed Snap, e.g. `npm:key-passport`
  - https://www.npmjs.com/package/key-passport

The app is currently using the deployed version of the [Semaphore protocol](https://semaphore.appliedzkp.org/docs/deployed-contracts) on Sepolia. Only admins can manage groups. You can find scripts to create and join groups under `packages/app/src/scripts`. The admin can be set using the `DEPLOYER_KEY`.

---

## Getting Started

Clone the template-snap repository [using this template](https://github.com/MetaMask/template-snap-monorepo/generate) and setup the development environment:

```shell
yarn install && yarn start
```

## Cloning

This repository contains GitHub Actions that you may find useful, see `.github/workflows` and [Releasing & Publishing](https://github.com/MetaMask/template-snap-monorepo/edit/main/README.md#releasing--publishing) below for more information.

If you clone or create this repository outside the MetaMask GitHub organization, you probably want to run `./scripts/cleanup.sh` to remove some files that will not work properly outside the MetaMask GitHub organization.

Note that the `action-publish-release.yml` workflow contains a step that publishes the frontend of this snap (contained in the `public/` directory) to GitHub pages. If you do not want to publish the frontend to GitHub pages, simply remove the step named "Publish to GitHub Pages" in that workflow.

If you don't wish to use any of the existing GitHub actions in this repository, simply delete the `.github/workflows` directory.

## Contributing

### Testing and Linting

Run `yarn test` to run the tests once.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and fix any automatically fixable issues.

### Releasing & Publishing

The project follows the same release process as the other libraries in the MetaMask organization. The GitHub Actions [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) and [`action-publish-release`](https://github.com/MetaMask/action-publish-release) are used to automate the release process; see those repositories for more information about how they work.

1. Choose a release version.

- The release version should be chosen according to SemVer. Analyze the changes to see whether they include any breaking changes, new features, or deprecations, then choose the appropriate SemVer version. See [the SemVer specification](https://semver.org/) for more information.

2. If this release is backporting changes onto a previous release, then ensure there is a major version branch for that version (e.g. `1.x` for a `v1` backport release).

- The major version branch should be set to the most recent release with that major version. For example, when backporting a `v1.0.2` release, you'd want to ensure there was a `1.x` branch that was set to the `v1.0.1` tag.

3. Trigger the [`workflow_dispatch`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch) event [manually](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) for the `Create Release Pull Request` action to create the release PR.

- For a backport release, the base branch should be the major version branch that you ensured existed in step 2. For a normal release, the base branch should be the main branch for that repository (which should be the default value).
- This should trigger the [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) workflow to create the release PR.

4. Update the changelog to move each change entry into the appropriate change category ([See here](https://keepachangelog.com/en/1.0.0/#types) for the full list of change categories, and the correct ordering), and edit them to be more easily understood by users of the package.

- Generally any changes that don't affect consumers of the package (e.g. lockfile changes or development environment changes) are omitted. Exceptions may be made for changes that might be of interest despite not having an effect upon the published package (e.g. major test improvements, security improvements, improved documentation, etc.).
- Try to explain each change in terms that users of the package would understand (e.g. avoid referencing internal variables/concepts).
- Consolidate related changes into one change entry if it makes it easier to explain.
- Run `yarn auto-changelog validate --rc` to check that the changelog is correctly formatted.

5. Review and QA the release.

- If changes are made to the base branch, the release branch will need to be updated with these changes and review/QA will need to restart again. As such, it's probably best to avoid merging other PRs into the base branch while review is underway.

6. Squash & Merge the release.

- This should trigger the [`action-publish-release`](https://github.com/MetaMask/action-publish-release) workflow to tag the final release commit and publish the release on GitHub.

7. Publish the release on npm.

- Be very careful to use a clean local environment to publish the release, and follow exactly the same steps used during CI.
- Use `npm publish --dry-run` to examine the release contents to ensure the correct files are included. Compare to previous releases if necessary (e.g. using `https://unpkg.com/browse/[package name]@[package version]/`).
- Once you are confident the release contents are correct, publish the release using `npm publish`.

## Notes

- Babel is used for transpiling TypeScript to JavaScript, so when building with the CLI,
  `transpilationMode` must be set to `localOnly` (default) or `localAndDeps`.
