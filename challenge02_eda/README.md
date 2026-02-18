# Contact Manager - React App

A modern React application for managing contacts with a loader, add, and delete functionality.

## Features

✅ **Loader on Startup** - Displays a spinner while loading initial data (2-second simulated delay)
✅ **Initial Contact List** - Pre-loaded with sample contacts
✅ **Add Contacts** - Form to add new contacts with name and phone number
✅ **Delete Contacts** - Remove contacts with confirmation dialog
✅ **Component-Based Architecture** - Well-organized, reusable components
✅ **Responsive Design** - Works on mobile and desktop devices
✅ **Light & Dark Mode Support** - Automatic theme detection

## Project Structure

```
src/
├── App.tsx                 # Main app component with state management
├── App.css                 # App styling
├── main.tsx                # Entry point
├── style.css               # Global styles
└── components/
    ├── Loader.tsx          # Loading spinner component
    ├── Loader.css
    ├── ContactList.tsx     # List of contacts component
    ├── ContactList.css
    ├── ContactForm.tsx     # Form to add new contacts
    ├── ContactForm.css
    ├── ContactItem.tsx     # Individual contact card
    └── ContactItem.css
```

## Components

### App Component
- Manages the overall state (contacts, loading state)
- Simulates initial data loading with a 2-second delay
- Handles add/delete operations

### Loader Component
- Displays an animated spinner
- Shows while initial data is being loaded

### ContactList Component
- Renders list of all contacts
- Shows empty state when no contacts exist
- Maps through contacts and renders ContactItem for each

### ContactForm Component
- Input fields for name and phone
- Form validation
- Error messages
- Add button to submit new contacts

### ContactItem Component
- Displays individual contact information
- Delete button with confirmation
- Hover effects and animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5174/` (or the next available port if 5174 is in use).

### Building

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **CSS3** - Styling with modern features

## Key Concepts for Ionic Migration

This React app demonstrates concepts that will be useful when migrating to Ionic:

1. **Component Composition** - Breaking UI into small, reusable components
2. **State Management** - Using React hooks (useState, useEffect) for state
3. **Async Data Loading** - Simulating API calls with async/await
4. **Form Handling** - Managing form input and validation
5. **List Rendering** - Dynamic list rendering with keys
6. **Responsive Design** - Mobile-first CSS approach

These patterns translate well to Ionic components and structure.

## Usage

1. **Startup**: When the app loads, you'll see a loader for 2 seconds while initial data is fetched
2. **View Contacts**: After loading, the app displays a list of 4 sample contacts
3. **Add Contact**: Fill in the form at the top and click "Add Contact"
4. **Delete Contact**: Click the "Delete" button on any contact and confirm in the dialog

## Styling

The app supports both light and dark modes with automatic theme detection. Styles are modular with each component having its own CSS file.

## Features Breakdown

### Loader
- Animated spinner
- Loading message
- Automatic dismissal after data loads

### Contact Operations
- **Add**: Form validation ensures both name and phone are provided
- **Delete**: Confirmation dialog prevents accidental deletion
- **Display**: Real-time updates to the contact list

### UI/UX
- Smooth transitions and animations
- Hover effects on interactive elements
- Responsive layout for all screen sizes
- Clear visual hierarchy

## Future Enhancements

- Local storage persistence
- Edit contact functionality
- Search/filter contacts
- Contact categories
- Image support
- Export contacts
