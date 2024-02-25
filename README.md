### My Elevator Pitch for FeastFinder:

**FeastFinder:** the go-to app for college students seeking free or low-cost food events on campus. This platform connects students with up-to-date information on where to find free meals, snacks, and food-related gatherings. Whether it's a service activity, a guest lecture, or a social event, if there's free food, it's on FeastFinder. Save money, discover new events, and enjoy the campus life to its fullest!

### **Key Features:**

1. **Event Posting**: Users can post details about food events, including time, location, type of food, and any participation requirements.
2. **Event Browsing**: A feed or calendar view where users can browse upcoming food events at their college.
3. **User Authentication**: Students can create accounts and log in to post or save events.
4. **Real-Time Updates**: Utilize WebSocket for live updates on new events or changes.
5. **Database Integration**: Store event details, user profiles, and saved events.
6. **Search and Filters**: Allow users to search for events by date, location, or other criteria like food type.
7. **Interactive Map**: Show event locations on an interactive campus map.
8. **Community Interaction**: Options for users to comment on, like, or share events.
9. **Event Reminders**: Push notifications or email alerts for saved or upcoming events.

### **Technology Usage:**

- **HTML/CSS**: Create a user-friendly and visually appealing interface.
- **JavaScript**: Add interactivity for event postings, browsing, and user interactions.
- **Web Service**: Implement features like weather forecasts for outdoor events.? And handle the creation and deletion of posts and reporting. Maybe also search and filtering.
- **Authentication**: Manage user sign-up, login, and profile management.
- **Database**: Persistently store event details and user information.
- **WebSocket**: Enable real-time notifications for new events or updates.
- **React**: Develop a dynamic and responsive frontend for the app.

### Design Sketches (ninjamock.com)

![Main Page Sketch:](https://github.com/ZenithAtkinson/startup/blob/main/Images/mainpage_screenshot.png)

![Add event sketch](https://github.com/ZenithAtkinson/startup/blob/main/Images/Addevent_screenshot.png)

![Main Page View Event Sketch](https://github.com/ZenithAtkinson/startup/blob/main/Images/viewevent_screenshot.png)

# Initial HTML Deliverable
I have 4 sites for the website: The index, a profile site, an about, and an event creation. Each one has a navigation menu that can direct you to every other website, along with a header and footer section. 
- Index: The index site, aka dashboard aka the home, has all the necessary info needed for viewing a list of upcoming events near you. The table has all the necessary values for the events. Also has a login section.
- Profile: A page for signing in, and viewing your personal profile including all the events you have created.
- About: Has general information about the website and contact info
- Event creation: Has a table will boxes to fill in for creating an event with all the necessary criteria.

There are dividers between different sections, and different sized fonts.

# CSS deliverable
This was much more difficult than the HTML deliverable, and I will probably have to continue to update and change it in the future depending on where my website goes. I want to add functionality with popups and such, but I think I need to wait to use javascript for that, so some more CSS changes are expected.

I learned a lot regarding CSS: 
- I gave all my .html files access to one main index.css file to keep the formatting and rounding of blocks and colors the same without having to modify the code. It was hard for me to get all the links on the same line at the top with the title but I was able to break them from their original formatting.
- I also made a lot of things just have flex by default, and added some @media tags at the bottom that were similar to the ones shown in lecture. 
- I also increased the sizes of the sample tables, and added a login button symbol that will be a popup for the login window. For now, it is just a link that doesnt go anywhere.
- Added blue colors to all the elements
- Filled out tables with temporary information, and displayed them properly. Also gave input tables proper inputs
- Rounded differenct elements and boxes
- Gave 1 navigation bar at the top with the different pages, with a login on the right. Top nav title changes depending on page.
- Changed fonts, text color, padding, and margins. 
