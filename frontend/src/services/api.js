import { supabase } from "../supabase/supabaseClient"; // Your existing Supabase client

const JSON_SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

class ApiService {
  // Supabase methods (authentication, user management)
  async signUp(email, password) {
    return await supabase.auth.signUp({ email, password });
  }

  async signIn(email, password) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return await supabase.auth.signOut();
  }

  async getCurrentUser() {
    return await supabase.auth.getUser();
  }

  // JSON Server methods (events, clubs, etc.)
  async getEvents() {
    const response = await fetch(`${JSON_SERVER_URL}/events`);
    return response.json();
  }

  async getClubs() {
    const response = await fetch(`${JSON_SERVER_URL}/clubs`);
    return response.json();
  }

  async getEventTypes() {
    const response = await fetch(`${JSON_SERVER_URL}/eventTypes`);
    return response.json();
  }

  async getTags() {
    const response = await fetch(`${JSON_SERVER_URL}/tags`);
    return response.json();
  }

  async getEventAttendance() {
    const response = await fetch(`${JSON_SERVER_URL}/event_attendance`);
    return response.json();
  }

  async getEventVolunteers() {
    const response = await fetch(`${JSON_SERVER_URL}/event_volunteers`);
    return response.json();
  }

  async getEventBookmarks() {
    const response = await fetch(`${JSON_SERVER_URL}/event_bookmarks`);
    return response.json();
  }

  async getUsers() {
    const response = await fetch(`${JSON_SERVER_URL}/users`);
    return response.json();
  }

  async getMetadata() {
    const response = await fetch(`${JSON_SERVER_URL}/metadata`);
    return response.json();
  }

  // POST methods
  async createEvent(eventData) {
    const response = await fetch(`${JSON_SERVER_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  }

  async createClub(clubData) {
    const response = await fetch(`${JSON_SERVER_URL}/clubs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clubData),
    });
    return response.json();
  }

  async createTag(tagData) {
    const response = await fetch(`${JSON_SERVER_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });
    return response.json();
  }

  async createEventType(eventTypeData) {
    const response = await fetch(`${JSON_SERVER_URL}/eventTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventTypeData),
    });
    return response.json();
  }

  async createEventAttendance(attendanceData) {
    const response = await fetch(`${JSON_SERVER_URL}/event_attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    });
    return response.json();
  }

  async createEventVolunteer(volunteerData) {
    const response = await fetch(`${JSON_SERVER_URL}/event_volunteers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(volunteerData),
    });
    return response.json();
  }

  async createEventBookmark(bookmarkData) {
    const response = await fetch(`${JSON_SERVER_URL}/event_bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmarkData),
    });
    return response.json();
  }

  async createUser(userData) {
    const response = await fetch(`${JSON_SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  // PUT methods
  async updateEvent(id, eventData) {
    const response = await fetch(`${JSON_SERVER_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  }

  async updateClub(id, clubData) {
    const response = await fetch(`${JSON_SERVER_URL}/clubs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clubData),
    });
    return response.json();
  }

  async updateTag(id, tagData) {
    const response = await fetch(`${JSON_SERVER_URL}/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });
    return response.json();
  }

  async updateEventType(id, eventTypeData) {
    const response = await fetch(`${JSON_SERVER_URL}/eventTypes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventTypeData),
    });
    return response.json();
  }

  async updateEventAttendance(id, attendanceData) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_attendance/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      }
    );
    return response.json();
  }

  async updateEventVolunteer(id, volunteerData) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_volunteers/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volunteerData),
      }
    );
    return response.json();
  }

  async updateUser(id, userData) {
    const response = await fetch(`${JSON_SERVER_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  // DELETE methods
  async deleteEvent(id) {
    const response = await fetch(`${JSON_SERVER_URL}/events/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  async deleteClub(id) {
    const response = await fetch(`${JSON_SERVER_URL}/clubs/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  async deleteTag(id) {
    const response = await fetch(`${JSON_SERVER_URL}/tags/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  async deleteEventType(id) {
    const response = await fetch(`${JSON_SERVER_URL}/eventTypes/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  async deleteEventAttendance(id) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_attendance/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }

  async deleteEventVolunteer(id) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_volunteers/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }

  async deleteEventBookmark(id) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_bookmarks/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }

  async deleteUser(id) {
    const response = await fetch(`${JSON_SERVER_URL}/users/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  // GET by ID methods
  async getEventById(id) {
    const response = await fetch(`${JSON_SERVER_URL}/events/${id}`);
    return response.json();
  }

  async getClubById(id) {
    const response = await fetch(`${JSON_SERVER_URL}/clubs/${id}`);
    return response.json();
  }

  async getUserById(id) {
    const response = await fetch(`${JSON_SERVER_URL}/users/${id}`);
    return response.json();
  }

  // Query methods (json-server supports query parameters)
  async getEventsByClub(clubId) {
    const response = await fetch(
      `${JSON_SERVER_URL}/events?clubId=${clubId}`
    );
    return response.json();
  }

  async getEventsByType(eventTypeId) {
    const response = await fetch(
      `${JSON_SERVER_URL}/events?eventTypeId=${eventTypeId}`
    );
    return response.json();
  }

  async getEventAttendanceByEvent(eventId) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_attendance?event_id=${eventId}`
    );
    return response.json();
  }

  async getEventVolunteersByEvent(eventId) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_volunteers?event_id=${eventId}`
    );
    return response.json();
  }

  async getEventBookmarksByEvent(eventId) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_bookmarks?event_id=${eventId}`
    );
    return response.json();
  }

  async getUserBookmarks(userId) {
    const response = await fetch(
      `${JSON_SERVER_URL}/event_bookmarks?user_id=${userId}`
    );
    return response.json();
  }
}

export default new ApiService();
