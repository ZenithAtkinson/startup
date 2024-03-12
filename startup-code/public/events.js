//https://blog.logrocket.com/localstorage-javascript-complete-guide/
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('#event-form')) {
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
              rsvp: eventRSVP,
              username: localStorage.getItem("userName") //Username from local storage:
          };

          saveEvent(eventData);

          alert('Event saved successfully!');
          document.querySelector('#smessage').textContent = 'Event saved successfully!';
      });
  }

  updateEventTable();
});
  
  function updateEventTable() {
    const username = localStorage.getItem("userName"); //Current username
    const tableBody = document.querySelector('#prof-evs tbody');
    // Clear the table body to prepare for new data
    tableBody.innerHTML = '';
  
    //Fetch events from the server
    fetch(`/events/${encodeURIComponent(username)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Error');
      }
      return response.json();
    })
      .then(events => {
          // Iterating...
        events.forEach(eventData => {
          const newRow = `
            <tr>
              <td>${eventData.name}</td>
              <td>${eventData.time}</td>
              <td>${eventData.location}</td>
              <td>${eventData.details}</td>
              <td>${eventData.rsvp ? 'Yes' : 'No'}</td>
            </tr>`;
          tableBody.innerHTML += newRow;
        });
      })
      .catch((error) => {
        console.error('ERROR: ', error);
      });
  }
  

  //saving events? so multiple can be used at once. See: https://javascript.info/localstorage
  function saveEvent(eventData) {
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error2');
      }
      return response.text(); // or .json() if your server sends back JSON
    })
    .then(() => {
      alert('Event saved successfully!');
      document.querySelector('#smessage').textContent = 'Event saved successfully!';
      updateEventTable(); // reload the event table to include the new event
    })
    .catch((error) => {
      console.error('Error with fetch(?)', error);
    });
  }