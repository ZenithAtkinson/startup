//https://blog.logrocket.com/localstorage-javascript-complete-guide/
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#event-form').addEventListener('submit', function(event) {
    
    event.preventDefault();
  
   //vals in form
    const eventName = document.querySelector('#event-name').value;
    const eventLocation = document.querySelector('#event-location').value;
    const eventTime = document.querySelector('#event-time').value;
    const eventDetails = document.querySelector('#event-details').value;
    
    const eventRSVP = document.querySelector('#rsvp').checked;
  
    //event obj
    const eventData = {
      name: eventName,
      location: eventLocation,
      time: eventTime,
      details: eventDetails,
      rsvp: eventRSVP
    };
  
    //localstorage?
    saveEvent(eventData);
    
    alert('Event saved successfully!');
    document.querySelector('#smessage').textContent = 'Event saved successfully!';

    //tables for displaying.
    if (eventData) {
        updateEventTable(eventData);
      }
    
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const eventData = JSON.parse(localStorage.getItem('eventData'));
    //tales for displaying
    if (eventData) {
      updateEventTable(eventData);
    }
  });
  
  function updateEventTable() {
    const tableBody = document.querySelector('#prof-evs tbody');
    //clearing... just in case
    tableBody.innerHTML = '';
  
    //get storage
    const events = JSON.parse(localStorage.getItem('events')) || [];
  
    //new rows for each element
    events.forEach(eventData => {
      const newRow = `
        <tr>
          <td>${eventData.name}</td>
          <td>${eventData.time}</td>
          <td>${eventData.location}</td>
          <td>${eventData.details}</td>
          <td>${eventData.rsvp ? 'Yes' : 'No'}</td>
        </tr>`;
      tableBody.innerHTML += newRow; //new rows
    });
  }
  

  //saving events? so multiple can be used at once. See: https://javascript.info/localstorage
  function saveEvent(eventData) {
    //Get save data
    const events = JSON.parse(localStorage.getItem('events')) || [];
    
    //Adding new event
    events.unshift(eventData);
    
    //Up to... 4 events
    while (events.length > 4) {
      events.pop();
    }
    
    localStorage.setItem('events', JSON.stringify(events));
  }