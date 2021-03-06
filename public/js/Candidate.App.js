const app = angular.module("Candidate.App", []);

app.component("itmRoot", {
    controller: class {
        constructor() {
            this.candidates = [{ 
                name: "Puppies",
                votes: 11,
                percentageOfVote: "36.7%"
            }, {
                name: "Kittens",
                votes: 12,
                percentageOfVote: "40.0%"
            }, {
                name: "Gerbils",
                votes: 7,
                percentageOfVote: "23.3%"
            }];
        }

        onVote(candidate) {
            console.log(`Vote for ${candidate.name}`);
            // increases the vote count for the clicked candidate
            this.candidate= candidate.votes++;
            // calculate the percentage of the vote
            this.findPercentageOfVote();
        }

        findPercentageOfVote() {
            // creates an array with the votes per candidate
            const votesPerCandidate = this.candidates.map(candidate => candidate.votes);
            console.log('votes per candidate', votesPerCandidate);
            // stores total number of votes, which will be used to calculate each candiates
            // percentage of the vote
            let totalVotes = 0;
            // loops through votesPerCandiate array adding up all the votes
            for (let i = 0; i < votesPerCandidate.length; i++) {
                totalVotes += votesPerCandidate[i];
            }
            console.log('total votes', totalVotes);
            // loops through candidates to calculate the percentage of vote each candidate has
            let calcuPercentageOfVote = this.candidates.map(candidate => 
                // sets the percentageOfVote property to each canditate's to the calculated percentage
                candidate.percentageOfVote= ((candidate.votes / totalVotes) * 100).toFixed(1) + '%' );
            console.log('percentage of votes per candidate', calcuPercentageOfVote);
          }

        onAddCandidate(candidate) {
            console.log(`Added candidate ${candidate.name}`);
            let nameToCheck = candidate.name;
            // check to see if a candidate with the same name exits
            const checkNameExistence = this.candidates.some( candidate => candidate.name == nameToCheck );
            console.log('does the name exist in candidates', checkNameExistence)
            // do not allow a new candidate to be added if the user's input is empty, undefined, or 
            // the candidate's name already exits 
            if ( nameToCheck !== '' && nameToCheck !== undefined && checkNameExistence !== true) {
                 this.candidates.push({
                     name: candidate.name,
                     votes: 0,
                     percentageOfVote: 0
                 });
            } else if ( checkNameExistence ) {
                  alert('Name exists. Please try a different name.')
                  
            } else {
                alert('Please enter a name.')
            }
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
            // finds the index of the candidate clicked
            let candidateToRemove= this.candidates.indexOf( candidate );
            // removes the candidate 
            this.candidates.splice(candidateToRemove, 1);
        }
    },
    template: `
        <h1 class="display-4 header">Which candidate brings the most joy?</h1>
             
        <itm-results 
            candidates="$ctrl.candidates">
        </itm-results>

        <itm-vote 
            candidates="$ctrl.candidates"
            on-vote="$ctrl.onVote($candidate)">
        </itm-vote>

        <itm-management 
            candidates="$ctrl.candidates"
            on-add="$ctrl.onAddCandidate($candidate)"
            on-remove="$ctrl.onRemoveCandidate($candidate)">
        </itm-management>
    `
});

app.component("itmManagement", {
    bindings: {
        candidates: "<",
        onAdd: "&",
        onRemove: "&"
    },
    controller: class {
        constructor() {
            this.newCandidate = {
                name: ""
            };
        }

        submitCandidate(candidate) {
            this.onAdd({ $candidate: candidate });
        }

        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });
        }
    },
    template: `
        <section class="jumbotron">
            <section class="row">
                <h2 class="col" class="display-5">Manage Candidates</h2>
            </section>
            <section class="row">
                <section class="col">
                    <h3 class="display-6">Add New Candidate</h3>
                    <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>
                        <label>Candidate Name</label>
                        <br/>
                        <input type="text" ng-model="$ctrl.newCandidate.name" required>
                        <br/>
                        <button type="submit" class="btn btn-dark" style="width: 18rem; margin: 1rem; margin-top: 2rem; display: inline-block;">Add</button>
                    </form>
                </section>

                <section class="col">
                    <h3 class="display-6">Remove Candidate</h3>
                    <section class="card" style="width: 9rem; margin: 1rem; display: inline-block;" ng-repeat="candidate in $ctrl.candidates">
                        <section class="card-body">
                            <span ng-bind="candidate.name"></span>
                            <button type="button" class="btn btn-outline-danger" style="width: 3rem; margin: 1rem; 
                            display: inline-block;" ng-click="$ctrl.removeCandidate(candidate)">X</button>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class {},
    template: `
    <section>
        <h2 class="display-5" style="margin-top: 3.5rem;">Cast your vote!</h2>

        <button 
            type="button"
            class="btn btn-dark"
            style="width: 18rem; margin: 1rem; margin-bottom: 3.5rem; display: inline-block;"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
    </section>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<"
    },
    controller: class {},
    template: `
        <main class="jumbotron" >
            <h2 class="display-5">Live Results</h2>
                <section class="card-body">
                    <ul 
                        class="card list-group" 
                        style="width: 18rem; margin: 1rem; padding: 1rem; display: inline-block;" 
                        ng-repeat="candidate in $ctrl.candidates| orderBy:'votes':true">
                            <h2 class="card-title" ng-bind="candidate.name"></h2>
                            <li class="list-group-item"><strong ng-bind="candidate.votes"></strong></li>
                            <li class="list-group-item"><strong ng-bind="candidate.percentageOfVote"></strong></li>
                    </ul>
                </section>
        </main>
    `
});
