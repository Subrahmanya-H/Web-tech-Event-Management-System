import React, { useState, useEffect } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getevents")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <div className="events-container">
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.EVENTID}>
              <h3>{event.title}</h3>
              <p>
                <strong>Start Date:</strong> {event.start}
              </p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
              <p>
                <strong>More Info:</strong> <a href={event.url}>{event.url}</a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;
