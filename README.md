# Asteroids-Multiplayer-Frontend

Web Based Asteroids Clone with online multi-player and match making. 

This project will be used to create a video series on creating a modern web application from start to finish.

### Installing

To run locally enter the commands below

`npm install`

`npm start`

## Deployment

To Deploy to a CI/CD Pipeline on AWS follow the instruction below.

Create a cf_parameters.json file as shown below
```
[
  {
    "ParameterKey": "GitHubUsername",
    "ParameterValue": "tkblackbelt"
  },
  {
    "ParameterKey": "GitHubRepo",
    "ParameterValue": "Asteroids-Multiplayer-Frontend"
  },
  {
    "ParameterKey": "GitHubOAuthToken",
    "ParameterValue": "<ENTER YOUR OAUTH TOKEN>"
  }
]
```

To create the stack run 

`cloudformation create-stack --stack-name "AsteroidsFrontendStack" --template-body file://./cf_asteroids_frontend.yaml --capabilities CAPABILITY_NAMED_IAM --parameters file://./parameters.json`

To update the stack run 

`cloudformation update-stack --stack-name "AsteroidsFrontendStack" --template-body file://./cf_asteroids_frontend.yaml --capabilities CAPABILITY_NAMED_IAM --parameters file://./parameters.json`

To destroy the stack run

`cloudformation delete-stack --stack-name "AsteroidsFrontendStack"`

## Built With

* [React](https://reactjs.org/) - The frontend components
* [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Game Animations
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Frontend Game Logic


## Authors

* **Charles Benger** - *Initial work* - [tkblackbelt](https://github.com/tkblackbelt)

## License

   Copyright 2019 Chuck Benger

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
