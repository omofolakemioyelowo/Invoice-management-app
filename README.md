# Invoice App

A fully functional invoice management application built with React.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone or navigate to the project
cd Inovice App

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

---

## 🏗️ Architecture Explanation

### Component Hierarchy

```
App (Main Controller)
├── SideBar (Navigation/Theme Toggle)
├── main (Content Area)
│   ├── InvoiceList Page
│   │   ├── FilterBar
│   │   │   └── Status Filter (Dropdown)
│   │   ├── InvoiceCard (Multiple)
│   │   │   └── StatusBadge
│   │   └── NoInvoices (Empty State)
│   └── InvoiceDetail Page
│       ├── StatusBadge
│       ├── ItemList Table
│       └── DeleteModal
└── FormDrawer (Modal/Overlay)
    ├── InputField (Multiple)
    ├── DatePicker
    ├── CustomSelect
    └── ItemList
```

### State Management

The app uses React's built-in `useState` hook for state management:

- **In-memory state**: Invoice data stored in `App.jsx` state
- **Local component state**: UI states like dropdowns, modals
- **LocalStorage**: Theme preference persistence

### Data Flow

```
User Action (click button)
    ↓
Handler Function in App.jsx
    ↓
Update State (setInvoices)
    ↓
Props passed to child components
    ↓
Components re-render with new data
```

### File Structure

```
src/
├── App.jsx                    # Main app controller & state
├── main.jsx                   # React entry point
├── index.css                  # Global styles & CSS variables
├── data/
│   └── data.json             # Sample invoice data
├── components/
│   ├── layout/
│   │   └── SideBar.jsx/css   # Sidebar (desktop) / Header (mobile)
│   ├── invoice-form/
│   │   ├── FormDrawer.jsx/css # Create/Edit form modal
│   │   ├── ItemList.jsx/css   # Invoice line items
│   │   └── DatePicker.jsx/css # Calendar date picker
│   └── shared/
│       ├── InputField.jsx/css # Reusable text input
│       ├── StatusBadge.jsx/css # Status indicator
│       ├── DeleteModal.jsx/css # Confirmation modal
│       └── CustomSelect.jsx/css # Custom dropdown
└── pages/
    ├── InvoiceList.jsx/css   # Invoice list page
    └── InvoiceDetail.jsx/css # Invoice detail page
```

---

## ⚖️ Trade-offs

### What Was Prioritized

1. **Code Simplicity over Type Safety**
   - Used plain JavaScript instead of TypeScript
   - Easier to understand for learning purposes
   - Trade-off: Less compile-time error checking

2. **Component Reusability**
   - Created shared components (`InputField`, `StatusBadge`, etc.)
   - Trade-off: Some over-engineering for simple elements

3. **Local State over External State Management**
   - No Redux, MobX, or Context API
   - Trade-off: Props drilling in some places

4. **CSS over Styled Components**
   - Vanilla CSS with CSS variables for theming
   - Trade-off: No scoped styles, potential naming conflicts

### Known Limitations

1. **Data Not Persisted**
   - All invoice changes are lost on page refresh
   - Could implement LocalStorage or IndexedDB for persistence

2. **No Backend Integration**
   - Works only with mock data
   - Would need API endpoints for real-world use

3. **No Unit Tests**
   - Basic functionality tested manually
   - Would benefit from Jest/React Testing Library

4. **Single User**
   - No authentication or multi-user support
   - All data is shared in browser session

---

## ♿ Accessibility Notes

### Current Implementation

| Feature | Status | Notes |
|---------|--------|-------|
| Semantic HTML | ✅ | Uses proper `<button>`, `<label>`, `<header>` |
| Keyboard navigation | ⚠️ | Basic support, needs improvement |
| Form labels | ✅ | All inputs have associated labels |
| Focus management | ⚠️ | Modal focus trap not implemented |
| Color contrast | ⚠️ | Some elements need review in dark mode |
| Screen reader | ⚠️ | Not tested with assistive technology |

### Accessibility Improvements Needed

1. **Focus trap in DeleteModal**
2. **ESC key to close modals**
3. **ARIA labels on icon-only buttons**
4. **Skip navigation link**
5. **Proper heading hierarchy**
6. **Error announcements for screen readers**

---

## 🚀 Improvements Beyond Requirements

### High Priority

1. **Data Persistence**
   ```javascript
   // Save to LocalStorage on every change
   useEffect(() => {
     localStorage.setItem('invoices', JSON.stringify(invoices));
   }, [invoices]);
   ```

2. **Responsive Design Fixes**
   - Invoice card mobile layout as per design spec
   - Form field stacking on small screens
   - Touch-friendly tap targets (min 44x44px)

3. **Form Validation Enhancement**
   - Email format validation
   - Real-time validation feedback
   - Field-level error announcements

### Medium Priority

4. **Accessibility Audit**
   - Implement focus trap
   - Add skip links
   - Test with screen readers
   - Keyboard shortcuts

5. **TypeScript Migration**
   - Add type definitions for Invoice interface
   - Type-safe component props
   - Catch errors at compile time

6. **Error Boundaries**
   - Graceful error handling
   - Fallback UI for crashes

### Low Priority (Future Features)

7. **Backend API Integration**
   - RESTful API endpoints
   - Database persistence
   - User authentication

8. **Invoice PDF Generation**
   - Export to PDF format
   - Email invoices directly

9. **Drag and Drop Reordering**
   - Reorder line items
   - Better UX for item management

10. **Charts and Analytics**
    - Invoice statistics
    - Revenue tracking
    - Client insights

---

## 📁 Project Dependencies

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.14.2"
}
```

### Dev Dependencies

```json
{
  "vite": "^8.0.9",
  "@vitejs/plugin-react": "^6.0.1",
  "eslint": "^9.39.4"
}
```

---

## 📝 License

This project is for educational purposes.