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