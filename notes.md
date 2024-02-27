# Notes for CS 260 (Garrett Bennett)

## Table of Contents
1. [Git and GitHub](#git-and-github)
2. [HTML](#html)


## Git and GitHub
### Making modifications
1. Clone repository into local directory: `git clone <respository-url>`
1. Using your preffered text editor, make any desired modifications to the repository. 
1. Stage edited files: `git add .`
1. Commit files with message: `git commit -m "<commit message here>"`
1. Push commit to your remote repository: `git push`

### Resolving merge conflicts
- This is necessary when there is a divergence in the local branch and the remote branch. To fix it: 
    1. Run `get pull`. You should get an error message similar to the following:
        > Auto-merging test.md
CONFLICT (content): Merge conflict in test.md
Automatic merge failed; fix conflicts and then commit the result.
    1. Open the files with conflicts (shown in error message), remove the lines added by Git, and edit the file so it is in the desired final state. 
    1. Commit the resolution: `git commit -am "<commit message"`
    1. Push to GitHub: `git push`

## AWS / DNS
- Records: 
  - A: domain name -> IP address
  - CNAME: domain name -> other domain name
  - NS: name of authoritative serves that give you authority to put DNS records in DNS server
  - SOA: provides contact info abt owner
- Caddy: directs web requests to either the file system (e.g. for html files) or to a service (e.g. to your server)

## HTML
### General Structure
```
<body>
    <header>
        <div>
            *elements*
        </div>
    </header>
    <main>
        <section></section>
        ...
        <section></section>
    </main>
    <footer>
        <div>
            stuff
        </div>
    </footer>
</body>
```   
- Element names: 
  - p - paragraph
  - nav - navigation
  - ul - unordered list
  - div - division
  - b - bold
### Input Examples
<details>
<summary>Example from HW</summary>
<br>
<div>
<body>
  <h1>Example Form</h1>
  <form action="formSubmit.html" method="post">
    <ul>
      <li>
        <!-- Includes validation-->
        <label for="text">Text: </label>
        <input type="text" id="text" name="varText" placeholder="your name here" required pattern="[Aa].*" />
      </li>
      <li>
        <label for="password">Password: </label>
        <input type="password" id="password" name="varPassword" />
      </li>
      <li>
        <label for="email">Email: </label>
        <input type="email" id="email" name="varEmail" />
      </li>
      <li>
        <label for="textarea">TextArea: </label>
        <textarea id="textarea" name="varTextarea"></textarea>
      </li>
      <li>
        <label for="select">Select: </label>
        <select id="select" name="varSelect">
          <option>option1</option>
          <option selected>option2</option>
          <option>option3</option>
        </select>
      </li>
      <li>
        <label for="optgroup">OptGroup: </label>
        <select id="optgroup" name="varOptGroup">
          <optgroup label="group1">
            <option>option1</option>
            <option selected>option2</option>
          </optgroup>
          <optgroup label="group2">
            <option>option3</option>
            <option>option4</option>
          </optgroup>
          <optgroup label="group3">
            <option>option5</option>
            <option>option6</option>
          </optgroup>
        </select>
      </li>
      <li>
        <fieldset>
          <legend>checkbox</legend>
          <label for="checkbox1">checkbox1</label>
          <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" checked />
          <label for="checkbox2">checkbox2</label>
          <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" />
          <label for="checkbox3">checkbox3</label>
          <input type="checkbox" id="checkbox3" name="varCheckbox" value="checkbox3" />
          <label for="checkbox4">checkbox4</label>
          <input type="checkbox" id="checkbox4" name="varCheckbox" value="checkbox4" />
        </fieldset>
      </li>
      <li>
        <fieldset>
          <legend>radio</legend>
          <label for="radio1">radio1</label>
          <input type="radio" id="radio1" name="varRadio" value="radio1" checked />
          <label for="radio2">radio2</label>
          <input type="radio" id="radio2" name="varRadio" value="radio2" />
          <label for="radio3">radio3</label>
          <input type="radio" id="radio3" name="varRadio" value="radio3" />
          <label for="radio4">radio4</label>
          <input type="radio" id="radio4" name="varRadio" value="radio4" />
        </fieldset>
      </li>
      <li>
        <!-- Submit form with POST method and enctype="multipart/form-data" to send file contents. -->
        <label for="file">File: </label>
        <input type="file" id="file" name="varFile" accept="image/*" multiple />
      </li>
      <li>
        <label for="search">Search: </label>
        <input type="search" id="search" name="varSearch" />
      </li>
      <li>
        <label for="tel">Tel: </label>
        <input type="tel" id="tel" name="varTel" placeholder="###-####" pattern="\d{3}-\d{4}" />
      </li>
      <li>
        <label for="url">URL: </label>
        <input type="url" id="url" name="varUrl" />
      </li>
      <li>
        <label for="number">Number: </label>
        <input type="number" name="varNumber" id="number" min="1" max="10" step="1" />
      </li>
      <li>
        <label for="range">Range: </label>
        <input type="range" name="varRange" id="range" min="0" max="100" step="1" value="0" />
        <output id="rangeOutput" for="range">0</output>
        <!-- Range requires some JavaScript in order to make it work. Ignore this for now. -->
        <script>
          const range = document.querySelector('#range');
          const rangeOutput = document.querySelector('#rangeOutput');
          range.addEventListener('input', function() {
            rangeOutput.textContent = range.value;
          });
        </script>
      </li>
      <li>
        <label for="progress">Progress: </label>
        <progress id="progress" max="100" value="75"></progress>
      </li>
      <li>
        <label for="meter">Meter: </label>
        <meter id="meter" min="0" max="100" value="50" low="33" high="66" optimum="50"></meter>
      </li>
      <li>
        <label for="datetime">DateTime: </label>
        <input type="datetime-local" name="varDatetime" id="datetime" />
      </li>
      <li>
        <label for="time">Time: </label>
        <input type="time" name="varTime" id="time" />
      </li>
      <li>
        <label for="month">Month: </label>
        <input type="month" name="varMonth" id="month" />
      </li>
      <li>
        <label for="week">Week: </label>
        <input type="week" name="varWeek" id="week" />
      </li>
      <li>
        <label for="color">Color: </label>
        <input type="color" name="varColor" id="color" value="#ff0000" />
      </li>
      <!-- This doesn't show up to the user, but allows the form to send associated data. -->
      <input type="hidden" id="secretData" name="varSecretData" value="1989 - the web was born" />
    </ul>

    <button type="submit">Submit</button>
  </form>
</body>
</div>

Here
</details>

### Media
- img: src has path to image
- audio/video 
  - src takes path to file
  - controls gives users options to control
  - autoplay starts audio as soon as loaded
  - loop loops audio (might be only on audio)
- scalable vector graphics (svg)
  - renders graphics inline 
- canvas
  - facilitates 2D drawings and animations

## CSS
### Associating CSS
- style attribute:
  - `<p style="color:green">CSS</p>`
- HTML style element:
  - ```
    <head>
          <style>
            p {
              color: green;
            }
          </style>
        </head>
    ```
- link element to reference CSS file
  - `<link rel="stylesheet" href="styles.css" />`

## Box model
- margin > border > padding > content

### Combinators
| Combination | Example     | Description |
| ----------- |-------------| ----------- |
| Descendant | body section | Any section that is a descendant of a body |
| Child	| section > p |	Any p that is a direct child of a section |
| General sibling| 	p ~ div	   | Any p that has a div sibling |
| Adjacent sibling| p + div     |	Any p that has an adjacent div sibling |

### Selector Types
- ***Element type***: <element-type>
- ***Class***: .class-name
  - Can also do p.class-name to modify all paragraphs with a class of class-name
- ***ID***: #id
- ***Attribute***: <element-type>[<attribute-name>='<wildcard-name>']

### Declarations
- background-color	color	red	Fill the background color </br>
- border	color width style	#fad solid medium	Sets the border using shorthand where any or all of the values may be provided </br>
- border-radius	unit	50%	The size of the border radius </br>
- box-shadow	x-offset y-offset blu-radius color	2px 2px 2px gray	Creates a shadow </br>
- columns	number	3	Number of textual columns </br>
- column-rule	color width style	solid thin black	Sets the border used between columns using border shorthand </br>
- color	color	rgb(128, 0, 0)	Sets the text color </br>
- cursor	type	grab	Sets the cursor to display when hovering over the element </br>
- display	type	none	Defines how to display the element and its children </br>
- filter	filter-function	grayscale(30%)	Applies a visual filter </br>
- float	direction	right	Places the element to the left or right in the flow </br>
- flex			Flex layout. Used for responsive design </br>
- font	family size style	Arial 1.2em bold	Defines the text font using shorthand </br>
- grid			Grid layout. Used for responsive design </br>
- height	unit	.25em	Sets the height of the box </br>
- margin	unit	5px 5px 0 0	Sets the margin spacing </br>
- max-[width/height]	unit	20%	Restricts the width or height to no more than the unit </br>
- min-[width/height]	unit	10vh	Restricts the width or height to no less than the unit </br>
- opacity	number	.9	Sets how opaque the element is </br>
- overflow	[visible/hidden/scroll/auto]	scroll	Defines what happens when the content does not fix in its box </br>
- position	[static/relative/absolute/sticky]	absolute	Defines how the element is positioned in the document </br>
- padding	unit	1em 2em	Sets the padding spacing </br>
- left	unit	10rem	The horizontal value of a positioned element </br>
- text-align	[start/end/center/justify]	end	Defines how the text is aligned in the element </br>
- top	unit	50px	The vertical value of a positioned element </br>
- transform	transform-function	rotate(0.5turn)	Applies a transformation to the element </br>
- width	unit	25vmin	Sets the width of the box </br>
- z-index	number	100	Controls the positioning of the element on the z axis </br>

### Loading Fonts
- @font-face { font-family: 'Quicksand'; src: url('https://cs260.click/fonts/quicksand.ttf'); }
- @import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

### Animations
@keyframes demo {
from {
font-size: 0vh;
}

95% {
font-size: 21vh;
}

to {
font-size: 20vh;
}
}

### Responsive Design
| Value | Meaning |
| ----- | ------- |
| none | Don't display this element |
| block | Display element w a width that fills its parent element (p/div do this by default) |
| inline | Width as big as content (b/span do this by default) |
| flex | Display in a flexible orientation |
| grip | Display in a grid orientation |

- float: moves an element to the left or right of its container element and allows inline elements to wrap around it
- media: edit CSS based on orientation or window size
  - @media (orientation: portrait) {
    aside {
    display: none;
    }
    }
  - @media (max-height: 600px) {
    header {
    display: none;
    }
    footer {
    display: none;
    }
    main {
    flex: 1 100vh;
    }
    }
- grid
  - .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    grid-gap: 1em;
    }
- flex: useful when you want different parts of your app to be responsive to window resizes or orientation changes

## JavaScript
### Console
- log special characters
  - %s, string parameter
  - %c, add CSS as last argument
- time: 
  - console.time("stuff")
  - console.timeEnd("stuff") // then prints stuff: <amt-time>
- count:
  - console.count('a')  // prints a: 1
  - console.count('a')  // prints a: 2

### Adding JS
- within content of \<script> element 
  - \<script> function sayGoodbye() { alert('Goodbye'); } \</script>
- src attribute of \<script> 
  - \<script src="javascript.js">\</script>

### Types
- **Null** - 	The type of a variable that has not been assigned a value.
- **Undefined** - 	The type of a variable that has not been defined.
- **Boolean** - 	true or false.
- **Number** - 	A 64-bit signed number.
- **BigInt** - 	A number of arbitrary magnitude.
- **String** - 	A textual sequence of characters.
- **Symbol** - 	A unique value.
- **Object** - 	A collection of properties represented by name-value pairs. Values can be of any type.	{a:3, b:'fish'}
- **Function** - 	An object that has the ability to be called.	function a() {}
- **Date** - 	Calendar dates and times.	new Date('1995-12-17')
- **Array** - 	An ordered sequence of any type.	[3, 'fish']
- **Map** - 	A collection of key-value pairs that support efficient lookups.	new Map()
- **JSON** - 	A lightweight data-interchange format used to share information across programs.	{"a":3, "b":"fish"}

### Operators
- == uses falsy and truthy evaluations (e.g. 1 == '1', '' == false, both are true)
- === is strict equality and !== is inequality

### Arrays
- **push** -	Add an item to the end of the array	a.push(4)
- **pop** -	Remove an item from the end of the array	x = a.pop()
- **slice** -	Return a sub-array	a.slice(1,-1)
- **sort** -	Run a function to sort an array in place	a.sort((a,b) => b-a)
- **values** -	Creates an iterator for use with a for of loop	for (i of a.values()) {...}
- **find** -	Find the first item satisfied by a test function	a.find(i => i < 2)
- **forEach** -	Run a function on each array item	a.forEach(console.log)
- **reduce** -	Run a function to reduce each array item to a single item	a.reduce((a, c) => a + c)
- **map** -	Run a function to map an array to a new array	a.map(i => i+i)
- **filter** -	Run a function to remove items	a.filter(i => i%2)
- **every** -	Run a function to test if all items match	a.every(i => i < 3)
- **some** -	Run a function to test if any items match	a.some(i => 1 < 1)

### JSON
- **string** -	"crockford"
- **number** -	42
- **boolean** -	true
- **array** -	[null,42,"crockford"]
- **object** -	{"a":1,"b":"crockford"}
- **null** -	null
- example: 
  - ```
    {
      "class": {
      "title": "web programming",
      "description": "Amazing"
    },
      "enrollment": ["Marco", "Jana", "فَاطِمَة"],
      "start": "2025-02-01",
      "end": null
    }
    ```
- converting to JavaScript
  - ```
    const obj = { a: 2, b: 'crockford', c: undefined };
    const json = JSON.stringify(obj);
    const objFromJson = JSON.parse(json); 
    console.log(obj, json, objFromJson);
    ```

### Objects
- object from method
  - ```
    function Person(name) {
      return {
        name: name,
        log: function () {
          console.log('My name is ' + this.name);
        },
      };
    }
    
    const p = new Person('Eich');
    p.log();
    // OUTPUT: My name is Eich
    ```
- object from class
  - ```
    class Person {
      constructor(name) {
        this.name = name;
      }
    
      log() {
        console.log('My name is ' + this.name);
      }
    }
    
    const p = new Person('Eich');
    p.log();
    // OUTPUT: My name is Eich
    ```

### DOM
- get one element
  - `document.querySelector('div');`
- get all elements 
  - `document.querySelectorAll('p');`
- edit content
  - child.textContent = 'newStuff'
- modify html
  - child.innerHtml = "\<div>New div\</div>"
- event listener
  - categories
    - **Clipboard** -	Cut, copied, pasted
    - **Focus** -	An element gets focus
    - **Keyboard** -	Keys are pressed
    - **Mouse** -	Click events
    - **Text** - selection	When text is selected
  - example:
    - ```js
      const submitDataEl = document.querySelector('#submitData');
      submitDataEl.addEventListener('click', function (event) {
        console.log(event.type);
      });
      ```

### Regex
- match
  - return strings that match
- replace
  - replace matching regex (1st param) with new string (2nd param)
- test
  - return true if regex is found in string
- flags (after regex: /regex/i, i is flag)
  - _d_ - 	Generate indices for substring matches (hasIndices)
  - _g_ - 	Global search (global)
  - _i_ - 	Case-insensitive search (ignoreCase)
  - _m_ - 	Allows ^ and $ to match next to newline characters (multiline)
  - _s_ - 	Allows . to match newline characters (dotAll)
  - _u_ - 	"Unicode"; treat a pattern as a sequence of Unicode code points (unicode)
  - _v_ - 	An upgrade to the u mode with more Unicode features (unicodeSets)
  - _y_ - 	Perform a "sticky" search that matches starting at the current position in the target string (sticky)

### Rest and Spread
- rest 
  - way to allow variable arguments that are put in array
- spread
  - way to pass iterable argument as multiple arguments