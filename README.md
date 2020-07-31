## Mom`s virtual assistant

Mom`s virtual assistant.


## How to use

### Scan to open
![QRcode](/QRcode/prodQRcode.jpg)


## Development

### Deploing code to AWS Lambda

#### dev

To deploy code for dev version of bot:

- switch to a dev branch: `git checkout dev`
- in your terminal run:  `npm run deploy`
    
#### prod

To deploy code for prod version of bot:

- switch to a master branch: `git checkout master`
- then in your terminal run: `npm run deploy:prod`

### master and dev branches rules

**master** branch is only for production code.

Before merging code to the **master** branch from **dev** make sure everything is tested out and works properly.

**dev** branch is for development.

To create a new branch from **dev** branch:

- switch to a dev branch: `git checkout dev`
- then run: `git checkout -b <branch name>`

## Pull requests

To create **pull request**, please, follow this link: 
<https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request.html>