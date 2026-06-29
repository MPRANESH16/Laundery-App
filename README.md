# Smart Laundry Management System using Salesforce CRM, LWC, Apex and Razorpay Integration


## 📌 Project Overview

Smart Laundry Management System is a Salesforce-based application designed to digitize and automate the complete laundry service workflow.

The system connects customers, laundry service teams, delivery teams, and administrators through a centralized CRM platform.

It manages customer registration, laundry orders, pickup and delivery tracking, payment processing, and customer support using Salesforce automation and custom development.


---

# 🎯 Problem Statement

Traditional laundry services usually depend on manual processes for order management, customer communication, payment tracking, and delivery coordination.

This creates problems such as:

- Lack of centralized customer information
- Manual order tracking
- Payment management difficulties
- Poor communication between customer and laundry team
- Difficulty handling complaints and support requests


---

# 💡 Solution

This project provides a complete digital laundry management platform using Salesforce CRM.

The application provides:

- Customer management
- Order lifecycle management
- Pickup and delivery tracking
- Online payment integration
- Customer complaint management
- Role-based access control


---

# 🚀 Features


## Customer Management

- Store customer details
- Maintain customer order history
- Track total orders and pending orders


## Order Management

Customers can create laundry orders with:

- Pickup date
- Delivery date
- Laundry type
- Number of buckets
- Payment details
- Order status tracking


## Payment Integration

Integrated Razorpay payment gateway using:

- Lightning Web Components
- Apex Controller
- Visualforce Bridge
- JavaScript SDK


Payment workflow:

Customer → Order → Pay Now → Razorpay Checkout → Payment Confirmation → Salesforce Update


## Help & Support System

Customers can raise complaints related to orders.

Support team can:

- View issues
- Update status
- Track customer problems


## Role Based Access

Implemented different access levels:

### Admin

Full system access


### Laundry Service Team

Access to:

- Orders
- Laundry operations
- Customer support


### Customer

Access to:

- Own profile
- Orders
- Support requests



---

# 🏗 Salesforce Architecture


             Customer

                |
                |

    Lightning Web Components

                |

          Salesforce CRM

    ----------------------------

    |            |             |

Custom Objects Apex Automation

    |

Razorpay Payment Gateway

    |

Payment Confirmation Update



---

# 🛠 Technologies Used


## Salesforce Platform

- Salesforce CRM
- Lightning App Builder
- Lightning Experience


## Development

- Lightning Web Components (LWC)
- Apex Programming
- Visualforce Page
- SOQL
- Salesforce Metadata


## Integration

- Razorpay Payment Gateway
- JavaScript SDK
- PostMessage Communication


## Security

- Profiles
- Permission Sets
- Object Level Security
- Field Level Security


## Tools

- Salesforce CLI
- VS Code
- Git
- GitHub


---

# 📂 Project Structure



force-app

└── main

  └── default


      ├── classes

      │     └── RazorpayPaymentController


      ├── lwc

      │     ├── customerContact

      │     ├── order

      │     ├── delivery

      │     ├── deliveryContact

      │     └── launderyContact


      └── objects


---

# 🔄 Application Workflow


1. Customer information is stored in Salesforce

2. Customer creates laundry order

3. Order details are saved in Salesforce Object

4. Customer completes payment using Razorpay

5. Payment status updates automatically

6. Laundry team processes order

7. Customer can raise support requests


---

# 🔮 Future Enhancements


Future improvements:

- Salesforce Experience Cloud customer portal
- AI chatbot using Einstein AI
- Automatic delivery notifications
- Mobile application
- Real-time order tracking
- AI-based laundry recommendations


---

# 👨‍💻 Developed By

Pranesh M

Salesforce Developer Project
