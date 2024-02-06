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

## CSS
### Combinators
| Combination | Example     | Description |
| ----------- |-------------| ----------- |
| Child	| section > p |	Any p that is a direct child of a section |
| General sibling| 	p ~ div	   | Any p that has a div sibling |
| Adjacent sibling| p + div     |	Any p that has an adjacent div sibling |

### Selector Types
- ***Element type***: <element-type>
- ***Class***: .<class>
- ***ID***: #id
- ***Attribute***: <element-type>[<attribute>='<wildcard>']

### Declarations
- [CSS Declarations Chart](https://github.com/webprogramming260/.github/blob/main/profile/css/declarations/declarations.md