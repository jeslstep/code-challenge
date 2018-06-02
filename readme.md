# ITM21st Code Challenge

## Overview

The challenge app is an AngularJS front end with an NodeJS express server for static files.

The app represents an online poll for candidates initially chosen from Puppies, Kittens and Gerbils. A user can view voting results, cast votes for a candidate, or add/remove candidates from the race.

Please implement the following features:

*   Display the proportion of the vote that each candidate has in the Live Results section. For example, if there are 2 candidates and Candidate A has 10 votes and Candidate B has 30 votes, then Candidate A would have 25% of the vote and Candidate B would have 75% of the vote.
*   Order the Live Results by the vote count descending.
*   When a vote is cast in the Cast Your Vote section, the Live Results should be updated. Make sure the candidate ordering reflects the vote propotions!
*   Ensure that a new candidate cannot be added without entering a name
*   Ensure that a new candidate with the same name cannot be added.
*   Implement the Add New Candidate action
*   Implement the Remove Candidate action