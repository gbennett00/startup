For course notes, see [notes.md](notes.md)

# [WordBlitz](https://startup.wordblitz.click)

## Specification Deliverable

### Elevator Pitch
Do you love the family-favorite game Scrabble but wish it was more fast paced? WordBlitz is for you! Each person uses their letters to make their own combination of words, and the first person to use all of their tiles wins. The physical game is fun, but this online version gives you a chance to beat your dad even if he lives across the country! 

Can you tell I'm a little competitive with my dad?

### Design 
![Login page](photos/IMG_0066.JPG)

![Start game page](photos/IMG_0067.JPG)

![Gameplay page](photos/IMG_0068.JPG)

Interaction with backend:
![Request sequence](photos/IMG_0069.JPG)


### Key Features
- Login/register over HTTPS
- Start new game or join using add code
- Does not allow invalid moves
- Ability to "peel" (return one tile for three more)
- Progress of each player displayed in realtime
- Number of remaining tiles displayed in realtime
- See your own stats (number of wins, highest scoring game)
    - Note that scoring is not a part of the original game. The site will score the player's final baord using offical scrabble scoring. 

### Technologies
This is how I plan to use each of the following technologies:
- **HTML** - Used to create well-structured web pages, including a page for login, joining a game, playing a game, and seeing a user's stats. 
- **CSS** - Used to make each page look professional on varying screen sizes. This will also be used for the animation on the page (sliding tiles, etc.)
- **JavaScript** - Provides login, creating a game, joining a game, moving tiles, and any other logic necessary for gameplay. 
- **Service** - Backend provides endpoints for loging in/registering, creating/joining a game, "peeling", and getting a new tile when a user finishes a round. 
- **DB/Login** - Users must register/login before playing. This connects to a database to persist username, passwords, and stats (number of wins, highest score, etc)
- **WebSocket** - As each user plays, other users are updated on their status. This is also used to maintain a current count of tiles remaining. 

## HTML Deliverable
- **Proper Structure** - I created a page for each component of my application and used the proper HTML tags (body, main, header, footer, etc) to organize each page. 
- **Links** - There are expected linked between pages such as on click of the login button, but there are also links to each of the pages in each header. 
- **3rd Party Service Calls** - Buttons act as placeholders, as they will trigger scripts that make these calls. 
- **Text** - Textual content is all present and in the right place, with mock content as necessary.
- **Images** - The only image I could think of to use was a picture in the about page. 
- **Login page** - Login page allows users to login or sign up. The user's information can be found in the profile page, with their username being displayed on the game and start pages. 
- **DB Placeholder** - The information from the profile page will come from the database.
- **WebSocket Placeholder** - The information to the right of the game page will come from WebSocket communication. 

## CSS Deliverable
- **Prerequisites** - I deployed Simon CSS to prod, have a link to my GitHub startup repo, and am adding what I modified with this deliverable. I also have over 10 git commits, each containing distinct changes. 
- **Header, footer, and main** - Headers are styled to use the Bootstrap navigation styling. The footer also uses Bootstrap styling. Each page uses different styling elements in the main content body.
- **Navigation elements** - As stated above, I used Bootstrap to make my navigation look good. I made it so that the link to whichever page you're on is highlighted, as demonstrated in the Simon CSS project. 
- **Window resizing** - Pages look good on different sized screens. 
- **Application elements and text content** - Bootstrap was used to make elements such as tables, images, and inputs look professional. I also used consistent fonts throughout the application. 
- **Applicaiton images** - I made my profile picture in the about page have rounded edges. 

## JavaScript Deliverable
- **Prerequisites** - I deployed Simon JavaScript to my production environment and have a link to my GitHub on my app's home page. I have over 10 git commits and am currently fulfilling the last prerequisite. 
- **Future login** - I used JavaScript to verify login information and to persist the username of the current user as well as a map of usernames to passwords in local storage. 
- **Future database** - On top of using JavaScript to mock username/password data, I used JavaScript to display profile information. Currently, it just saves mock data to local storage then retreives those statistics. 
- **Future WebSocket** - JavaScript is used to continually update the player board with how many tiles each player has played. I mocked a WebSocket connection by using a randomizer and timeouts to have the players make moves at varying intervals. 
- **Application's interaction logic** - I used JavaScript to handle the logic for users to either create a game and wait for other players to join or join an existing game. It was also used to enable players to move tiles from their pile into a grid, remove tiles from the grid, or 'peel' (exchange one tile for three different ones). The board in the middle is dynamically sized, so placing tiles along the edge will generate another row/column so that you may always play next to any tile. When someone wins, an alert is shown then the user is redirected to the start page. 

## Service Deliverable
- **Node.js/Express HTTP service** - done
- **Static middleware for frontend** - done
- **Calls to third party endpoints** - Calls a quote API and displays the quote on the about page
- **Backend service endpoints** - Endpoints that verify all words on a board are valid, score a board, and return a user's high score and number of wins
- **Fronted calls service endpoints** - The frontend calls the endpoints to verify and score a board anytime all tiles are played. It uses the profile endpoint to display a user's game statistics. 

## Login Deliverable
- **Prerequisites** - done
- **Supports new user registration** - done
- **Supports exisitng user authentication** - done
- **Stores application data in MongoDB** - user information is stored in and read from MongoDB
- **Stores and retrieves credentials in MongoDB** - user password is stored as hash in DB and is compared at login
- **Restricts application functionality based upon authentication** - Users with admin priveledges are able to see all users in their profile page, while users without this authorization only see their own statistics. 

## WebSocket Deliverable
- **Backend listens for WebSocket connection** - done
- **Frontend makes WebSocket connection** - done 
- **Data sent over WebSocket connection** - From the start page, the websocket connection is used to notify players when other players join, and, for the host of the game, it is used to send the usernames of people that are in the game. From the game page, it is used to share the progress of other players (how many tiles they've played). 
- **WebSocket data displayed in the application interface** - The table of usernames that the host player sees comes from WebSocket data as well as the table on the right of the game page that displays the progress of other players (number of tiles played comes from WebSocket).

## React Deliverable
I understand that the way I implemented my game page using a DOM manipulator hook component isn't best practice, but for this assignment I thought it would be the best path. The more proper React structure would be to convert all the original DOM queries/updates to rely on state instead, but that would've been a nightmare of a refactor. In addition, by not refactoring that way, I was able to gain a better understanding of how useEffect works (and still have time to do homework for other classes this week). 
- **Bundled using Vite** - done
- **Multiple functional react components** - Each of my pages has been converted to a functional React component. The login and start pages have multiple components that are activated based on state following a similar pattern as shown in simon-react. 
- **React router** - Routing between Login, Start, Game, Profile, About and NotFound components. 
- **React hooks** - useState used to track state in almost every component, including App, Start, and Unauthenticated (Login). useEffect is used to populate the game page. 