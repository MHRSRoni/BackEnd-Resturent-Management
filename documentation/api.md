## API
### router
- customerRouter
- adminRouter
- staffRouter
- wishlistRouter
- cartlistRouter
- orderRouter
- reviewRouter
- complainRouter
- foodRouter
- verifyRouter
### customerRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----| -----|
| Post  | /register |        |       | yes | |
| Post  | /login    |        |       |     ||
| Get   | /profile | | | |customer|
| Post  | /profile |    |     |yes  |customer|
| Delete| /profile |  | | |customer|
| Get   | /all | | | |admin|
| Get   | /profile | customerId| | |admin|

### wishlistRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
| Get  | / |        |       |  | customer |
| Post  | / |  foodId      |  |  | customer |
| Put  | / |  foodId   |       |  | customer |
| Delete  | / | foodId   |       |  | customer |

### cartlistRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
| Get  | / |        |       |  | customer |
| Post  | / |  foodId,qty |  |  | customer |
| Put  | / |  foodId,qty   |       |  | customer |
| Delete  | / | foodId   |       |  | customer |

### orderListRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
| Get  | / |        |       |  | customer, admin |
| Get  | / |  orderId      |       |  | customer, admin |
| Post  | / |   |  |  yes| customer |
| Put  | / |  orderId,status   |       | yes | admin |

### staffRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
|Post | /register |      | | yes| |
|Get | /login |      | | yes| |
|Get | /profile |      | | | staff|
|Get | /profile | all     | | | admin|
|Get | /profile | staffId     | | | admin|
|Put | /profile | staffId |salary |yes | admin|


### reviewRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
|Post | / | | | yes | customer |
|Get | / | foodId | | | customer, admin|
|Get | /all | | | | admin |
|Delete | /| foodId | | | admin|

### complainRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
|Post | / | | |yes | customer |
|Get | / |   | | | customer|
|Get | / | customerId  | | |  admin|
|Get | /all | | | | admin| 


### adminRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
|Put | / | | | yes | admin|
|get | / | | |  | admin|


### verifyRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
|Post | /send-verification |      | | yes| |
|Post | /verify |      | | yes| |

### foodRouter
| method | endpoint | params | query | mail|access|
| :----- | :------- | :----- | ----- | ----|------|
| Get | / | foodId |  |  | customer,admin |
| Get | / | |pageNumber,search,category | | customer,admin|
| Post | /create | | | | admin |
| Put | /update | foodId |  |  | admin |
| Delete | /delete | foodId |  |  | admin |

