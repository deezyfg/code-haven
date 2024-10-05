# Contributing to Code Haven

First off, thank you for considering contributing to Code Haven. It's people like you that make Code Haven such a great tool for collaborative coding.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork Code Haven and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```bash
git checkout -b 325-add-new-language-support
```

## Get the test suite running

Make sure you're using the latest version of `Node.js` and `npm`. Install the development dependencies:

```bash
npm install
```

Now, run the tests:

```bash
npm test
```

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with alx-files_manager's master branch:

```
git remote add upstream git@github.com:deezyfg/code-haven.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```
git checkout 325-add-new-language-support
git rebase master
git push --set-upstream origin 325-add-new-language-support
```

Finally, go to GitHub and make a Pull Request.

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) [resources](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase) but here's the suggested workflow:

```
git checkout 325-add-new-language-support
git pull --rebase upstream master
git push --force-with-lease 325-add-new-language-support
```

## Code review

A team member will review your pull request and provide feedback. Please be patient as review times may vary.

## Guidelines

- Write clear, concise commit messages
- Follow the coding style of the project (we use ESLint and Prettier)
- Write tests for your changes
- Document new code based on the project's documentation style
- Update the README.md with details of changes to the interface, if applicable

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Questions?

If you have any questions, please feel free to contact the project maintainers or open an issue on GitHub.

Thank you for contributing to Code Haven!
