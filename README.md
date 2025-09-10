
#  Campus Buddy

A centralized platform for **students and clubs at NST** to discover, manage, and track campus events — helping the campus stay connected and engaged.

---

##  Problem

At NST-ADYPU, students often miss out on exciting campus events — workshops, fests, and hackathons — due to scattered communication across Slack, WhatsApp, or word of mouth.
At the same time, event organizers face difficulties in finding volunteers and estimating student turnout, relying on repeated Google Forms and guesswork to manage everything.

---

## Solution

**Campus Buddy** brings everything under one roof with a **student-first, modern web app** that:

* Helps **students explore, RSVP**, and track events
* Allows **clubs to create/manage events**
* Provides personalized **dashboards and profiles**
* Lets students quickly **add events to their calendar** with one click
* Features **role-based authentication** for secure access
* Supports volunteer registrations for events
* Will soon support features like **gamification, and email reminders**

---

##  Key Features

### Students

* **Google Sign-in Authentication**
*  **Browse Events**: Upcoming & past events in one place
*  **Smart Filtering**: Filter by club, category, department, date
* **RSVP System**: "Going", "Not Going", "Maybe", "Volunteer"
* **My Events Dashboard**: Track your RSVP’d events
* **Student Profile Card**: Course, year, and stats
* **Add to Calendar**: One-click calendar integration
* **Responsive Design**: Works well on all devices

---

### Clubs

* **Verified Club Login** via Google
* **Create/Edit/Delete Events** with ease
* **RSVP Analytics**: Track event engagement
* **Club Profile**: Club name, department, bio, stats
* **Club Dashboard**: View and manage all events(Stats/Create/Edit/Delete)
* **Attendee Management**: View RSVPs by type

---

### 💡 Future Additions

* **Email Reminders**: Timely nudges before events
* **Gamification**: Points, badges, and participation streaks

---

## Tech Stack

| Layer        | Technology                                                   |
| ------------ | ------------------------------------------------------------ |
| Frontend     | React (Vite), External CSS, React Router                     |
| Backend      | json-server, Express.js, Node.js                             |
| Auth & DB    | Supabase (PostgreSQL + Auth), Google OAuth                   |
| UI Libraries | Selectively using components from Aceternity UI / React Bits |
| Hosting      | Vercel (frontend), Render (backend)                          |
| Dev Tools    | ESLint, npm                                                  |


---


## Getting Started as a Contributor

> Want to contribute? Start here

1. **Fork** this repo
2. Clone your fork

   ```bash
   git clone https://github.com/your-username/campusbuddy.git
   ```
3. Install Frontend dependencies

   ```bash
   cd frontend
   npm install
   ```
4. Install Backend dependencies

   ```bash
   cd ../backend
   npm install
   ```
5. Setup Environment Variables

6. Start Development

   **Backend**: 
   ```bash
   npm start
   ```
   **Frontend**: 
   ```bash
   npm run dev
   ```
8. Create a new branch

   ```bash
   git checkout -b feature/your-feature-name
   ```
9. Make your changes and & commit 

   ```bash
   git commit -m "Add: your feature description"
   ```
10. Push and create PR

   ```bash
   git push origin feature/your-feature
   ```
   
**Note:** All `.env.local` files are ignored — never push secret keys or tokens.
> Don't forget to configure `.env.local` (and keep it out of version control).


---


## Project Objectives

* Centralize event discovery and management
* Personalize experience through role-based dashboards
* Simplify event creation for clubs
* Help students stay informed and organized through RSVP and calendar support

---

## Let’s Build It Together

Campus Buddy is built by students, for students. Whether you're a coder, designer, or organizer — your contribution matters!

> Let’s build something that brings campus life together. 

---
