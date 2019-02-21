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
            this.candidate= candidate.votes++;
            this.findPercentageOfVote();
        }

        findPercentageOfVote() {
            const votesPerCandidate = this.candidates.map(candidate => candidate.votes);
            console.log('votes per candidate', votesPerCandidate);
            let totalVotes = 0;
            for (let i = 0; i < votesPerCandidate.length; i++) {
                totalVotes += votesPerCandidate[i];
            }
            console.log('total votes', totalVotes);
            let calcuPercentageOfVote = this.candidates.map(candidate => 
                candidate.percentageOfVote= ((candidate.votes / totalVotes) * 100).toFixed(1) + '%' );
            console.log('percentage of votes per candidate', calcuPercentageOfVote);
          }

        onAddCandidate(candidate) {
            console.log(`Added candidate ${candidate.name}`);
            let nameToCheck = candidate.name;
            const checkNameExistence = this.candidates.some( candidate => candidate.name == nameToCheck );
            console.log (checkNameExistence)
            if ( nameToCheck !== '' && checkNameExistence !== true) {
                 this.candidates.push({
                     name: candidate.name,
                     votes: 0,
                     percentageOfVote: 0
                 });
            } else if (candidate.name === '') {
                alert('Please enter a name.')
            } else {
            alert('Name exists. Please try a different name.') }
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
        }
    },
    template: `
        <h1>Which candidate brings the most joy?</h1>
             
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
        <h2>Manage Candidates</h2>

        <h3>Add New Candidate</h3>
        <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

            <label>Candidate Name</label>
            <input type="text" ng-model="$ctrl.newCandidate.name" required>

            <button type="submit">Add</button>
        </form>

        <h3>Remove Candidate</h3>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates">
                <span ng-bind="candidate.name"></span>
                <button type="button" ng-click="$ctrl.removeCandidate(candidate)">X</button>
            </li>
        </ul>
    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class {},
    template: `
        <h2>Cast your vote!</h2>

        <button type="button"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<"
    },
    controller: class {},
    template: `
        <h2>Live Results</h2>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates| orderBy:'votes':true">
                <span ng-bind="candidate.name"></span>
                <strong ng-bind="candidate.votes"></strong>
                <strong ng-bind="candidate.percentageOfVote"></strong>
            </li>
        </ul>
    `
});
