# Notes for CS 260 (Garrett Bennett)

## Table of Contents
1. [Git and GitHub](#git-and-github)


## Git and GitHub
### Making modifications
1. Clone repository into local directory: `git clone <respository-url>`
1. Using your preffered text editor, make any desired modifications to the repository. 
1. Stage edited files: `git add .`
1. Commit files with message: `git commit -m "<commit message here>"`
1. Push commit to your remote repository: `git push`

### Resolving merge conflicts
- This is necessary when there is a divergence in the local branch and the remote branch. To fix it: 
    1. Run `get pull`. You should get an error message similar to the following:
        > Auto-merging test.md
CONFLICT (content): Merge conflict in test.md
Automatic merge failed; fix conflicts and then commit the result.
    1. Open the files with conflicts (shown in error message), remove the lines added by Git, and edit the file so it is in the desired final state. 
    1. Commit the resolution: `git commit -am "<commit message"`
    1. Push to GitHub: `git push`
