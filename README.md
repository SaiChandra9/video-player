# Getting Started with React Player Application


### Project Overview
This video player lets you easily manage and watch your favorite videos. You can browse through a list of pre-selected videos, change their order however you like, or even add and remove videos as you please. Playing and controlling the videos is simple with buttons like "next" and "previous," play/pause, and volume controls. Want to see the video in full screen? Just click a button! Or, adjust the playback speed from 1x to 2x to find your perfect pace. Plus, handy keyboard shortcuts give you quick access to full screen and play/pause functions.



### Project Structure
- public
- src
  - Componenets
    - Controls 
    - Duration
    - PlayBackSpeed
    - Playlist
    - PopUP
    - VideoPlayer
    - Volume
  - App.js
  - index.css
  - index.js
- package.json
- package-lock.json

**Components Description**
- Controls:
  - Includes play, pause, go to previous video, and next video buttons.
  - Displays duration component showing the current time and total length of the video.
  - Provides playback speed component to adjust speed from 1x to 2x.
  - Features volume component with mute functionality and volume bar.

- Duration:
  - Displays current time and total length of the video.
  - Shows current running time in bar format for visual representation of playback progress.

- Playback Speed:
  - Allows selection of playback speed ranging from 1x to 2x.


- Playlist:
  - Enables addition and removal of videos from the playlist.
  - Supports reordering of videos within the playlist.
  - Includes a search bar for finding specific videos in the playlist.
  - Implements re-order functionality for both original and filtered playlist videos.

- Pop-up:
  -  Contains certain videos that can be added to the playlist.

- Video Player:
  - Utilizes React Player library for smooth video playback.
  - Embeds controls component within the video player component.

- Volume:
  - Offers functionality to mute the video.
  - Allows adjustment of volume using a volume bar.

## Tech Stack Used
  - ReactJS, StyledComponents, axios for fetching videos, MaterialUI

## Available Scripts

In the project directory, you can run:

### `npm install`

It installs all the dependencies listed in the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Live Link of the Application

Live link of the application is
[
](https://main--playlist-video-player.netlify.app/)https://main--playlist-video-player.netlify.app/



### Light House Score

<img width="562" alt="Screenshot 2024-02-18 at 10 45 51 PM" src="https://github.com/SaiChandra9/video-player/assets/142481299/24c61d51-6cb2-4661-bae9-e0ff4194a251">







