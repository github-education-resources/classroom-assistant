# Deployments

GitHub Classroom Assistant can currently only be deployed by the core team. In order to create a release there are several steps.

## Making changes, approving them, and merging them

Work on Classroom Assistant should happen in feature branches. Once you have created a change you can open a pull request (Dependabot will also automatically open pull requests for security updates). Once the pull request is opened it needs to be reviewed.

To review a pull request for Classroom Assistant you should review the code but also check out the branch locally and test it. Check the change but also check that logging in, finding assignments and cloning all work as well.

Once the pull request has been reviewed and approved it can safely be merged. Merging the pull request _does not_ create a release but it does update the code on the default branch. You can merge multiple branches without creating a release (for example you might merge four security updates to the default branch at once, then create a single release).

Long term unreleased code is dangerous - if you merge a pull request (or multiple pull requests) you should also create a subsequent release within a few days at most.

## Creating a release

Once you have merged all of the changes, it is time to create a release!

<img width="573" alt="image" src="https://user-images.githubusercontent.com/4064/102400404-bb014900-3f96-11eb-9742-5ee146c079c7.png">

Start by checking out the default branch and pulling all of the changes locally. Still on the default branch run the following command:

```
npm version <new version number>
```

For example:

```
npm version 2.0.3
```

This should bump the version in the local `package.json` according to the new version and create a tagged commit. Push this tag to GitHub:

```
git push --tags
```

This will trigger a release build in the GitHub Actions and will generate a draft release with the new version number under the GitHub Releases for the `education/classroom-assistant` repository.

![image](https://user-images.githubusercontent.com/4064/102400265-82fa0600-3f96-11eb-9af0-79f1c4e0e5af.png)

Running `npm version` also created a commit on the default branch which we need to merge in. To do this we'll need another Pull Request. Create a new branch:

```
git checkout -b release-v2.0.3
```

Push that branch to GitHub and open a Pull Request:


![image](https://user-images.githubusercontent.com/4064/102401684-95753f00-3f98-11eb-8550-930aab3d4e53.png)

Approve and merge the pull request.

# Once the release is ready

Once the release is ready you need to move it from the draft or "prerelease" stage to the latest release. Go to the releases page (https://github.com/education/classroom-assistant/releases) and find the draft release. Make sure all of the assets have been uploaded, then click the `Edit` button next to the pre-release and write a description:

![image](https://user-images.githubusercontent.com/4064/102400655-1c291c80-3f97-11eb-8d9c-a5c422f622bc.png)

 Uncheck the checkbox that says `This is a prerelease` and then press <kbd>Update Release</kbd>

![image](https://user-images.githubusercontent.com/4064/102400786-41b62600-3f97-11eb-8da1-c5bc8ed6129a.png)

This marks the release as the `Latest Release`. At this point users will begin seeing a new version popup when starting Classroom Assistant and be prompted to update. Additionally links to download Classroom Assistant from GitHub Classroom will be automatically updated.

