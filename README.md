# NeoTouch

NeoTouch is a low-cost AI-powered smart board platform that transforms any projector, TV, monitor, wall, or flat surface into an interactive touch-enabled display using only a webcam and software.

The project combines computer vision, hand tracking, gesture recognition, AI-assisted teaching tools, and play-based learning experiences into a single platform. Instead of relying on expensive smart board hardware, NeoTouch enables natural interaction through hand movements, allowing users to draw, write, teach, present, and collaborate on any display surface.  

PLEASE NOTE THAT THIS IS JUST THE CLICKABLE PROTOTYPE, THE WORKING PROTOTYPE CAN BE FOUND IN THE https://github.com/Mr-Blahaj/NeoTouch BRANCHES HOWEVER IT LACKS SOME IMPLEMENTATIONS. 
---

## The Problem

Interactive smart boards are expensive and inaccessible for many schools, learning centers, community organizations, and low-resource environments. At the same time, early childhood educators often lack engaging, movement-based digital learning tools that encourage participation, creativity, and collaboration.

Most educational technology is either:
- Screen-based and individual-focused
- Expensive to deploy at scale
- Difficult for teachers to set up
- Not designed for young learners

NeoTouch addresses these challenges by turning existing displays into interactive learning surfaces with minimal hardware requirements. 

---

## What NeoTouch Does

NeoTouch creates an interactive smart-board experience using a webcam mounted near a display or projection surface.

The system tracks hand movements in real time, maps them to screen coordinates, and converts gestures into interactions such as:

- Touch
- Click
- Drawing
- Drag and drop
- Navigation
- Whiteboard annotations

Users can interact directly with projected content without touching the display itself.  
---

## Core Components

### Smart Board Engine

The smart board engine converts any display into an interactive surface through:

- Real-time hand tracking
- Gesture recognition
- Cursor mapping
- Surface calibration
- Perspective correction

This allows users to control content using natural hand movements.  

### Interactive Whiteboard

NeoTouch includes a built-in whiteboard for:

- Drawing
- Annotation
- Teaching
- Presentations
- Brainstorming

The whiteboard supports shape correction, drawing tools, erasing, highlighting, and collaborative interaction.  
### AI Teaching Assistant

The platform integrates local AI models to assist educators by generating:

- Explanations
- Definitions
- Flowcharts
- Lesson support material
- Educational content

AI is designed to support teachers rather than replace them.  
### Recording & Accessibility

NeoTouch can record sessions and provide:

- Live subtitles
- Speech transcription
- Caption generation
- Session playback

These features improve accessibility and make lessons easier to revisit later.  
---

## CogniPlay Learning Platform

Built on top of NeoTouch is CogniPlay, an interactive learning environment designed for early childhood education.

CogniPlay focuses on play-based learning through activities such as:

- Pattern recognition
- Shape matching
- Memory games
- Tracing exercises
- Sorting activities
- Drawing and creativity tasks
- Problem-solving puzzles

The goal is to encourage learning through movement, interaction, and exploration rather than passive screen time. 
---

## Adaptive Learning

The platform tracks learner interactions and can adapt activities based on:

- Performance
- Completion history
- Skill progression
- Cognitive strengths
- Areas requiring additional practice

Future versions aim to generate personalized learning experiences and teacher recommendations while keeping educators in control of all decisions. 
---

## Accessibility & Inclusion

NeoTouch was designed with accessibility and affordability in mind.

Key principles include:

- Low hardware requirements
- Local-first operation
- Group learning support
- Large interactive surfaces
- Visual and movement-based interaction
- Support for subtitles and captions
- Future multilingual support

The platform is intended to be usable in classrooms, community learning centers, and other low-resource educational environments.
---

## Technology Stack

### Computer Vision
- MediaPipe Hands
- Gesture Recognition Engine
- Surface Calibration System

### Frontend
- HTML
- CSS
- JavaScript

### Learning Platform
- React
- TypeScript
- Vite

### AI Layer
- Ollama
- Llama 3
- Whisper / whisper.cpp

### System Integration
- Python OS Bridge
- Cursor Control Layer
- Recording Pipeline

---

## Current Status

The project currently includes:

- Smart board interaction
- Hand tracking
- Surface calibration
- Interactive whiteboard
- AI-powered flowchart generation
- AI-assisted explanations
- Recording interface
- Live subtitles
- Play-based puzzle engine
- Parent dashboard prototypes
- Teacher dashboard prototypes

Several components are functional today, while others are being refined for classroom-scale deployment. 
---

## Vision

NeoTouch aims to make interactive digital learning accessible anywhere by eliminating the need for specialized smart-board hardware.

By combining computer vision, AI assistance, and play-based learning experiences, the platform enables any display to become a collaborative learning surface where users can teach, learn, create, and interact naturally.

The long-term goal is to create an affordable, scalable, and accessible smart learning platform that can be deployed in classrooms, training centers, community spaces, and low-resource educational environments around the world.  
# NeoTouch

NeoTouch is a low-cost AI-powered smart board platform that transforms any projector, TV, monitor, wall, or flat surface into an interactive touch-enabled display using only a webcam and software.

The project combines computer vision, hand tracking, gesture recognition, AI-assisted teaching tools, and play-based learning experiences into a single platform. Instead of relying on expensive smart board hardware, NeoTouch enables natural interaction through hand movements, allowing users to draw, write, teach, present, and collaborate on any display surface. 

---

## The Problem

Interactive smart boards are expensive and inaccessible for many schools, learning centers, community organizations, and low-resource environments. At the same time, early childhood educators often lack engaging, movement-based digital learning tools that encourage participation, creativity, and collaboration.

Most educational technology is either:
- Screen-based and individual-focused
- Expensive to deploy at scale
- Difficult for teachers to set up
- Not designed for young learners

NeoTouch addresses these challenges by turning existing displays into interactive learning surfaces with minimal hardware requirements. 

---

## What NeoTouch Does

NeoTouch creates an interactive smart-board experience using a webcam mounted near a display or projection surface.

The system tracks hand movements in real time, maps them to screen coordinates, and converts gestures into interactions such as:

- Touch
- Click
- Drawing
- Drag and drop
- Navigation
- Whiteboard annotations

Users can interact directly with projected content without touching the display itself.  
---

## Core Components

### Smart Board Engine

The smart board engine converts any display into an interactive surface through:

- Real-time hand tracking
- Gesture recognition
- Cursor mapping
- Surface calibration
- Perspective correction

This allows users to control content using natural hand movements.  
### Interactive Whiteboard

NeoTouch includes a built-in whiteboard for:

- Drawing
- Annotation
- Teaching
- Presentations
- Brainstorming

The whiteboard supports shape correction, drawing tools, erasing, highlighting, and collaborative interaction.  
### AI Teaching Assistant

The platform integrates local AI models to assist educators by generating:

- Explanations
- Definitions
- Flowcharts
- Lesson support material
- Educational content

AI is designed to support teachers rather than replace them.  
### Recording & Accessibility

NeoTouch can record sessions and provide:

- Live subtitles
- Speech transcription
- Caption generation
- Session playback

These features improve accessibility and make lessons easier to revisit later.  
---

## CogniPlay Learning Platform

Built on top of NeoTouch is CogniPlay, an interactive learning environment designed for early childhood education.

CogniPlay focuses on play-based learning through activities such as:

- Pattern recognition
- Shape matching
- Memory games
- Tracing exercises
- Sorting activities
- Drawing and creativity tasks
- Problem-solving puzzles

The goal is to encourage learning through movement, interaction, and exploration rather than passive screen time. 
---

## Adaptive Learning

The platform tracks learner interactions and can adapt activities based on:

- Performance
- Completion history
- Skill progression
- Cognitive strengths
- Areas requiring additional practice

Future versions aim to generate personalized learning experiences and teacher recommendations while keeping educators in control of all decisions.  
---

## Accessibility & Inclusion

NeoTouch was designed with accessibility and affordability in mind.

Key principles include:

- Low hardware requirements
- Local-first operation
- Group learning support
- Large interactive surfaces
- Visual and movement-based interaction
- Support for subtitles and captions
- Future multilingual support

The platform is intended to be usable in classrooms, community learning centers, and other low-resource educational environments.

---

## Technology Stack

### Computer Vision
- MediaPipe Hands
- Gesture Recognition Engine
- Surface Calibration System

### Frontend
- HTML
- CSS
- JavaScript

### Learning Platform
- React
- TypeScript
- Vite

### AI Layer
- Ollama
- Llama 3
- Whisper / whisper.cpp

### System Integration
- Python OS Bridge
- Cursor Control Layer
- Recording Pipeline

---

## Current Status

The project currently includes:

- Smart board interaction
- Hand tracking
- Surface calibration
- Interactive whiteboard
- AI-powered flowchart generation
- AI-assisted explanations
- Recording interface
- Live subtitles
- Play-based puzzle engine
- Parent dashboard prototypes
- Teacher dashboard prototypes

Several components are functional today, while others are being refined for classroom-scale deployment. 
---

## Vision

NeoTouch aims to make interactive digital learning accessible anywhere by eliminating the need for specialized smart-board hardware.

By combining computer vision, AI assistance, and play-based learning experiences, the platform enables any display to become a collaborative learning surface where users can teach, learn, create, and interact naturally.

The long-term goal is to create an affordable, scalable, and accessible smart learning platform that can be deployed in classrooms, training centers, community spaces, and low-resource educational environments around the world.