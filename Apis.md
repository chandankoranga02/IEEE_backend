# IEEE Backend API Reference Documentation

Comprehensive API documentation for the **IEEE GBPIET Student Branch Backend**.

---

## 📊 Summary of APIs

### 1. Global Metrics
- **Total APIs Count**: `30`
- **Total Modules**: `7`
- **Protected APIs (Require JWT Auth)**: `17`
- **Public APIs**: `13`

### 2. Module-wise Breakdown

| Module Name | Base Route | Total Endpoints | Public | Protected (Admin) |
|---|---|:---:|:---:|:---:|
| **Health Check** | `/health` | 1 | 1 | 0 |
| **Authentication & OTP** | `/api/v1/auth` | 5 | 5 | 0 |
| **Certificates** | `/api/v1/certificate` | 5 | 1 | 4 |
| **Department Posts** | `/api/v1/department` | 5 | 2 | 3 |
| **Upcoming Events** | `/api/v1/upcomingevents` | 5 | 2 | 3 |
| **Support & Tickets** | `/api/v1/support` | 5 | 1 | 4 |
| **Dashboard Analytics** | `/api/v1/dashboard` | 4 | 0 | 4 |
| **Total** | | **30** | **13** | **17** |

---

## 📑 Complete Master API Table

| # | Module | Method | Endpoint | Auth Required | Content-Type | Summary Description |
|:---:|---|:---:|---|:---:|---|---|
| 1 | Health Check | `GET` | `/health` | No | None | Server health status check |
| 2 | Auth | `POST` | `/api/v1/auth/login` | No (Rate Limited) | `application/json` | Admin login & JWT token generation |
| 3 | Auth | `POST` | `/api/v1/auth/logout` | No | None | Clears authentication session cookie |
| 4 | Auth | `POST` | `/api/v1/auth/resetPassword/otp/generateOTP` | No | `application/json` | Generates 6-digit OTP & emails admin |
| 5 | Auth | `POST` | `/api/v1/auth/resetPassword/otp/verifyOtp` | No | `application/json` | Verifies OTP & returns reset token |
| 6 | Auth | `PATCH` | `/api/v1/auth/resetPassword` | No (Reset Token) | `application/json` | Updates admin password using reset token |
| 7 | Certificate | `POST` | `/api/v1/certificate/applynow` | No | `application/json` | Participant applies for event certificate |
| 8 | Certificate | `GET` | `/api/v1/certificate/all` | **Yes (Bearer)** | None | Admin retrieves all certificate applications |
| 9 | Certificate | `PATCH` | `/api/v1/certificate/approved/:id` | **Yes (Bearer)** | None | Approves certificate, renders PDF & emails |
| 10 | Certificate | `PATCH` | `/api/v1/certificate/rejected/:id` | **Yes (Bearer)** | None | Rejects a certificate application |
| 11 | Certificate | `POST` | `/api/v1/certificate/adminApply` | **Yes (Bearer)** | `application/json` | Admin directly issues, renders PDF & emails |
| 12 | Department | `POST` | `/api/v1/department/create` | **Yes (Bearer)** | `multipart/form-data` | Creates department activity post + image upload |
| 13 | Department | `GET` | `/api/v1/department/all` | No | None | Retrieves department posts (optional `?dep=`) |
| 14 | Department | `GET` | `/api/v1/department/post/:id` | No | None | Retrieves single department post by `postId` |
| 15 | Department | `PATCH` | `/api/v1/department/edit/:id` | **Yes (Bearer)** | `multipart/form-data` | Updates department post & replaces old image |
| 16 | Department | `DELETE` | `/api/v1/department/delete/:id` | **Yes (Bearer)** | None | Deletes department post & removes Cloudinary image |
| 17 | Upcoming Events | `POST` | `/api/v1/upcomingevents/create` | **Yes (Bearer)** | `multipart/form-data` | Creates upcoming event + banner upload |
| 18 | Upcoming Events | `GET` | `/api/v1/upcomingevents/all` | No | None | Retrieves all upcoming events |
| 19 | Upcoming Events | `GET` | `/api/v1/upcomingevents/post/:id` | No | None | Retrieves single event details by `postId` |
| 20 | Upcoming Events | `PATCH` | `/api/v1/upcomingevents/edit/:id` | **Yes (Bearer)** | `multipart/form-data` | Updates event details & replaces old banner |
| 21 | Upcoming Events | `DELETE` | `/api/v1/upcomingevents/delete/:id` | **Yes (Bearer)** | None | Deletes event & removes Cloudinary image |
| 22 | Support | `POST` | `/api/v1/support/sendmsg` | No | `application/json` | Public submits support inquiry / contact message |
| 23 | Support | `GET` | `/api/v1/support/allticket` | **Yes (Bearer)** | None | Admin retrieves all support tickets |
| 24 | Support | `GET` | `/api/v1/support/viewTicket/:id` | **Yes (Bearer)** | None | Admin views single support ticket details |
| 25 | Support | `PATCH` | `/api/v1/support/closeTicket/:id` | **Yes (Bearer)** | None | Admin marks ticket status as "solved" |
| 26 | Support | `PATCH` | `/api/v1/support/Reject/:id` | **Yes (Bearer)** | None | Admin marks ticket status as "rejected" |
| 27 | Dashboard | `GET` | `/api/v1/dashboard/departmentposts/getall` | **Yes (Bearer)** | None | Department post counts grouped by branch |
| 28 | Dashboard | `GET` | `/api/v1/dashboard/events/getall` | **Yes (Bearer)** | None | Top 3 upcoming events for dashboard widget |
| 29 | Dashboard | `GET` | `/api/v1/dashboard/contactus/getall` | **Yes (Bearer)** | None | Ticket counts grouped by solvedStatus |
| 30 | Dashboard | `GET` | `/api/v1/dashboard/certificates/getall` | **Yes (Bearer)** | None | Certificate counts grouped by status |

---

## 🔐 Authentication Details

For all endpoints marked **Auth Required: Yes**:
- Provide the token in the `Authorization` header:
  ```http
  Authorization: Bearer <your_jwt_token>
  ```
- Alternatively, you may provide:
  - Header: `x-access-token: <your_jwt_token>`
  - Cookie: `Token=<your_jwt_token>`

If unauthorized or token is expired:
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```
Or:
```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```

---

## 📖 Detailed Endpoint Specifications

---

### 1. Health Check Module

#### `GET /health`
Verifies server uptime and connectivity.

- **Authentication**: None
- **Headers**: None
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "healthy"
}
```

---

### 2. Authentication Module (`/api/v1/auth`)

#### `POST /api/v1/auth/login`
Authenticates administrator account (`ieee@gbpiet.ac.in`). Protected with rate limiting (max 10 attempts per 15 minutes).

- **Authentication**: None
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "ieee@gbpiet.ac.in",
  "password": "AdminPassword123"
}
```
- **Response (200 OK)**:
```json
{
  "msg": "Login Successfull",
  "success": true,
  "user": {
    "id": "6741ab82cd98ef1234567890",
    "email": "ieee@gbpiet.ac.in"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Response (401 Unauthorized)**:
```json
{
  "success": false,
  "message": "Incorrect password"
}
```
- **Response (429 Too Many Requests)**:
```json
{
  "success": false,
  "message": "Too many login attempts. Please try again later."
}
```

---

#### `POST /api/v1/auth/logout`
Clears administrative authentication cookie.

- **Authentication**: None
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

#### `POST /api/v1/auth/resetPassword/otp/generateOTP`
Sends a cryptographically generated 6-digit OTP to the administrator email address.

- **Authentication**: None
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "ieee@gbpiet.ac.in"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password reset OTP sent successfully"
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Unauthorized email address"
}
```

---

#### `POST /api/v1/auth/resetPassword/otp/verifyOtp`
Validates the 6-digit OTP and generates a temporary `resetToken` (valid for 10 minutes).

- **Authentication**: None
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "ieee@gbpiet.ac.in",
  "otp": "482910"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Invalid OTP. 2 attempt(s) remaining."
}
```

---

#### `PATCH /api/v1/auth/resetPassword`
Resets the administrator password using the verified `resetToken`.

- **Authentication**: None (`resetToken` provided in body or header)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "newPassword": "NewStrongPassword@2026",
  "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

---

### 3. Certificate Module (`/api/v1/certificate`)

#### `POST /api/v1/certificate/applynow`
Allows students / participants to apply for an event certificate. Creates a record with `status: "pending"`.

- **Authentication**: None
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Rohan Sharma",
  "email": "rohan.sharma@gmail.com",
  "branch": "CSE",
  "event": "National Hackathon 2026",
  "date": "2026-03-20",
  "position": "1st"
}
```
*(Note: `position` is optional. If provided, must be `"1st"`, `"2nd"`, or `"3rd"`)*.

- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Application submitted successfully. Awaiting admin approval.",
  "data": {
    "_id": "6732ef12bc093412a8765432",
    "name": "Rohan Sharma",
    "email": "rohan.sharma@gmail.com",
    "branch": "CSE",
    "eventName": "National Hackathon 2026",
    "date": "2026-03-20",
    "position": "1st",
    "certificateId": "IEEE-CERT-9A82D10E",
    "status": "pending",
    "createdAt": "2026-03-25T14:32:00.000Z",
    "updatedAt": "2026-03-25T14:32:00.000Z"
  }
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "All fields (name, email, event, branch, date) are required"
}
```

---

#### `GET /api/v1/certificate/all`
Fetches all certificate applications across all statuses (`pending`, `approved`, `rejected`).

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6732ef12bc093412a8765432",
      "name": "Rohan Sharma",
      "email": "rohan.sharma@gmail.com",
      "branch": "CSE",
      "eventName": "National Hackathon 2026",
      "date": "2026-03-20",
      "position": "1st",
      "certificateId": "IEEE-CERT-9A82D10E",
      "status": "pending",
      "createdAt": "2026-03-25T14:32:00.000Z"
    }
  ]
}
```

---

#### `PATCH /api/v1/certificate/approved/:id`
Approves a pending certificate application. Triggers **Puppeteer** to generate the PDF certificate and **Resend** to email the PDF attachment directly to the applicant.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (MongoDB `_id` of certificate)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Certificate approved and emailed to the applicant successfully",
  "data": {
    "_id": "6732ef12bc093412a8765432",
    "name": "Rohan Sharma",
    "email": "rohan.sharma@gmail.com",
    "certificateId": "IEEE-CERT-9A82D10E",
    "status": "approved",
    "updatedAt": "2026-03-25T14:35:12.000Z"
  },
  "email": {
    "messageId": "re_abc123xyz"
  }
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Certificate is already \"approved\" and cannot be approved"
}
```
- **Response (404 Not Found)**:
```json
{
  "success": false,
  "message": "Certificate not found"
}
```
- **Response (502 Bad Gateway)**:
```json
{
  "success": false,
  "message": "Certificate approved but email delivery failed"
}
```

---

#### `PATCH /api/v1/certificate/rejected/:id`
Rejects a pending certificate application.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (MongoDB `_id` of certificate)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Certificate rejected successfully",
  "data": {
    "_id": "6732ef12bc093412a8765432",
    "status": "rejected",
    "updatedAt": "2026-03-25T14:36:00.000Z"
  }
}
```

---

#### `POST /api/v1/certificate/adminApply`
Directly generates, approves, and emails a certificate to a recipient without waiting for an approval step.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Priya Rawat",
  "email": "priya.rawat@gmail.com",
  "branch": "AIML",
  "event": "Generative AI Summit",
  "date": "2026-03-22",
  "position": "2nd"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Certificate issued and emailed successfully",
  "data": {
    "_id": "6732f012bc093412a8765999",
    "name": "Priya Rawat",
    "email": "priya.rawat@gmail.com",
    "certificateId": "IEEE-CERT-8B12C33F",
    "status": "approved"
  },
  "email": {
    "messageId": "re_xyz789def"
  }
}
```

---

### 4. Department Module (`/api/v1/department`)

#### `POST /api/v1/department/create`
Creates a departmental activity report/post with optional Cloudinary image upload.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Query Parameters**: `?dep=CSE` *(optional, can also be provided in `branch` form field)*
- **FormData Fields**:
  - `title` *(string, required)*: Headline of the post
  - `category` *(string, required)*: E.g., `"Workshop"`, `"Guest Lecture"`, `"Coding Contest"`
  - `branch` *(string, required if `?dep=` not set)*: `"CSE"`, `"AIML"`, `"EE"`, `"ECE"`, or `"BT"`
  - `date` *(string, required)*: `"2026-03-25"`
  - `time` *(string, optional)*: `"10:00 AM - 01:00 PM"`
  - `venue` *(string, required)*: `"Computer Lab 3, GBPIET"`
  - `organizedBy` *(string, required)*: `"IEEE Computer Society Chapter"`
  - `reportAuthor` *(string, optional)*: `"Dr. V. K. Sharma"`
  - `overview` *(string, required)*: Executive summary paragraph
  - `description` *(string, required)*: Detailed narrative report
  - `keyDiscussion` *(string or JSON array)*: `["Python Basics", "Neural Networks", "Hands-on PyTorch"]`
  - `studentsPresent` *(string or JSON array)*: `["Rahul Verma", "Sneha Bist", "Ankit Negi"]`
  - `image` *(file, optional)*: Image file (`jpg`, `jpeg`, `png`, `webp`, max 5MB)
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "_id": "67330012bc093412a8766111",
    "id": "CSE-20260325-1042",
    "postId": "CSE-20260325-1042",
    "title": "Hands-on Deep Learning Workshop",
    "category": "Workshop",
    "branch": "CSE",
    "date": "2026-03-25",
    "time": "10:00 AM - 01:00 PM",
    "venue": "Computer Lab 3, GBPIET",
    "organizedBy": "IEEE Computer Society Chapter",
    "reportAuthor": "Dr. V. K. Sharma",
    "overview": "A comprehensive deep learning workshop covering fundamentals to CNNs.",
    "description": "The workshop was attended by 65 participants from across Uttarakhand...",
    "keyDiscussion": ["Python Basics", "Neural Networks", "Hands-on PyTorch"],
    "studentsPresent": ["Rahul Verma", "Sneha Bist", "Ankit Negi"],
    "image": {
      "url": "https://res.cloudinary.com/ieee-gbpiet/image/upload/v1727280000/ieee-department-posts/abc123xyz.png",
      "publicId": "ieee-department-posts/abc123xyz"
    },
    "createdAt": "2026-03-25T15:00:00.000Z",
    "updatedAt": "2026-03-25T15:00:00.000Z"
  }
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "File size exceeds the 5MB limit."
}
```

---

#### `GET /api/v1/department/all`
Fetches published department posts. Supports optional filtering by academic branch.

- **Authentication**: None
- **Query Parameters**:
  - `?dep=CSE` *(optional, filter by `"CSE"`, `"AIML"`, `"EE"`, `"ECE"`, or `"BT"`)*
- **Response (200 OK)**:
```json
{
  "success": true,
  "count": 1,
  "posts": [
    {
      "_id": "67330012bc093412a8766111",
      "postId": "CSE-20260325-1042",
      "title": "Hands-on Deep Learning Workshop",
      "category": "Workshop",
      "branch": "CSE",
      "date": "2026-03-25",
      "image": {
        "url": "https://res.cloudinary.com/.../abc123xyz.png",
        "publicId": "ieee-department-posts/abc123xyz"
      },
      "createdAt": "2026-03-25T15:00:00.000Z"
    }
  ]
}
```

---

#### `GET /api/v1/department/post/:id`
Retrieves single department post by unique `postId`.

- **Authentication**: None
- **URL Parameters**: `:id` (e.g. `CSE-20260325-1042`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "post": {
    "_id": "67330012bc093412a8766111",
    "postId": "CSE-20260325-1042",
    "title": "Hands-on Deep Learning Workshop",
    "branch": "CSE",
    "overview": "...",
    "description": "...",
    "image": {
      "url": "https://res.cloudinary.com/...",
      "publicId": "..."
    }
  }
}
```
- **Response (500 Internal Server Error)**:
```json
{
  "success": false,
  "message": "Failed to fetch post"
}
```

---

#### `PATCH /api/v1/department/edit/:id`
Updates existing department post. If a new image is uploaded, the existing Cloudinary asset is automatically destroyed.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data` or `application/json`
- **URL Parameters**: `:id` (`postId`)
- **FormData / JSON Body**: Any subset of fields to update, plus optional `image` file
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Post updated successfully",
  "post": {
    "postId": "CSE-20260325-1042",
    "title": "Hands-on Deep Learning Workshop (Updated)",
    "updatedAt": "2026-03-25T15:30:00.000Z"
  }
}
```

---

#### `DELETE /api/v1/department/delete/:id`
Deletes a department post by `postId`. Deletes the associated Cloudinary asset and MongoDB document.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (`postId`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

### 5. Upcoming Events Module (`/api/v1/upcomingevents`)

#### `POST /api/v1/upcomingevents/create`
Publishes a new upcoming event with optional banner image.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **FormData Fields**:
  - `eventName` *(string, required)*: `"Robotics & Embedded Systems Bootcamp"`
  - `title` *(string, required)*: `"Learn Arduino, ESP32, and ROS2"`
  - `date` *(date string, required)*: `"2026-04-15"`
  - `lastDate` *(date string, required)*: `"2026-04-10"`
  - `overview` *(string, required)*: `"3-day intensive hardware bootcamp..."`
  - `image` *(file, optional)*: Banner image (max 5MB)
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Event created successfully",
  "post": {
    "_id": "67331112bc093412a8767222",
    "postId": "EVT-93821",
    "eventName": "Robotics & Embedded Systems Bootcamp",
    "title": "Learn Arduino, ESP32, and ROS2",
    "date": "2026-04-15T00:00:00.000Z",
    "lastDate": "2026-04-10T00:00:00.000Z",
    "overview": "3-day intensive hardware bootcamp...",
    "image": {
      "url": "https://res.cloudinary.com/ieee-gbpiet/image/upload/v1727280000/ieee-upcoming-events/banner1.png",
      "publicId": "ieee-upcoming-events/banner1"
    },
    "createdAt": "2026-03-25T16:00:00.000Z"
  }
}
```

---

#### `GET /api/v1/upcomingevents/all`
Fetches all published upcoming events sorted by latest.

- **Authentication**: None
- **Response (200 OK)**:
```json
{
  "success": true,
  "count": 1,
  "posts": [
    {
      "postId": "EVT-93821",
      "eventName": "Robotics & Embedded Systems Bootcamp",
      "date": "2026-04-15T00:00:00.000Z",
      "lastDate": "2026-04-10T00:00:00.000Z",
      "image": {
        "url": "https://res.cloudinary.com/..."
      }
    }
  ]
}
```

---

#### `GET /api/v1/upcomingevents/post/:id`
Retrieves single upcoming event by `postId`.

- **Authentication**: None
- **URL Parameters**: `:id` (e.g. `EVT-93821`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "post": {
    "postId": "EVT-93821",
    "eventName": "Robotics & Embedded Systems Bootcamp",
    "overview": "..."
  }
}
```

---

#### `PATCH /api/v1/upcomingevents/edit/:id`
Updates an upcoming event by `postId`. Automatically cleans up the previous Cloudinary banner if a new banner is uploaded.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data` or `application/json`
- **URL Parameters**: `:id` (`postId`)
- **FormData / JSON Body**: subset of fields (`eventName`, `title`, `date`, `lastDate`, `overview`, `image`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Event updated successfully",
  "post": {
    "postId": "EVT-93821",
    "eventName": "Robotics & Embedded Systems Bootcamp (Extended)"
  }
}
```

---

#### `DELETE /api/v1/upcomingevents/delete/:id`
Deletes an event by `postId`. Deletes the associated Cloudinary banner asset and MongoDB record.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (`postId`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

### 6. Support Module (`/api/v1/support`)

#### `POST /api/v1/support/sendmsg`
Submits a public inquiry or support request. Generates an alphanumeric ticket identifier (e.g. `TKT12A9B8C7`).

- **Authentication**: None
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Aman Joshi",
  "email": "aman.joshi@example.com",
  "subject": "Inquiry regarding IEEE Membership Benefits",
  "message": "Could you provide details on student membership fee subsidies?"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "ticket": {
    "_id": "67332212bc093412a8768333",
    "ticketId": "TKT12A9B8C7",
    "name": "Aman Joshi",
    "email": "aman.joshi@example.com",
    "subject": "Inquiry regarding IEEE Membership Benefits",
    "description": "Could you provide details on student membership fee subsidies?",
    "solvedStatus": "pending",
    "createdAt": "2026-03-25T16:30:00.000Z",
    "updatedAt": "2026-03-25T16:30:00.000Z"
  }
}
```

---

#### `GET /api/v1/support/allticket`
Retrieves all support tickets sorted in reverse chronological order.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "count": 1,
  "tickets": [
    {
      "_id": "67332212bc093412a8768333",
      "ticketId": "TKT12A9B8C7",
      "name": "Aman Joshi",
      "email": "aman.joshi@example.com",
      "subject": "Inquiry regarding IEEE Membership Benefits",
      "solvedStatus": "pending",
      "createdAt": "2026-03-25T16:30:00.000Z"
    }
  ]
}
```

---

#### `GET /api/v1/support/viewTicket/:id`
Retrieves full details of a specific ticket by MongoDB `_id`.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (MongoDB ObjectID)
- **Response (200 OK)**:
```json
{
  "success": true,
  "ticket": {
    "_id": "67332212bc093412a8768333",
    "ticketId": "TKT12A9B8C7",
    "name": "Aman Joshi",
    "email": "aman.joshi@example.com",
    "subject": "Inquiry regarding IEEE Membership Benefits",
    "description": "Could you provide details on student membership fee subsidies?",
    "solvedStatus": "pending",
    "createdAt": "2026-03-25T16:30:00.000Z"
  }
}
```

---

#### `PATCH /api/v1/support/closeTicket/:id`
Marks a support ticket as resolved (`solvedStatus: "solved"`).

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (MongoDB ObjectID)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Ticket closed successfully",
  "ticket": {
    "_id": "67332212bc093412a8768333",
    "ticketId": "TKT12A9B8C7",
    "solvedStatus": "solved",
    "updatedAt": "2026-03-25T16:45:00.000Z"
  }
}
```

---

#### `PATCH /api/v1/support/Reject/:id`
Marks a support ticket as rejected (`solvedStatus: "rejected"`).

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**: `:id` (MongoDB ObjectID)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Ticket rejected successfully",
  "ticket": {
    "_id": "67332212bc093412a8768333",
    "ticketId": "TKT12A9B8C7",
    "solvedStatus": "rejected",
    "updatedAt": "2026-03-25T16:45:00.000Z"
  }
}
```

---

### 7. Dashboard Module (`/api/v1/dashboard`)

*All dashboard routes are administrative and protected by `verifyToken`.*

#### `GET /api/v1/dashboard/departmentposts/getall`
Aggregates post counts across the 5 engineering branches (`CSE`, `AIML`, `EE`, `ECE`, `BT`).

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "CSE": 14,
    "AIML": 9,
    "EE": 4,
    "ECE": 6,
    "BT": 2
  }
}
```

---

#### `GET /api/v1/dashboard/events/getall`
Retrieves top 3 recent upcoming events for dashboard quick view.

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "eventName": "Robotics & Embedded Systems Bootcamp",
      "lastDate": "2026-04-10T00:00:00.000Z"
    },
    {
      "eventName": "IEEE Day Hackathon 2026",
      "lastDate": "2026-04-20T00:00:00.000Z"
    }
  ]
}
```

---

#### `GET /api/v1/dashboard/contactus/getall`
Aggregates support inquiry statistics grouped by status (`pending`, `rejected`, `solved`).

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "pending": 5,
    "rejected": 2,
    "solved": 28
  }
}
```

---

#### `GET /api/v1/dashboard/certificates/getall`
Aggregates certificate metrics grouped by application status (`pending`, `approved`, `rejected`).

- **Authentication**: **Required (`verifyToken`)**
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "pending": 12,
    "approved": 154,
    "rejected": 4
  }
}
```
