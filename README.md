### `Dependencies/Libraries used `

[React JS(UI)](https://reactjs.org/docs/getting-started.html),
[Bootstrap3.7](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js), <br>
[jQuery3.3](https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js),
[Fontawsome](https://fontawesome.com/v4.7.0/icons/), 
[MaterializeCSS](https://materializecss.com/getting-started.html),
[npm](https://www.npmjs.com/)

The following cdns are included in index.html via scipt/links
[Bootstrap3.7](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js),
[jQuery3.3](https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js),
[Fontawsome](https://fontawesome.com/v4.7.0/icons/), 
[MaterializeCSS](https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css)<br>


### `Steps to create Project & add all dependencies in Windows OS`

`Install nodejs npm ` <br>
From the step by step Guide described here [Installation of Node JS on Window](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/)

npm install create-react-app -g [react-app/YourAppName]<br>
create-react-app trello-task-board<br>
cd trello-task-board<br>
npm start<br>

Then open http://localhost:3000/ to see your app.<br>
stop ctrl+c to add dependencies

Copy update package.json with package.json of this project
and run "npm install"


replace src folder with my src folder to get code & resources<br>

npm start<br>
open http://localhost:3000/ to run app again.

The build is minified by Webpack and the filenames include the hashes.<br>
Your app is ready to be deployed!


### Problem Statemnet and basic Features

We want to implement a trello board which will help us keep track of cards categorised into lists.
For example - in the above figure, we have two list Teams and Products. Each list can have any
number of cards. For example, in the above figure Teams list has two cards.

Mandatory attributes of each card - title, desc and a cross(X) button to delete it.

`A new list can be added to the board by pressing the ADD LIST button present on the right side of the board. Each list should have a Title, a cross(X) button to delete it and can have 0 or more cards. Deleting a list should delete all the cards present in that list.`

`A new card can be added to a list via a plus(+) button present at the bottom of each list(inside a list).`

`A card can be dragged from one list and dropped on the second list to make it part of the second list. If it is dropped outside the second list, it comes back to the list from which it was picked up.`

Note - `Whenever a card is dropped on any list, it should become the first card of that list. There is no upper limit on the number of lists and cards which can be added to the board.`

Note - `On refreshing the page, the existing lists and cards on the page should remain intact`


### Extra features implemented

- Modals to accept infprmation from users like Task Name, Description etc.
- used React 17 having impeccable performance
- Implemented Code re-use techniques
- Added Fallback UI to handle negative cases
- Added error handling and validation check practices

### Screeshots

![image](https://user-images.githubusercontent.com/32532380/118384432-9089e980-b623-11eb-99fe-6373294e23ff.png)

![image](https://user-images.githubusercontent.com/32532380/118384472-d3e45800-b623-11eb-9d8e-b00445a3fcad.png)

![image](https://user-images.githubusercontent.com/32532380/118384488-fbd3bb80-b623-11eb-98cb-2334e1ff2612.png)

![image](https://user-images.githubusercontent.com/32532380/118384527-4a815580-b624-11eb-8580-14181db26325.png)




