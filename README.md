# Invoice App

A responsive web application for creating, editing, and managing invoices. Built with React, TypeScript, Tailwind CSS, and React Hook Form.

## Features

- Create new invoices with client and item details
- Edit existing invoices
- Save invoices as draft or mark as pending/paid
- Calculate totals automatically based on item quantity and price
- Select invoice date using a custom calendar component
- Choose payment terms (e.g., Net 30, Net 60)
- Responsive layout for mobile and desktop
- Form validation using React Hook Form and Yup

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- React Hook Form
- Yup (form validation)
- Vite (project bundler)

## Project Structure

src/
├─ components/ # Reusable UI components (Input, Calendar, PaymentTerms, etc.)
├─ context/ # Context API for managing invoice data and form state
├─ pages/ # Page components (NewInvoice, EditInvoice, InvoiceList, etc.)
├─ hookFormFunctions/ # Custom hooks and helpers for form handling
├─ seperateFuncs/ # Utility functions like generateInvoiceId, calculatePaymentDue
└─ App.tsx # Main app entry point

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Bletfen/Invoice-App.git
cd Invoice-App
```

2.Install dependencies:

```bash
npm install
```

3.Run the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173 by default.

## Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Usage

Navigate to the main page to see the list of invoices

Click "New Invoice" to create a new invoice

Fill in client details, items, and payment terms

Save as draft or send

Click on an existing invoice to edit its details

## Notes

The app uses local state for storing invoices. No backend is connected.

Date selection is handled using a custom calendar component.

Form validation ensures all required fields are completed before saving.

## Live View

You can view the live app deployed on Vercel here:
https://invoice-app-gliy.vercel.app/

## License

This project is licensed under the MIT License.
