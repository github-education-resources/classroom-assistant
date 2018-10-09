# Deployments

GitHub Classroom Assistant can currently only be deployed by the core team. Here are the steps to release an update:

1. Run `npm version [<newversion> | major | minor | patch]` on the `master` branch in your local repository after merging your changes. This should bump the version in the local `package.json` according to the new version and create a tagged commit.
2. Run `git push --tags` to push the new tag to the remote. This will trigger new CI builds on Travis CI and Appveyor which will run tests and then package the app for all platforms.
3. The CI builds will generate a draft release with the new version number under the GitHub Releases for the `education/classroom-assistant` repository. Once all the assets have been uploaded, write a release description and press <kbd>Publish Release</kbd>.