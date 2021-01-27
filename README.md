# [Invoice Lite]((https://invoice-lite.project-jtp.dev))
![invoice-lite](client/src/Icon/dark.svg)

Send professional invoices quickly & easily whilst having all your information saved in the one place. After creating your first invoice, [Invoice Lite](https://invoice-lite.project-jtp.dev) will pre-populate your company/business information in all newly created invoices. 
Easily track the status of your invoices & update your customer information with simple workflows and beautiful UI. 

## Motivation 
This project started with my need to send an invoice to a customer/client. The free invoicing apps available had outdated designs and were hard to look at, so, I thought I would try to make an invoice generating application myself. As a bonus, creating this app allows me to grow my skills in web-development, enhance my project management capabilities & further my understanding of cloud infrastructure.

Key focus areas in web-development are Typescript, React (Hooks, Context & reducers), Jest unit testing & Design with MaterialUI library, HTML and SCSS.

## Status 
In progress

## Features 
- Generate invoice ✔️
- User account creation ✔️
- Pre-populate user information ✔️
- Display & edit all invoices
- Select & edit customer information 
- Select & edit item information 
- Email invoice 
- Recurring invoice
- Select different invoice templates 
- Customise invoice colors

## Tech/framework used 
- Frontend: Typescript, React, HTML, SCSS

- Design Libraries: MaterialUI

- Database: Cloud Firestore 

- Unit Testing: Jest

- PDF Generation: React-PDF 

## Code Style
Moving forward will be using the following style
1. Grouping files by module/feature. 

        src

          └─ SignIn

            ├─ page.tsx

            ├─ button.tsx

            └─ sign-in.scss
 
2. UI folder for generic UI Components

        src
          
          └─ UI
                
            └─ material-button.scss
     
3. Common folder for commonly users functions or interfaces 

        src

          └─ Common

            ├─ button.interface.tsx
            
            └─ input-change.jsx
    
4. Naming components based off parents directory 
   
        Component inside src/Invoice/Customer/section.tsx is named InvoiceCustomerSection
  
5. File names

        All lower case with words separated by hyphen and type of file separated by '.'

See [structuring projects and naming components in React](https://medium.com/hackernoon/structuring-projects-and-naming-components-in-react-1261b6e18d76) for code style reference.
