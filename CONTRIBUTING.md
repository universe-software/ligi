# Contributing to Ligi

This guide explains how to contribute to the Ligi project.

## Subitting an Issue

You can report a bug or suggest a feature by [submitting a new issue here](https://github.com/universe-software/ligi/issues/new/choose). Before you do, make sure
to check if a similar issue already exists by searching [the issues list](https://github.com/universe-software/ligi/issues).

## Contributing Code

### Find or Create an Issue

You can start your code contribution based on an existing issue that you find on [the issues list](https://github.com/universe-software/ligi/issues).
Or, if your contribution does not concern an existing issue and will include large or breaking changes, please submit a new issue for it first;
small changes that don't break compatibilty don't require an issue.

### Necessary Software

To contribute code, you will need:

* [Git](https://git-scm.com) or a Git client to clone this repository
* [Node.js](https://nodejs.org)
* NPM (Comes with Node.js on Windows nd Mac, but must be installed separately on Linux if you got Node.js from your distribution's repository)
* A code editor
* A browser for testing
* A terminal program to access a command line (CMD or PowerShell on Windows, Terminal on Mac, Terminal/XTerm/Konsole/Console on Linux)

### Fork the Code

* Fork this repository using the Fork button at the top right of the page.
* Clone your fork using Git or your Git Client.
* Open a terminal/command prompt in the folder of your cloned copy.
* Run `npm install` in the terminal.

## Write Code

Open `ligi.js` in your code editor and take a look around to get used to the format. The different usages of Ligi are defined as separate functions,
and at the bottom is the default exported function that infers the intended use from the given parameters and calls the appropriate function.

If your contribution includes adding a new usage, add code to the default exported function to detect when that usage is expected based on the given arguments,
and, if so, call your defined usage function. *Make sure the usage detection logic is not ambiguous with the detection logic of other usages.*

**Do not add any named `export`s**, as that would break compatibility with CommonJS. If you want to add something that is not a usage of the default exported
function, then give the default exported function a name (while still leaving is as the `default export`) if it doesn't already have one, and assign your addition
as a property of that.

## Build

Open a terminal in the folder of your cloned copy and run `npm run build` to build the bundles.

## Test

* Make a new HTML document for your test.
* Include one of the bundles in the `dist` folder in your HTML (preferably `dist/ligi.umd.es5.min.js`).
* Add some basic HTML and a script that tests out the features you added.
* Test it with [the example from the documentation](https://github.com/universe-software/ligi#example-sync-a-list-with-an-array) to make sure existing features didn't break.
  (Be especially careful if you added a new usage to make sure its detection logic doesn't mask another usage.)

## Commit and Submit

* Make sure you have built the bundles using the instructions above since the last time you made changes.
* Commit your changes to the `master` branch using Git or your Git client and push them to your fork.
* Go to [the pull requests page](https://github.com/universe-software/ligi/pulls) of this repository and use the New Pull Request button at the top right.
* Select `master` as the Base.
* (Use 'compare across forks' if you don't see a Head Repository option.)
* Select your fork as the Head Repository.
* Select `master` as Compare.
* Select 'Create Pull Request'.
* Give it a title and description explaining your changes and link to the original issue if there was one.
* Submit the pull request.
