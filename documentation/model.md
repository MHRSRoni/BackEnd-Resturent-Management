## Model

- customerModel
- customerProfileModel
- adminModel
  - ⚠️single document
- staffModel
- reviewModel
- complainModel
- wishListModel
- cartListModel
- foodModel

### customerModel

- email |string|unique
- otp |Number
- password |String|hash|optional
- ban |boolean|false

### customerProfileModel

- customerId | objectId
- name | string
- email | ref-customerModel
- phoneNo | string | unique
- profilePic | string
- address | string

### adminModel

- name | string
- email | string | unique
- password | string
- phoneNo | string | unique
- profilePic | string
- role | string | admin

### staffModel

- name | string
- email | string | unique
- password | string
- profilePic | string
- phoneNo | string | unique
- salary | number | optional | ⚠️only admin can write
- address | string

### wishListModel

- customerId | objectId
- foodId | array of objectId

### cartListModel

- customerId | objectId
- cart | array of object
  - foodId | objectId
  - qty | number

### orderModel

- customerId | objectId
- cartId | objectId
- subTotal | number | ⚠️backend-calculation
- discount | number | percentage| 0
- totalPrice | number | ⚠️backend-calculation
- status | string
  - pending
  - processing
  - canceled
  - shipping
  - complete

### reviewModel

- customerId | objectId
- foodId | objectId
- comment | string
- rating | number | 1-5

### complainModel

- customerId | objectId
- type | string
  - staff-behaviour
  - food-quality
  - service
  - atmosphere
  - other
- tableNo | string | optional
- message | string

### foodModel

- title | string | unique
- slug | string | ⚠️ backend generate
- description | string
- price | number
- image | array of string | 3 item
- category | string
  - beverage
  - meat
  - vegetarian
  - daily-special
  - deals
- discount | object
  - status | boolean | false
  - percentage | number | 0
  - price | number | ⚠️ middleware generated
- calories | number
