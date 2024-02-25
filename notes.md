my notes file:
For notes syntax stuff: [notes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

# Git and Github notes:
When using git, we must add, commit, and then push to get it to github. We can clone from github, and once we have, then we can just pull everything we need. And we can use the VS code interface to deal with merge issues.

# EC2
Need to create an actual server for the webpage through EC2. See https://learn.cs260.click/page/webServers/amazonWebServicesEc2/amazonWebServicesEc2_md for notes on this. The address to the wesite is http://54.234.216.97/. SSH using ssh -i /c/Users/zenit/.ssh/ImHungry.pem ubuntu@54.234.216.97

# Adding security (Caddy and HTTPS)
https://learn.cs260.click/page/webServers/https/https_md
We just ssh into our server, and modify our caddy file to include our new domain name. Domain name was done from these instructions: https://learn.cs260.click/page/webServers/amazonWebServicesRoute53/amazonWebServicesRoute53_md

## The Simon deployment
Added an example of Simon to the GitHub, and now have the simon.collegefeastfinder.click subdomain. Has a deploy .sh script that deploys the whole thing, and examples on how the HTML should work for the pages and how to connect them to each other.

# CSS notes
Lots of documentation online. The main feature of CSS is that everything has its own children and descendants and when you apply something, everything below it gets applied too. You can also give a class to a group of elements you want to stylize or an ID to a specific element you want to stylize that you initialize through HTML and then customize in CSS.

# Initial HTML Code
Need x unmber of pages, (index, about, scores, play). Need one for login, profile /  your events, creating an event, dashboard(index), 

# Git and GIthub

[Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds), the creator of Linux, was fed up with the proprietary version control software that he was using to track the code for the Linux kernel and so over a weekend he built Git, the world's most popular version control system.

> “Talk is cheap. Show me the code.”
- Linus Torvalds
> 

# What is Git?

Enables you to track version of files in a directory, and clone all those versions to a different location. 

You can track file versions of any files in a directory by initializing Git for that directory. You can do this right now by creating a new directory in a console window and initializing it as a Git repository.

```
➜  mkdir playingWithGit
➜  cd playingWithGit
➜  git init
```

If you list all files in the directory you will see that you now have a hidden directory named `.git`.

```
➜  ls -la
total 0
drwxr-xr-x   3 lee  staff    96 Dec  1 22:59 .
drwxr-xr-x+ 54 lee  staff  1728 Dec  1 23:00 ..
drwxr-xr-x   9 lee  staff   288 Dec  1 22:59 .git

```

The `.git` directory is where all of the versions get stored. Now use the `echo` command to create a file so that we can see how versioning works. After creating the new file, use `git status` to tell you what git is doing.

```
➜ echo hello world > hello.txt
➜ git status

On branch master
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
 hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```

`git status` tells you that it detects a new file named `hello.txt`, but it isn't currently tracking versions for that file. To begin tracking versions you need to add it. Usually you track all files in a repository directory and so you can tell Git to track everything that it doesn't know about with `git add .`. Make sure you include the period at the end of the command. Follow the add command with another call to `git status` in order to see what the repo looks like now.

```
➜  git add .
➜  git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
 new file:   hello.txt
```

Now Git tells us that it has *staged* the file `hello.txt`, meaning it is ready to be committed as a version in the repository. We commit a version with the `commit` command. We always want to have a meaningful comment about the version we are committing and so we use the `-m` parameter to provide a message that will live with the version. Follow this with another call to `git status`.

```
➜  git commit -m "initial draft"
[master (root-commit) d43b07b] initial draft
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt

➜  git status
On branch master
nothing to commit, working tree clean
```

Congratulations! You have just committed your first file to a Git repository. It is important to note that we were only working with a single file in this example. However, a commit can represent multiple files. You just need to add them all before you execute the commit. Also, note that the point of the stage, `git add` step, is so that you can commit some files while still leaving other modified files out of the commit. Only files you've staged will be committed.

Let's make an edit to our file and commit it again. This time we will tell Git that we want to add all the modified tracked files to our commit, without having to `git add` them again, by including the `-a` parameter along with our message parameter.

```
➜  echo goodbye world > hello.txt

➜  git commit -am "changed greeting to reflect the present mood"

[master e65f983] changed greeting to reflect the present mood
 1 file changed, 1 insertion(+), 1 deletion(-)

```

Now that we have a couple versions in our repository we can view the versions with the `git log` command.

```
➜  git log

commit e65f9833ca8ee366d0d9c1676a91b1a977dab441 (HEAD -> master)
Author: Lee
Date:   Thu Dec 1 23:32:22 2022 -0700

    changed greeting to reflect the present mood

commit d43b07b8890f52defb31507211ba78785bf6dccf
Author: Lee
Date:   Thu Dec 1 23:29:11 2022 -0700

    initial draft

```

This shows both commits with the associated comments.

## Commit SHA

Every commit has a unique identifier that is generated by hashing the file along with the timestamp using the SHA hashing algorithm. You can always refer to a specific commit in your version history by using its SHA. For example, if we want to temporarily switch back to a previous version to see what it contains we can use the `checkout` command. You only need to provide the first few characters of the SHA.

```
➜  git checkout d43b07b8890f

Note: switching to 'd43b07b8890f'.
HEAD is now at d43b07b initial draft

➜  cat hello.txt
hello world
```

The above output omits a big message saying that you are no longer looking at the latest version, but the important thing is that you can see that we are now looking at our old version. Note that you don't want to make commits at this point since it will create a branch that is not for the latest code. To get back to the top of the version chain, use the `checkout` command and reference the branch name, which is by default `master`.

```
➜  git checkout master
Previous HEAD position was d43b07b initial draft
Switched to branch 'master'

➜  cat hello.txt
goodbye world
```

Now we are back to our latest version.

The following diagram shows how your commits move from your working directory, to staging them for a commit, and then committing them to a repository.

!https://github.com/webprogramming260/.github/raw/main/profile/essentials/git/essentialsGitStage.jpg

A commit is a full snapshot of what was staged from your directory at the time of the commit. That means all of the files contained in the commit were reverted when you executed the checkout command. Since we only had one file in our commit, it looks like we are only flipping that file around, but basically you can think of it as a time machine for the entire directory.

## Diff:

Will compare the difference between two versions. 

`git diff HEAD HEAD~1`

## Branches:

You can branch your code, so you can work on variations of it while still allowing progress on the main branch.

For example, if you wanted to work on a new feature named A without interrupting work on the master branch, you would use the `git branch A` command to create a new branch named `A`, then start working on the new branch with the `git checkout A` command. Then, you can commit to either the A ranch or the master branch. When you want to combine work to the master branch, you do `git merge A`.

### Make sure to cmmit often, so you dont lose progress!

Requires to have at least 4 commits for each project I submit to get full credit. Make sure they have meaningful messages that describe the what and why of the changes.

# Try to use GitLens for my git command stuff:

If I go to the commit graph details and click on a given changed file, it will show me where the files are difference.

# GitHub

To download an online reposity: `git clone https://github.com/webprogramming260/startup-example.git`

This is the pattern that you want to make a reflexive part of your development process.

1. Pull the repository's latest changes from GitHub (`git pull`)
2. Make changes to the code
3. Commit the changes (`git commit`)
4. Push the changes to GitHub (`git push`)

Now there is a commit that GitHub has, but you do not have in your development environment. If we run the `fetch` Git command, you will get the latest information about the changes on GitHub without actually changing your local repository. We then run the `status` Git command to see the differences between the clones and see that we are missing a commit. You can pull it down using the `pull` Git command. You can also use the Git functionality in VS Code to view the status and sync up your repository.

```
➜  git fetch
➜  git status
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

➜  git pull
Updating d13a9ce..cafe81a
Fast-forward
 test.md | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)

```

After running the pull command, your development clone and the GitHub clone are now the same.

# Startup Application and specification assignment

# Startup Application Notes

For building the startup, we will start with a conceptual design document and a structural shell for the application with HTML. Then, we go on to learn the follow skills:

- **HTML** - Basic structural and organizational elements
- **CSS** - Styling and animating
- **JavaScript** - Interactivity *(e.g. What happens when a user presses a button)*
- **Web service** - Remote functions that your application calls on your, or someone else's, web server *(e.g. saveScores, getWeather, chatWithFriend)*
- **Authentication** - Creating accounts and logging in
- **Database persistence** - Storing user data in a database *(e.g. Save the high scores and login information)*
- **WebSocket** - Support for pushing data from the server. This can be peer to peer communication *(e.g. chatting with friends through the browser)*, or realtime data from the server *(e.g. stock prices or the current game leader)*.
- **Web framework** - Using React to add components and request routing

The [Simon](https://simon.cs260.click/) application is meant to give you an example of the level of complexity you are looking for, and how to build your startup application. Use Simon as a chance to experiment with things you are considering doing with your startup application. Once you learn how Simon does something you can leverage that code in your startup.

START THINKING ABOUT WHAT I WANT TO DO. 

Dream big, but pick a small, minimal, and viable product.

Keep the styling simple. Make it look reasonable, and move on to the technology. Can always make it looks better later.

## Deliverables

You will turn in the following deliverable versions of your startup application.

1. Design
2. HTML
3. CSS
4. JavaScript
5. Web service
6. Login
7. WebSocket
8. React

You can change your project as the class progresses, but each deliverable submission must include all the functionality defined by the previous milestones. For that reason, it is suggested that you do not change your project, and carefully consider your project from the beginning, because the longer you go, the more expensive it will be to repeat your previous work.

## Submitting Deliverable:

For each deliverable, I need to do the following:

1. Deploy deliverable to production enviorment
2. Include link to github startup repository on applications home page
3. Keep a [README.md](http://README.md) file that holds notes on what you added/changed with the deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example. Please reference the items from the rubric for each deliverable in your description of what you did, and what you did not.

**Common Mistakes**:

- Inconsistent effort and time management.
- Overcomplicating the user interface.
- Sticking rigidly to a specific approach.
- Over-focusing on UI at the expense of functionality.
- Implementing too many features without fully developing core functionalities.

## Demo day

At the end of class we will conduct a demo day for the best applications. Those selected for the demo day will be awarded additional credit for the exceptional work. The top presenters will be given the coveted Ghirardelli award.

# Startup Deliverable - Specification

Come up with your idea, and then use [NinjaMock.com](http://NinjaMock.com) to produce a rough layout of my idea.

## Represent all technologies

Make sure that your specification represents how you will represent all of the class technologies. This includes the following:

- **Authentication**: An input for your user to create an account and login. You will want to display the user's name after they login.
- **Database data**: A rendering of application data that is stored in the database. For Simon, this is the high scores of all players.
- **WebSocket data**: A rendering of data that is received from your server. This may be realtime data sent from other users (e.g. chat or scoring data), or realtime data that your service is generating (e.g. stock prices or latest high scores). For Simon, this represents every time another user creates or ends a game.

## Using Markdown

Take time to use Markdown in my [README.md](http://README.md) and [notes.md](http://notes.md) files. Theres github documentation and examples for markdown. Refer to the example design to see how to embed images. Make sure your images are in a format that browsers natively support such as JPG, GIF, or PNG.

## Actual Assignment:

Update `[README.md](http://README.md)` to include startup specification

This should include an elevator pitch, key features, a description of how you will use each technology, and design images.

Make sure you push your changes to the file so that it can be reviewed.

Submit the URL for your GitHub startup repository to the [Canvas](https://byu.instructure.com/courses/22526/assignments) assignment.

### Rubric:

- 10% - Proper use of Markdown in `README.md`
- 20% - A concise and compelling elevator pitch in your `README.md`
- 10% - Description of key features in your `README.md`
- 30% - Description of how you will use each technology
- 30% - One or more rough sketches of your application. Images must be embedded in your `README.md`.

# Ideas:

An app specifically for BYU or other colleges, where you can make posts about events that will have free food, or free food given some requirement, like you’re part of a club or help out for an hour at an event. You would have a college name, and once in that college, could post the location of the event, the time, the food served, any requirements, and any additional information and pictures.

An app for people with sedentary jobs that offers advice for physical health, like quick and easy exercises, posture reminders, and other wellness tips for a busy workday.

Something that uses ChatGPT?

Additional notes (meeting with TA):

Add a “college” option for creating an event.

Add a “club” option for creating an event.

Add a “RSVP Required?” checkbox

Comment section / forum on each event.

comments would go to the account of the person who made the post.

Homepage for club accounts?

MAIN THING TO TAKE ON: Individual accounts. If I can do more, add club accounts? 

Prompt if you make an event … if it has the same date, time, and place, ask if its the same as another existing event (if applicable),

Food, place, and time. THREE MAIN FACTORS to try and eliminate duplicates. Can also add a checkbox for colleges, and a sponsor for the event(would also be the club).

See if location can plug into google API, so it would autofill or add recommendations. 

If at a college, please include building and room number(if applicable).

Add filters by food, time, college.

Time is a pain, so use as many build in browser functions as possible.

1. Name
Location
Time
College
Club associated
2. Food category?
RSVP required
Message the club / admin who posted
Forum / comment / chat on each event
Details: requirements, extra info, etc 
    
    Individual accounts
    (Club accounts if you have time)
    Check and see if it is the same date and time and place (BYU building for example)
    
    Prompt when they create an account for an address, so you can see which events are closest to them.
    
    Gotta store everything in the databse.
    
    They have a record in the databse attatched to the database, but we DONT want to store the events underneath them because we want everyone to access them, but we can create a list of references.
    
    Have a separate databse with list of events to display and search.
    

Do research on how to have one record point to another.

Key: When I open my page, what do I WANT to see. Make it so i can add more features in the future. 

key things: display event, show 4 critical events. Go to VERY simplest, and then put a Wishlist under each category for additional features. But just keep it at the absolute minimum for right now. 

# ACTUAL ASSIGNMENT ELEVATOR PITCH (just write it in notion so the markdown stuff transfers over to github)

### My Elevator Pitch for FeastFinder:

**FeastFinder:** the go-to app for college students seeking free or low-cost food events on campus. This platform connects students with up-to-date information on where to find free meals, snacks, and food-related gatherings. Whether it's a service activity, a guest lecture, or a social event, if there's free food, it's on FeastFinder. Save money, discover new events, and enjoy the campus life to its fullest!

### **Key Features:**

1. **Event Posting**: Users can post details about food events, including time, location, type of food, and any participation requirements.
2. **Event Browsing**: A feed or calendar view where users can browse upcoming food events at their college.
3. **User Authentication**: Students can create accounts and log in to post or save events.
4. **Real-Time Updates**: Utilize WebSocket for live updates on new events or changes.
5. **Database Integration**: Store event details, user profiles, and saved events.
6. **Search and Filters**: Allow users to search for events by date, food type, or other criteria.
7. **Interactive Map**: Show event locations on an interactive campus map.
8. **Community Interaction**: Options for users to comment on, like, or share events.
9. **Event Reminders**: Push notifications or email alerts for saved or upcoming events.

### **Technology Usage:**

- **HTML/CSS**: Create a user-friendly and visually appealing interface.
- **JavaScript**: Add interactivity for event postings, browsing, and user interactions.
- **Web Service**: Implement features like weather forecasts for outdoor events.
- **Authentication**: Manage user sign-up, login, and profile management.
- **Database**: Persistently store event details and user information.
- **WebSocket**: Enable real-time notifications for new events or updates.
- **React**: Develop a dynamic and responsive frontend for the app.

### Design Sketches (ninjamock.com)

# History of the Web & Asking Questions

The history of web programming is marked by three distinct phases:

1. **Formation of the Internet**: The foundation of web programming was laid with the development of a global communications network, initially spearheaded by the United States Department of Defense's ARPANET. This network, designed to withstand nuclear attacks, evolved into the modern Internet. The expansion continued in the 1980s, with contributions from the National Science Foundation and commercial enterprises, leading to an explosion of consumer participation in the 1990s and 2000s. The Internet is managed by the Internet Engineering Task Force (IETF) and the Internet Corporation for Assigned Names and Numbers (ICANN).
2. **Creation of HTML and HTTP (Web 1.0)**: Tim Berners-Lee, working at CERN in the 1980s, developed the protocols for the World Wide Web, including the HyperText Markup Language (HTML) and the HyperText Transfer Protocol (HTTP). HTML allowed for interlinked documents via hyperlinks. The initial version of HTML had only 18 elements, which has since expanded significantly. The World Wide Web Consortium (W3C) has controlled the HTML specification since 1996.
3. **Introduction of CSS and JavaScript (Web 2.0)**: Cascading Style Sheets (CSS) were proposed by Håkon Wium Lie in 1994, providing a way to style HTML documents independently of their content. CSS became a standard by 1996. JavaScript, created by Brendan Eich at Netscape in 1995, introduced interactivity to web pages. This scripting language was later standardized by ECMA International.

Additional milestones include the use of JavaScript outside browsers (like Node.js), the standardization of JSON, the development of TypeScript, and various transpilers. Looking forward, web programming faces challenges like application complexity, device diversity, security, privacy, environmental impact, and accessibility. The field remains open for significant contributions and innovation, with the potential for individuals to make a substantial impact.

# Asking Questions and Getting Help:

## Contact information

- Instructions on how to use [Discord](https://learn.cs260.click/page/essentials/discord/discord_md)
- Consult this [document](https://docs.google.com/spreadsheets/d/1g1AMtgvyfSwMgp85QcwHuy0mVR-nN3bIGI6XNEJWB1U/edit?usp=sharing) to view the TA schedule
- In-person TAs are located in 1066 TMCB cube #4
- Professor Jensen's office: 2264 TMCB

| Who | How | Where | When |
| --- | --- | --- | --- |
| TA | Online or in person | Discord, TA Office | TA Schedule |
| Instructor | Online or in person | Discord, Class, Office | Office Hours, Class Times |
| Peers | Online or in person | Discord, Class | Depends on how friendly you are |

**Hierarchy for Seeking Answers**:

- **Yourself**: First attempt to solve the problem independently.
- **The Oracle (Google)**: Utilize Google for finding specific, credible answers.
- **Peers**: Engage with classmates through platforms like Discord or in person.
- **TA**: Approach TAs after doing preliminary research on your query.
- **Instructor**: The instructor is a final point of contact after exploring other avenues.

**Effective Question Asking Strategy**:

- Clearly define your question.
- Research using the defined question.
- Provide ample background information.
- Include screenshots or outputs if relevant.
- Describe the steps to reproduce the issue.
- Use proper grammar and proofread your query.
- Be responsive to feedback.
- Show gratitude, regardless of the outcome.

# The ConsoleEditors, Textbook stack, **Amazon Web Services - EC2**

### Live Server extension

The VS Code Live Server extension is great for building web applications. You are going to build a lot of HTML, CSS, and JavaScript. You can do much of this on CodePen, but for your projects you are going to be working in your development environment. This means you will have a GitHub repository cloned to your personal development computer. When you open VS Code to the directory where your repository is located you can start creating HTML, CSS, and JavaScript, but when you want to see your code working you need to actually run a web server to deliver your files to the browser. That is where the Live Server extension comes in handy. With the press of the `Go Live` button on the bottom right status bar, your entire project directory is served up through your browser. Additionally, if you make any changes to a file the browser will automatically be updated.

You can test it by opening VS Code, creating a new file named `index.html` and pasting `<h1>hello<h1>` into the file. Then save the file and press the `Go Live` button. This will launch your browser and display the rendered `index.html` file. If you make changes to your file and save it, the browser will automatically be updated to display your changes.

(you actually right click on the file and press “open live service”)

### VI (vim)

VI, or technically vim, is one of the oldest console editors. It is extremely powerful and some incredibly talented software engineers use it as their sole development environment. The reason why you should learn VI is that it is available on every Linux server and can do anything that you will need. With that said it has a bit of an initial learning curve. However, once you have memorized a few basic commands you will be able to get around easily. If you take some time to really learn VI, you might find a new essential tool.

There are lots of tutorials for VI. Here are a few based on how you like to learn.

- [Textual](https://www.linuxfoundation.org/blog/blog/classic-sysadmin-vim-101-a-beginners-guide-to-vim)
- [Video](https://youtu.be/RZ4p-saaQkc)
- [Interactive](https://www.openvim.com/)
- [Game](https://vim-adventures.com/)
- `Console` - Type `vimtutor` in your console

Additionally, the following instructions walk you through the basics and give you a few important commands to get started.

To use VI, open your console and change directory to one that holds some code you want to work on. For example, if you wanted to edit `index.html` you would type:

The following short list of commands should allow you to do most of what you will ever want to do.

| keystroke | meaning |
| --- | --- |
| :h | help |
| i | enter insert mode. This will allow you to type and delete text. Use ESC to exit insert mode. No other commands will work while in insert mode. |
| u | undo |
| CTRL-r | redo |
| gg | go to beginning of file |
| G | go to end of file |
| / | search for text that you type after / |
| n | next search match |
| N | previous search match |
| v | visually select text |
| y | yank or copy selected text to clipboard |
| p | paste clipboard |
| CTRL-wv | Split window vertically |
| CTRL-ww | Toggle windows |
| CTRL-wq | Close current window |
| :e | Open a file. Type ahead available. If you open a directory you can navigate it in the window |
| :w | write file (save) |
| :q | quit. Use :q! to exit without saving |

The great thing about learning these commands is that you will find that they work with a lot of the POSIX console programs. For example, with the file viewing utility `less` you can use `G` and `gg` to jump to the top and bottom of a file. Here is a [cheat sheet](https://vim.rtorr.com/) if you want to see all the commands.

# Technology Stack:

The collection of technologies that you use to create or deliver your web application is called a technology stack. It is a stack because they usually layer one on top of each other. Generally at the top of the stack is your web framework (Angular, React, Vue, or Svelte). The web framework then communicates with one or more web services to provide authentication, business, data, and persistent storage. The web service then uses backend services such as caching, database, logging, and monitoring.

Example image: React for the web framework, talking to Caddy as the web server hosted on AWS, running web services with Node.js, and MongoDB as the database hosted on MongoDB Atlas.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/2f4ffbcf-8e97-4fd5-973c-de31367f01fc/8d79eaf2-8628-4ef3-9842-48c6c384f952/Untitled.png)

Things to consider when choosing a tech stack: Dependability, support, scalability, performance, and security are all important factors. You also want to consider development productivity factors such as documentation, ease of use, common acceptance, community support, build times, and testing integration.

# **Amazon Web Services - EC2 (renting your own)**

We need to rent out own cloud computer.

**Creating an AWS server instance:**

(STEP BY STEP HERE: https://learn.cs260.click/page/webServers/amazonWebServicesEc2/amazonWebServicesEc2_md)

see assignment due 24th

# Code Pen, HTML intro, Structure, Input, Media

Code pen allows us to test and diagram out code to see what it will do.

HTML (Hypertext Markup Language): language for creating websites. 

Note: there will be no styling until we start to add CSS.

## Attributes

Every HTML element may have attributes. Attributes describe the specific details of the element. For example, the `id` attribute gives a unique ID to the element so that you can distinguish it from other elements. The `class` attribute is another common element attribute that designates the element as being classified into a named group of elements. Attributes are written inside the element tag with a name followed by an optional value. You can use either single quotes (`'`) or double quotes (`"`) to delimit attribute values.

```
<p id="hello" class="greeting">Hello world</p>

```

## Hyperlinks

One of the core features that made the web so successful was the ability to create hyperlinks that take you from one page to another another with a simple click. A hyperlink in HTML is represented with an anchor (`a`) element that has an attribute containing the address of the hyperlink reference (`href`). A hyperlink to BYU's home page looks like this:

`<a href="https://byu.edu">Go to the Y</a>`

full example:

Gotta always include the DOCTYPE thing at the top.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <main>
      <h1>Hello world</h1>
      <p class="introduction">
        HTML welcomes you to the amazing world of
        <span class="topic">web programming</span>.
      </p>
      <p class="question">What will this mean to you?</p>
      <p class="assignment">Learn more <a href="instruction.html">here</a>.</p>
    </main>
  </body>
</html>
```

## Common Elements:

Modern HTML contains over 100 different elements. Here is a short list of HTML elements that you will commonly see.

| element | meaning |
| --- | --- |
| html | The page container |
| head | Header information |
| title | Title of the page |
| meta | Metadata for the page such as character set or viewport settings |
| script | JavaScript reference. Either a external reference, or inline |
| include | External content reference |
| body | The entire content body of the page |
| header | Header of the main content |
| footer | Footer of the main content |
| nav | Navigational inputs |
| main | Main content of the page |
| section | A section of the main content |
| aside | Aside content from the main content |
| div | A block division of content |
| span | An inline span of content |
| h<1-9> | Text heading. From h1, the highest level, down to h9, the lowest level |
| p | A paragraph of text |
| b | Bring attention |
| table | Table |
| tr | Table row |
| th | Table header |
| td | Table data |
| ol,ul | Ordered or unordered list |
| li | List item |
| a | Anchor the text to a hyperlink |
| img | Graphical image reference |
| dialog | Interactive component such as a confirmation |
| form | A collection of user input |
| input | User input field |
| audio | Audio content |
| video | Video content |
| svg | Scalable vector graphic content |
| iframe | Inline frame of another HTML page |

## Comments

You can include comments in your HTML files by starting the comment with `<!--` and ending it with `-->`. Any text withing a comment block will be completely ignored when the browser renders it.

```
<!-- commented text -->

```

## Special characters

HTML uses several reserved characters for defining its file format. If you want to use those characters in your content then you need to escape them using the `entity` syntax. For example, to display a less than symbol (`<`) you would instead use the less than entity (`&lt;`). You can also use the entity syntax to represent any unicode character.

| Character | Entity |
| --- | --- |
| & | &amp; |
| < | &lt; |
| > | &gt; |
| " | &quot; |
| ' | &apos; |
| 😀 | &#128512; |

# Structure Elements:

HTML is supposed to provide structure, with structures like `body`, `header`, `footer`, `main`, `section` `aside`, `p`, `table`, `ol/ul`, `div`, and `span`

Body has three children, head, main, and footer.

The `header` contains a `p`aragraph with a `span`, and a `nav`igation containing multiple `div`isions of sub-content.

The `main` contains multiple `section`s that contain either an unordered list (`ul`) or a `table`. Main also contains an `aside` for content that does not fit the content flow of the sections.

The `footer` has a content division with a single span.

Example:

```html
<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>
```

### Block vs Inline:

block element is meant to be a distinct block in the flow of the content structure. An inline element is meant to be inline with the content flow of a block element. In other words, inline elements do not disrupt the flow of a block element's content. For example, the block element `div` (division) could have an inline element `b` in order to bring attention to a portion of its sub-text. Likewise a `p` (paragraph) element could have a `span` to mark the paragraph's sub-text as a person's name.

# HTML input elements:

From the very early days of HTML it contained elements for accepting the input of user data. These elements include the following:

| Element | Meaning | Example |
| --- | --- | --- |
| form | Input container and submission | <form action="form.html" method="post"> |
| fieldset | Labeled input grouping | <fieldset> ... </fieldset> |
| input | Multiple types of user input | <input type="" /> |
| select | Selection dropdown | <select><option>1</option></select> |
| optgroup | Grouped selection dropdown | <optgroup><option>1</option></optgroup> |
| option | Selection option | <option selected>option2</option> |
| textarea | Multiline text input | <textarea></textarea> |
| label | Individual input label | <label for="range">Range: </label> |
| output | Output of input | <output for="range">0</output> |
| meter | Display value with a known range | <meter min="0" max="100" value="50"></meter> |

### Form Elements

Submits values of the inputs it contains. Kinda replaced by the interactivity of Java script

### Input Element

Allows different kinds of input from the user.

| Type | Meaning |
| --- | --- |
| text | Single line textual value |
| password | Obscured password |
| email | Email address |
| tel | Telephone number |
| url | URL address |
| number | Numerical value |
| checkbox | Inclusive selection |
| radio | Exclusive selection |
| range | Range limited number |
| date | Year, month, day |
| datetime-local | Date and time |
| month | Year, month |
| week | Week of year |
| color | Color |
| file | Local file |
| submit | button to trigger form submission |

In order to create an input you specify the desired `type` attribute along with any other attribute associated with that specific input. Here is an example of a checked radio button and its associated label.

```
<label for="checkbox1">Check me</label> <input type="checkbox" name="varCheckbox" value="checkbox1" checked />

```

Most input elements share some common attributes. These include the following.

| Attribute | Meaning |
| --- | --- |
| name | The name of the input. This is submitted as the name of the input if used in a form |
| disabled | Disables the ability for the user to interact with the input |
| value | The initial value of the input |
| required | Signifies that a value is required in order to be valid |
|  |  |

### Validaing Input:

Several inputs have validation built into them, meaning they wont accept unacceptable characters for their type. You can also specify it with the `required` attribute.

The `pattern` attribute exists on `text`, `search`, `url`, `tel`, `email`, and `password` inputs. When present, the pattern attribute provides a regular expression that must match for the input to be considered as valid.

# **HTML media elements**

# SIMON and Startup HTML

Simon HTML;

The application has a login (home), game play, high scores, and about page. Each page contains a header that provides navigation between the pages, and a footer that references the source repository.

The header and footer for each page is duplicated so that we have the same navigation controls on each view.

We have index.html as our main page, and then corresponding links inside of it like a.html, b.html, etc.

# **Cascading Style Sheets**

Functionally, CSS is primarily concerned with defining `rulesets`, or simply `rules`. A rule is comprised of a `selector` that selects the elements to apply the rule to, and one or more `declarations` that represent the `property` to style with the given `property value`.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/2f4ffbcf-8e97-4fd5-973c-de31367f01fc/d413fb47-1ffe-4d8d-bf59-5a8200acfae3/Untitled.png)

EXAMPLE:

```
p {
  font-family: sans-serif;
  font-size: 2em;
  color: navy;
  text-shadow: 3px 3px 1px #cccccc;
}
```

the selector p uses all the paragraph elements of HTML.

### **Associating CSS with HTML**

There are three ways that you can associate CSS with HTML. The first way is to use the `style` attribute of an HTML element and explicitly assign one or more declarations.

```
<p style="color:green">CSS</p>
```

The next way to associate CSS is to use the HTML `style` element to define CSS rules within the HTML document. The `style` element should appear in the `head` element of the document so that the rules apply to all elements of the document.

```
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
<body>
  <p>CSS</p>
</body>
```

Final, and best way to use CSS is to put it in its own CSS file:

```
<link rel="stylesheet" href="styles.css" />

```

**styles.css**

```
p {
  color: green;
}
```

By default, the width and height of an element is defined by the width and height of the content box. You can change the `box-sizing` CSS property from the default value of `content-box` to `border-box` in order to redefine the width and height to also include the padding and the border. This often makes it easier to style elements when their visual size matches their actual size.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/2f4ffbcf-8e97-4fd5-973c-de31367f01fc/52aac9c5-da68-4868-9586-2892c90a85ed/Untitled.png)

# CSS Selectors

## Element type selector

To start things off, we want to make all elements in the document use a sans-serif font. We can do this by using an element name selector. By selecting the `body` element we will cascade our declaration down to all the children of the body, which is the whole document.

```
body {
  font-family: sans-serif;
}
```

## Combinators

Next we want to change the color of the second level headings (`h2`), but we only want to do that within the sections for each department. To make that happen we can provide a `descendant combinator` that is defined with a space delimited list of values where each item in the list is a descendant of the previous item. So our selector would be all `h2` elements that are descendants of `section` elements.

```
section h2 {
  color: #004400;
}

```

There are other types of combinators that you can use. These include the following.

| Combinator | Meaning | Example | Description |
| --- | --- | --- | --- |
| Descendant | A list of descendants | body section | Any section that is a descendant of a body |
| Child | A list of direct children | section > p | Any p that is a direct child of a section |
| General sibling | A list of siblings | p ~ div | Any p that has a div sibling |
| Adjacent sibling | A list of adjacent sibling | p + div | Any p that has an adjacent div sibling |

## Class selector

The next selector we will use is the class selector. Remember that any element can have zero or more classifications applied to it. For example, our document has a class of `introduction` applied to the first paragraph, and a class of `summary` applied to the final paragraph of each section. If we want to bold the summary paragraphs we would supply the class name summary prefixed with a period (`.summary`).

```
.summary {
  font-weight: bold;
}

```

You can also combine the element name and class selectors to select all paragraphs with a class of summary.

```
p.summary {
  font-weight: bold;
}

```

## ID selector

ID selectors reference the ID of an element. All IDs should be unique within an HTML document and so this select targets a specific element. To use the ID selector you prefix the ID with the hash symbol (`#`). We would like to showcase our physics department by putting a thin purple border along the left side of the physics section.

```
#physics {
  border-left: solid 1em purple;
}

```

## Attribute selector

Attribute selectors allow you to select elements based upon their attributes. You use an attribute selector to select any element with a given attribute (`a[href]`). You can also specify a required value for an attribute (`a[href="./fish.png"]`) in order for the selector to match. Attribute selectors also support wildcards such as the ability to select attribute values containing specific text (`p[href*="https://"]).

```
p[class='summary'] {
  color: red;
}

```

For a full description of attribute selections refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).

## Pseudo selector

CSS also defines a significant list of pseudo selectors which select based on positional relationships, mouse interactions, hyperlink visitation states, and attributes. We will give just one example. Suppose we want our purple highlight bar to appear only when the mouse hovers over the text. To accomplish this we can change our ID selector to select whenever a section is hovered over.

```
section:hover {
  border-left: solid 1em purple;
}
```

# List of CSS declerations (functions) and units and color:

https://learn.cs260.click/page/css/declarations/declarations_md

### CSS FONTS:

https://learn.cs260.click/page/css/fonts/fonts_md

### ANIMATION IN CSS:

https://learn.cs260.click/page/css/animation/animation_md

# CSS PRACTICE ASSIGNMENT:

Done in CodePen, make it looks like the example which uses animation for the bottom two sections.

Dark grey on top, light grey bottom two, black box far left italicised footer, light blue header with divider line below.

# **Responsive design, Grid, Flex**

Design needs to be responsive to the application depending on the device, so it can change size and appearance. This is responsive design.

## Display

The CSS display property allows you to change how an HTML element is displayed by the browser. The common options for the display property include the following.

| Value | Meaning |
| --- | --- |
| none | Don't display this element. The element still exists, but the browser will not render it. |
| block | Display this element with a width that fills its parent element. A p or div element has block display by default. |
| inline | Display this element with a width that is only as big as its content. A b or span element has inline display by default. |
| flex | Display this element's children in a flexible orientation. |
| grid | Display this element's children in a grid orientation. |

We can demonstrate the different CSS display property values with the following HTML that contains a bunch of `div` elements. By default `div` elements have a display property value of `block`.

```
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>
```

By default, the HTML would display like this:

```html
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>
```

If we modify the display property associated with each element with the following CSS, then we get a totally different rendering.

```
.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

![Screen Shot 2024-01-30 at 6.18.25 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2f4ffbcf-8e97-4fd5-973c-de31367f01fc/0316e3c5-1356-4368-89ac-4726fb6a8a3b/Screen_Shot_2024-01-30_at_6.18.25_PM.png)

# **Viewport meta tag**

When smart mobile devices started gaining popularity they began to be used to view websites. However, the websites were optimized for desktop displays and not little tiny mobile screens. To solve this mobile browsers automatically started scaling the website so that it looked better on a small screen. Unfortunately, as web applications started being responsive to the screen size, the mobile browser's scaling got in the way. The solution is to include a meta tag in the `head` element of all your HTML pages. This tells the browser to not scale the page.

```
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

# Float

The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an `aside` element followed by a large paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

```
aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}
```

![Screen Shot 2024-01-30 at 6.21.00 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2f4ffbcf-8e97-4fd5-973c-de31367f01fc/7b567eb0-e9ce-4043-b2fb-368d42156f36/Screen_Shot_2024-01-30_at_6.21.00_PM.png)

# **Media queries**

One of the main CSS features for creating responsive applications is the `@media` selector. This selector dynamically detects the size and orientation of the device and applies CSS rules to represent the structure of the HTML in a way that accommodates the change.

We can use the `@media` selector to tell us which side of the screen (technically the viewport) is the longest. A media query takes one or more predicates separated by boolean operators. In our case we simply want to know if the screen is oriented in portrait mode (short side on top) or not. If it is then we transform all of our div elements by rotating them 270 degrees.

```
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```

We can demonstrate the result of applying the media selector by using the browser's debugger and switching into phone and responsive mode. You can also use this [CodePen](https://codepen.io/leesjensen/pen/rNKZOva) and play with it yourself by simply resizing the browser's window.

You can also use media queries to make entire pieces of your application disappear, or move to a different location. For example, if we had an aside that was helpful when the screen is wide, but took up too much room when the screen got narrow, we could use the following media query to make it disappear.

```
@media (orientation: portrait) {
  aside {
    display: none;
  }
}
```

Here is the [CodePen](https://codepen.io/leesjensen/pen/NWzLGmJ) for this example.

# CSS Grid:

Allows you to turn things into a responsive grid that moves and resizes based on the winow size.

```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

# CSS Flex(box):

The `flex` display layout is useful when you want to partition your application into areas that responsively move around as the window resizes or the orientation changes. In order to demonstrate the power of flex we will build an application that has a header, footer, and a main content area that is split into two sections, with controls of the left and content on the right.

Lets make a responsive design that looks like this:

![Screen Shot 2024-01-30 at 6.36.23 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/2f4ffbcf-8e97-4fd5-973c-de31367f01fc/7056df84-189e-4956-be05-4ac972039021/Screen_Shot_2024-01-30_at_6.36.23_PM.png)

HTML for it:

```
<body>
  <header>
    <h1>CSS flex &amp; media query</h1>
  </header>
  <main>
    <section>
      <h2>Controls</h2>
    </section>
    <section>
      <h2>Content</h2>
    </section>
  </main>
  <footer>
    <h2>Footer</h2>
  </footer>
</body>
```

Using flexbox in css to make it come alive:

```
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

```

To get the division of space for the flexbox children correct we add the following flex properties to each of the children.

- **header** - `flex: 0 80px` - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels. This creates a fixed size box.
- **footer** - `flex: 0 30px` - Like the header it will not grow and has a height of 30 pixels.
- **main** - `flex: 1` - One means it will get one fractional unit of growth, and since it is the only child with a non-zero growth value, it will get all the remaining space. Main also gets some additional properties because we want it to also be a flexbox container for the controls and content area. So we set its display to be `flex` and specify the `flex-direction` to be row so that the children are oriented side by side.

```
header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}

```

Now we just need to add CSS to the control and content areas represented by the two child section elements. We want the controls to have 25% of the space and the content to have the remaining. So we set the `flex` property value to 1 and 3 respectively. That means that the controls get one unit of space and the content gets three units of space. No matter how we resize things this ratio will responsively remain.

```
section:nth-child(1) {
  flex: 1;
  background-color: hsl(180, 10%, 80%);
}
section:nth-child(2) {
  flex: 3;
  background-color: white;
}
```

# Media query:

```
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

# Assignment:

Now it is your turn to build a fully responsive application. Create a CodePen that has a:

1. A fixed header with evenly spaced menu text on the left
2. A main content body with the text centered
3. A footer with the text centered

Here is an example of what you are attempting:

See this site for an example at the bottom:

https://learn.cs260.click/page/css/flexbox/flexbox_md

# Debugging CSS, CSS frameworks, Simon CSS and startup CSS

# Debugging CSS

To debug CSS, we can use the live server extension within VScode, and then use the inspect element to see which elements and sections correspond to what. You can also adjust elements in the inspect element to see how they look differently. 

# **CSS Frameworks**

Today, there are lots of different open source CSS frameworks available to choose from. Many of them contain the same types of functionality, but they all bring something a little different to the table.

### Tailwind:

Tailwind takes a different approach than traditional CSS frameworks. Instead of using large, rich, CSS rulesets to compartmentalize styling and functionality, it uses smaller definitions that are applied specifically to individual HTML elements. This moves much of the CSS representation out of the CSS file and directly into the HTML.

```
<div class="pt-6 md:p-8 text-center md:text-left space-y-4">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="profile.png" />
  <p class="text-lg font-medium">“Tailwind CSS”</p>
</div>
```

### Bootstrap:

You can integrate Bootstrap into your web applications simply by referencing the Bootstrap CSS files from their [content delivery network](https://getbootstrap.com/docs/5.2/getting-started/introduction/#cdn-links) (CDN). You then add the HTML link elements to your head element like this.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    ...
  </body>
</html>

```

If you are going to use Bootstrap components that require JavaScript (carousel, buttons, and more), you will also need to include Bootstrap's JavaScript module. You add this by putting the following at **the end** of your HTML body element.

```
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```

For future reference, to include Bootstrap in your application using NPM you would run the following from your console.

```
npm install bootstrap@5.2.3
```

### Using Bootstrap:

Once you have Bootstrap linked in your HTML files you can begin using the components it provides. Let's start with a simple button. When we use the Bootstrap `btn` CSS class, the button gets a nice looking rounded appearance. The Bootstrap `btn-primary` CSS class shades the button with the current primary color for the application, which by default is blue. The following demonstrates the difference between a Bootstrap style button and a plain vanilla button. Functionally they both work exactly the same. The Bootstrap button is just a lot easier on the eyes.

# JavaScript introduction and implementation

Basic commands: https://learn.cs260.click/page/javascript/typeConstruct/typeConstruct_md

## String functions

The string object has several interesting functions associated with it. Here are some of the commonly used ones.

| Function | Meaning |
| --- | --- |
| length | The number of characters in the string |
| indexOf() | The starting index of a given substring |
| split() | Split the string into an array on the given delimiter string |
| startsWith() | True if the string has a given prefix |
| endsWith() | True if the string has a given suffix |
| toLowerCase() | Converts all characters to lowercase |

```
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```

Functions: https://learn.cs260.click/page/javascript/functions/functions_md

# Regular Expressions, Rest, Spread, exceptions, scope, modules

## REG-EX: use for login/password/other input?

You can create a regular expression using the class constructor or a regular expression literal.

```
const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;

```

The `string` class has several functions that accept regular expressions. This includes `match`, `replace`, `search`, and `split`. For a quick test to see if there is a match you can use the regular expression object's `test` function.

```
const petRegex = /(dog)|(cat)|(bird)/gim;
const text = 'Both cats and dogs are pets, but not rocks.';

text.match(petRegex);
// RETURNS: ['cat', 'dog']

text.replace(petRegex, 'animal');
// RETURNS: Both animals and animals are pets, but not rocks.

petRegex.test(text);
// RETURNS: true
```

## Rest

Sometimes you want a function to take an unknown number of parameters. For example, if you wanted to write a function that checks to see if some number in a list is equal to a given number, you could write this using an array.

But JavaScript provides the `rest` syntax to make this easier. Think of it as a parameter that contains the `rest` of the parameters. To turn the last parameter of any function into a `rest` parameter you prefix it with three periods. You can then call it with any number of parameters and they are all automatically combined into an array.

```
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```

## Spread

Spread does the opposite of rest.

```
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```

## Javascript Exceptions

JavaScript supports exception handling using the `try catch` and `throw` syntax.

```
try {
  // normal execution code
} catch (err) {
  // exception handling code
} finally {
  // always called code
}
```

```
function connectDatabase() {
  throw new Error('connection error');
}

try {
  connectDatabase();
  console.log('never executed');
} catch (err) {
  console.log(err);
} finally {
  console.log('always executed');
}

// OUTPUT: Error: connection error
//         always executed
```

## **JavaScript destructuring**

Destructuring, not to be confused with destructing, is the process of pulling individual items out of an existing one, or removing structure. You can do this with either arrays or objects. This is helpful when you only care about a few items in the original structure.

An example of destructuring arrays looks like the following.

```
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
```

Understanding JavaScript scope is essential for making your programs run as you expect. Scope is defined as the variables that are visible in the current context of execution. JavaScript has four different types of scope:

1. **Global** - Visible to all code
2. **Module** - Visible to all code running in a module
3. **Function** - Visible within a function
4. **Block** - Visible within a block of code delimited by curly braces

Var is used to declare a variable, but the problem is that it ignores block scope.

It is strongly suggested that you only use `const` and `let` unless you fully understand why you are using `var`.

`This` statements can access variables outside of their scope if needed.

## Modules

We can export and import functions. 

For example, here is a simple module that exports a function that displays an alert.

**alert.js**

```
export function alertDisplay(msg) {
  alert(msg);
}

```

You can import the module's exported function into another module using the `import` keyword.

**main.js**

# Document Object Modeling, Local storage

The Document element allows us to access HTML classes as objects in a tree.

Basically allows you to create, destroy, modify html elements.

The DOM supports the ability to insert, modify, or delete the elements in the DOM. To create a new element you first create the element on the DOM document. You then insert the new element into the DOM tree by appending it to an existing element in the tree.

```
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');

```

To delete elements call the `removeChild` function on the parent element.

```
function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}

deleteElement('#courses div');
```

## Injecting HTML

The DOM also allows you to inject entire blocks of HTML into an element. The following code finds the first `div` element in the DOM and replaces all the HTML it contains.

```
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';

```

However, directly injecting HTML as a block of text is a common attack vector for hackers. If an untrusted party can inject JavaScript anywhere in your application then that JavaScript can represent itself as the current user of the application. The attacker can then make requests for sensitive data, monitor activity, and steal credentials. The example below shows how the img element can be used to launch an attack as soon as the page is loaded.

```
<img src="bogus.png" onerror="console.log('All your base are belong to us')" />

```

If you are injecting HTML, make sure that it cannot be manipulated by a user. Common injection paths include HTML input controls, URL parameters, and HTTP headers. Either sanitize any HTML that contains variables, or simply use DOM manipulation functions instead of using `innerHTML`.

## Event Listeners:

All DOM elements support the ability to attach a function that gets called when an event occurs on the element. These functions are called [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Here is an example of an event listener that gets called when an element gets clicked.

```
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});

```

There are lots of possible events that you can add a listener to. This includes things like mouse, keyboard, scrolling, animation, video, audio, WebSocket, and clipboard events. You can see the full list on [MDN](https://developer.mozilla.org/en-US/docs/Web/Events). Here are a few of the more commonly used events.

| Event Category | Description |
| --- | --- |
| Clipboard | Cut, copied, pasted |
| Focus | An element gets focus |
| Keyboard | Keys are pressed |
| Mouse | Click events |
| Text selection | When text is selected |

You can also add event listeners directly in the HTML. For example, here is a `onclick` handler that is attached to a button.

```
<button onclick='alert("clicked")'>click me</button>
```

# Local Storage:

The browser's `localStorage` API provides the ability to persistently store and retrieve data (i.e. scores, usernames, etc.,) on a user's browser across user sessions and HTML page renderings. For example, your frontend JavaScript code could store a user's name on one HTML page, and then retrieve the name later when a different HTML page is loaded. The user's name will also be available in local storage the next time the same browser is used to access the same website.

In addition to persisting application data between page renderings, `localStorage` is also used as a cache for when data cannot be obtained from the server. For example, your frontend JavaScript could store the last high scores obtained from the service, and then display those scores in the future if the service is not available.

## How to use LocalStorage

There are four main functions that can be used with localStorage.

| Function | Meaning |
| --- | --- |
| setItem(name, value) | Sets a named item's value into local storage |
| getItem(name) | Gets a named item's value from local storage |
| removeItem(name) | Removes a named item from local storage |
| clear() | Clears all items in local storage |

A local storage value must be of type `string`, `number`, or `boolean`. If you want to store a JavaScript object or array, then you must first convert it to a JSON string with `JSON.stringify()` on insertion, and parse it back to JavaScript with `JSON.parse()` when retrieved.

### EXAMPLE:

Open your startup website and run the following code in the browser's dev tools console window.

```
let user = 'Alice';

let myObject = {
  name: 'Bob',
  info: {
    favoriteClass: 'CS 260',
    likesCS: true,
  },
};

let myArray = [1, 'One', true];

localStorage.setItem('user', user);
localStorage.setItem('object', JSON.stringify(myObject));
localStorage.setItem('array', JSON.stringify(myArray));

console.log(localStorage.getItem('user'));
console.log(JSON.parse(localStorage.getItem('object')));
console.log(JSON.parse(localStorage.getItem('array')));

```

**Output**

```
Alice
{name: 'Bob', info: {favoriteClass: 'CS 260', likesCS: true}
[1, 'One', true]

```

Notice that you are able to see the round trip journey of the local storage values in the console output. If you want to see what values are currently set for your application, then open the `Application` tab of the dev tools and select `Storage > Local Storage` and then your domain name. With the dev tools you can add, view, update, and delete any local storage values.

# Promises,

Only 1 javascript program can run at a time, but, you can schedule or assign other programs to run using Promises. THey have 3 states:

1. **pending** - Currently running asynchronously
2. **fulfilled** - Completed successfully
3. **rejected** - Failed to complete

You create a promise by calling the Promise object constructor and passing it an executor function that runs the asynchronous operation. Executing asynchronously means that promise constructor may return before the promise executor function runs.

```
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay('In promise', i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2
```

## Resolving and rejecting

Now that we know how to use a promise to execute asynchronously, we need to be able to set the state to `fulfilled` when things complete correctly, or to `rejected` when an error happens. The promise executor function takes two functions as parameters, `resolve` and `reject`. Calling `resolve` sets the promise to the `fulfilled` state, and calling `reject` sets the promise to the `rejected` state.

Consider the following "coin toss" promise that waits ten seconds and then has a fifty percent chance of resolving or rejecting.

```
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('success');
    } else {
      reject('error');
    }
  }, 10000);
});

```

If you log the coinToss promise object to the console immediately after calling the constructor, it will display that it is in the `pending` state.

```
console.log(coinToss);
// OUTPUT: Promise {<pending>}

```

If you then wait ten seconds and the log the coinToss promise object again, the state will either show as `fulfilled` or `rejected` depending upon the way the coin landed.

```
console.log(coinToss);
// OUTPUT: Promise {<fulfilled>}
```

## Then, catch, finally

With the ability to asynchronously execute and set the resulting state, we now need a way to generically do something with the result of a promise after it resolves. This is done with functionality similar to exception handling. The promise object has three functions: `then`, `catch`, and `finally`. The `then` function is called if the promise is fulfilled, `catch` is called if the promise is `rejected`, and `finally` is always called after all the processing is completed.

We can rework our coinToss example and make it so 10 percent of the time the coin falls off the table and resolves to the rejected state. Otherwise the promise resolves to fulfilled with a result of either `heads` or `tails`.

```
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});

```

We then chain the `then`, `catch` and `finally` functions to the coinToss object in order to handle each of the possible results.

```
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```

Observors are another version of promises, they are similar but not the same.
