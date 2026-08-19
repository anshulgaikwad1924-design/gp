# Skillmate 🎓
*A peer-to-peer skill exchange platform for university campuses.*

**Live Demo:** [https://anshulgaikwad1924-design.github.io/gp/](https://anshulgaikwad1924-design.github.io/gp/)

---

## 👥 Team
**Team Name:** [Insert Team Name Here]
* **Anshul Gaikwad**
* **Elvin Neware**
* **Arya Ramteke**

---

## 🛑 Problem Statement (PS)
University students frequently want to learn new, highly relevant skills (such as React, UI/UX Design, or Data Structures) but often cannot afford expensive bootcamps or online courses. At the same time, these very students already possess valuable skills that their peers want to learn. Currently, there is no localized, safe, and structured platform on campuses for students to discover each other's talents and trade their knowledge peer-to-peer without exchanging money.

---

## 💡 Process of Solution
To solve this, we built **Skillmate**: a completely free, barter-based educational network restricted to campus students. 

### 1. Smart Matching Algorithm
We developed a reciprocal matching system. When a user logs in, the algorithm cross-references the skills they *want to learn* against the skills others *can teach*, and vice-versa. It calculates a "Match Percentage" and ranks the best potential study partners on the main dashboard.

### 2. Swap Requests & Scheduling
Instead of unstructured messaging, users send formal "Swap Requests" proposing a specific skill trade (e.g., "I teach you Figma, you teach me React"). Once accepted, these requests move to a structured "Sessions" dashboard where students can track upcoming meetings, mark them as completed, and rate each other's teaching quality.

### 3. Virtual Meet "Lounge" (Integrated Voice/Video)
To eliminate friction, we integrated the **Jitsi Meet API** directly into the application. Students don't need to generate Zoom links or share phone numbers. They simply navigate to the "Lounge", click a Voice Channel (like `# Web Dev Help` or `# Quiet Study`), and instantly enter an embedded, real-time video/audio call with their peers.

### 4. Technical Architecture
- **Frontend:** Vanilla HTML, CSS, and JavaScript designed with a modern, glassmorphic, and dynamic UI/UX approach. 
- **Video/Audio:** Jitsi Meet External API for seamless embedded communications.
- **Data Persistence:** Currently utilizing a hybrid local-storage fallback mechanism for instant static deployment (GitHub Pages), with an architecture designed to easily migrate to **Supabase** for full cross-device synchronization in the next phase.

---

## 🚀 How to Run Locally
1. Clone this repository.
2. Open `index.html` in any modern web browser.
3. Choose a profile from the Quick Login screen to explore the app!
