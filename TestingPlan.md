# Testing Plan

## Types of Tests
We will mainly do manual integration testing by going through each feature after it's implemented and checking that it matches what we defined in Requirements.md. We will also perform basic integration testing to make sure different parts of the app such as frontend and backend or multiple components work together correctly. If time allows, we may add small automated unit tests for core logic like the reward points system.

## Process
Saleh and Mo will test each feature as it gets built. After implementing a feature, the developer who worked on it will first test it locally to make sure it works as expected. Before anything gets merged into main, we’ll open a pull request so the other developer can review the code and test the feature as well. This ensures that every feature is tested by at least two people before being merged.

Once a bigger chunk of features are done such as at major milestones or before final submission, we’ll have Romey and Xintong go through the app and perform full manual acceptance testing in production environment to make sure everything looks right, works correctly, and matches the design and requirements.

We will repeat this process continuously throughout development until the final deployment.

## Environments
During development, testing will be done on local machines using a development environment. Before final submission, the app will be deployed such as on Vercel or GitHub Pages, and testing will also be performed in the production environment.

Testing will primarily be done on desktop using Google Chrome. If possible and if there's extra time, we will also do light testing on other browsers such as Safari and different screen sizes to ensure basic compatibility.

## Failure Protocol
If a bug or issue is found, the tester will create a GitHub Issue describing the problem, including steps to reproduce it and expected vs. actual behavior. Saleh and Mo will review the issue, prioritize it, and assign it to the appropriate team member based on ownership of that part of the code.

Fixes will be implemented in a separate branch and submitted through a pull request. The fix must be reviewed and tested before being merged into the main branch.
