# Player 1 *Change the below to player 1 info*

Plenty Aces is a Virtual Movie Collection that allows users to discover where to purchase some of their favorite movies thus cutting out hours of searching on Google 

<img width="405" alt="Screen Shot 2022-09-24 at 8 28 35 PM" src="https://user-images.githubusercontent.com/67666661/192124438-7f44f6ed-a019-444e-b9ea-becad9136966.png">
<img width="605" alt="Screen Shot 2022-09-24 at 8 28 26 PM" src="https://user-images.githubusercontent.com/67666661/192124431-d626c230-57bb-4d8e-b6cc-1eb2cc5d333c.png">
<img width="662" alt="Screen Shot 2022-09-24 at 8 28 46 PM" src="https://user-images.githubusercontent.com/67666661/192124441-0898cfc3-dc52-440f-839a-aaa7757bbc29.png">


## Target Audience

Silver Screen Lovers near and Far. This app allows users to not only post their favorite movies and where they purchased them, it also allows them to browse the main collection to search for other movies that may suit their fancy! 

# Getting Started

- Click on the Sign in button to Sign in using google account. *Users May need to Zoom out to 50%*
- On the loading page, you can see the main movie collection that lists all users movie entries 
- To view movie entries, click on view button on the movie card.
- To edit movie entries (feature only available to the creator), click on edit button and change the prepopulated form to your preference.
- To delete a movie entry(feature only available to the creator), press the delete button, click ok on the pop up to delete, or cancel to not delete.
- To create a new movie entry, click on the "New Movie" button, fill in the form and click the create button.
- Movie Genre filter enables searching through movies based on genre via button click.
- To create a comment, click on "New Comment" button on the nav bar.
- On the "My Profile" page, users are able to see username and last login time. There is a section where you are able to see your first 5 movies from your collection. Future versions will display the users Top 5 movies.

## Primary Features
- Plenty Aces is a single page application created with React, firebase API and the end points were checked using postman.
- Users can login using google id.
- Users are welcomed to the loading page where they can view all user's movie entries 
- Users can also navigate using navbar links. You can create a new movie entry and a new comment via the navbar.
- Users can view, edit and delete movies and comments (features only available to the creator of the entry) in addition to creating them.
- The profile page displays the details of the users profile.
- Users can logout of the app using the sign out button on navbar.

## Contributions

Jessica Morrison

## Help

Users can get help on this project by leaving a message to the engineer via the Discussion Section https://github.com/Jess-Morrison/Capstone-Plenty-Aces-/discussions/landing.

## Wireframe

Link to Wireframe on Figma: https://www.figma.com/file/goIMRc9bFrRLvEWPdpwt3Q/FE-CPS-Plenty-Aces

## ERD

Link to ERD on dbDiagram: https://dbdiagram.io/d/62faedb4c2d9cf52fab07b85

## Roadmap - Future plans for Plenty Aces is to add more features including:

- Users will see which user who made the movie entry 
- Users will be able to create their own User Account
- There will be a "View Users" page where user profile cards will be displayed  
- Authenticated users will be able to see other user pages.
- User's top 5 movies will be displayed in the User Profile
- User's can add movie clips in the movie section 



# React/Next.js Template

[See Live Demo of this Template](https://drt-next-js-template.netlify.app/)

## Topics
- [Get Started](#get-started)
- [Starting the Project](#starting-the-project)
- [Using axios](#using-axios)
- [Deploying on Netlify](#deploying-on-netlify)
___
## Getting Started
### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="915" alt="Screen Shot 2022-07-06 at 12 54 01 PM" src="https://user-images.githubusercontent.com/29741570/177612998-4aac9237-5a1e-4f13-8ae0-468587521564.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="763" alt="Screen Shot 2022-07-06 at 12 54 48 PM" src="https://user-images.githubusercontent.com/29741570/177613126-dd38f678-7553-4f27-8a4a-75680f14d71e.png">

#### 3. Clone your new repo to your local machine
#### 4. Go to the **NEXT** section

## Starting the Project
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">

### Using Axios
> For every file you will need to make an XHR request in, you will need to require Axios
```js
import axios from 'axios';

const examplePromise = () => {
  axios.get('http://localhost:3001/example')
    .then((data) => {
      console.warn(data);
    })
    .catch((error) => {
      console.error(error);
    });
});
```

### Deploying on Netlify
Netlify will automatically detect your project and prepopulate the settings, but should something go wrong and it does not, here are the commands:

- Build Command: `npm run build`
- Publish directory: `.next`

#### Additional Steps to Take on Netlify
- Add Environmental Variables
    - Any Enviromental variables you are using in your `.env` file should be added to Netlify. 
        - Go to Site settings > Build & deploy > Environment > Environment variables and the keys and values there.

- Update Firebase URL Settings
    - In Firebase under Authentication select sign in methods, scroll to Authorized domains. Add your Netlify URL.
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
