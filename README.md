# ANTE

ANTE is developing simple data analytics software that is easy to use to assist entrepreneurs run their businesses more efficiently by reducing cost and increasing profit. The software will be able to help founders estimate customers, how much inventory to acquire and more.

**A**uthenticity

I**N**novation

**T**echnology

**E**xcellence


## Getting started

**Prerequisites:** NPM is required before developing or running this software. Please install using this website: https://www.npmjs.com/get-npm

**Installing:**

    npm install

**Running locally:**

    npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

**Warranty:** Instructions last tested on 11/2/2020 and verified to work by COMP 523 Team G on macOS Catalina.


## Testing
    npm test

Launches full unit test suite with line coverage.

## Deployment

Production Endpoint: https://comp523-ante.web.app/
Production Backend: https://console.firebase.google.com/u/2/project/comp523-ante/overview
New developers must request access to the comp523-ante firebase project by contacting Team G.
Deploy with the command: `firebase deploy`
The application makes use of Firebase Auth, Firebase Hosting, and Cloud Firestore.
No continuous deployment system or staging/pre-production environments currently exist. Developers should ensure proper functionality before deployment by running unit test suite as well as testing locally.

## Technologies used

Frontend:
 - React
 - Firebase Hosting

Backend:
 - Cloud Functions - backend business logic
 - Cloud Firestore - database
 - Firebase Auth - Google Auth

A pdf outlining the ADRs for the system is present in the root of the repo at file ADR.pdf

## Contributing

New developers need access to the Github repository, Firebase project, Team Trello board, and the team's [website](https://tarheels.live/comp523ante/) which includes the link to the progress journal and provides more information about Ante and the team.

**Developer Rules:**

-  No style guides are explicitly required. Developers should use best judgement!
-  Spaces are preferred over tabs 😉
-  Reasonable commenting is a plus!
-  All features developed in separate feature branches that later get merged into master during team meetings.
-  Pull requests are required.
- Developers are expected to unit test any component thoroughly before pull requests are approved.


## Authors

 - Akshay Jain
 - Andrew Zhong
 - Rhea Gupta
 - Zara Ehsan

# License
ANTE is open source software  [licensed as MIT](https://github.com/zaraehhs/Ante/blob/master/LICENSE).

## Acknowledgements

 - Todd Ginsberg: Team Mentor
 - Tyrell Carter: Client
 - Jeff Terrell: COMP 523 Professor
