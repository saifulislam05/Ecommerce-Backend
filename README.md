# Ecommerce API Documentation

## Base URL

http://localhost:10000/v1/api



## Authentication

Pass Bearer Token for Authentication

---

## User Endpoints

### Register User

- **Method:** POST
- **URL:** `/user/register`
- **Body:**
    ```json
    {
        "firstname": "abc",
        "lastname": "xyz",
        "email": "abc@gmail.com",
        "password": "abc123",
        "role": "seller"
    }
    ```

### Login

- **Method:** POST
- **URL:** `/user/login`
- **Body:**
    ```json
    {
        "email": "abc@gmail.com",
        "password": "abc123"
    }
    ```

### Logout

- **Method:** POST
- **URL:** `/user/logout`
- **Headers:**
    - Authorization: Bearer {{token}}

### Forgot Password

- **Method:** POST
- **URL:** `/user/forgotPassword`


### Reset Password

- **Method:** POST
- **URL:** `/user/reset-password/{password Reset token}`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Body:**
    ```json
    {
       "password": "newPassword"
    }
    ```

### Add/Remove Wishlist Product

- **Method:** POST
- **URL:** `/user/wishlist/{productId}`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Description:** Adds or removes a product from the user's wishlist.

### Add/Remove Wishlist Product

- **Method:** GET
- **URL:** `/user/wishlist`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Description:** Retrieves the wishlist of the currently authenticated user..

### Add Address

- **Method:** POST
- **URL:** `/user/address`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Body:**
    ```json
    {
       "address": "abc",
       "city": "abc",
       "state": "abc",
       "pin": "123456"
       // and more field
    }
    ```
### Delete User

- **Method:** DELETE
- **URL:** `/user/delete`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Description:** Deletes the currently authenticated user.

### Get All Users

- **Method:** GET
- **URL:** `/user`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Description:** Retrieves a list of all users. Restricted to admin roles..



## Product Endpoints

### Create Product

- **Method:** POST
- **URL:** `/product`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Body:**
    ```json
    {
        "title": "MacBook Pro",
        "description": "Apple product",
        "price": 1400000,
        "stock": 10,
        "brand": "Apple",
        "category": "laptop",
        "colorAvailable": ["pink", "black", "sky-blue"],
        "tags": ["laptop", "apple", "pc", "5g", "mac"]
    }
    ```

### Get Products

- **Method:** GET
- **URL:** `/product`

---

## Blog Endpoints

### Create Blog

(Template for additional endpoints)

- **Method:** POST
- **URL:** `/blog`
- **Headers:**
    - Authorization: Bearer {{token}}
- **Body:**
    ```json
    {
        "title": "Your Blog Title",
        "description": "Blog description",
        "category": "Your category",
        "tags": ["tag1", "tag2"]
    }
    ```


---

