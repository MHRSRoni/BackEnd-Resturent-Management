## API

### router

- customer
- admin
- staff
- wishlist
- cartlist
- order
- review
- complain
- food

### customer

| method | endpoint           | params | query | mail | access   |
| :----- | :----------------- | :----- | ----- | ---- | -------- |
| Post   | /register          |        |       | yes  |          |
| Post   | /login             |        |       |      |          |
| Post   | /send-verification |        |       | yes  |          |
| Post   | /verify            |        |       | yes  |          |
| Get    | /profile           |        |       |      | customer |
| Post   | /profile           |        |       | yes  | customer |
| Delete | /profile           |        |       |      | customer |

### wishlist

| method | endpoint | params | query | mail | access   |
| :----- | :------- | :----- | ----- | ---- | -------- |
| Get    | /        |        |       |      | customer |
| Post   | /        | foodId |       |      | customer |
| Put    | /        | foodId |       |      | customer |
| Delete | /        | foodId |       |      | customer |

### cartlist

| method | endpoint | params     | query | mail | access   |
| :----- | :------- | :--------- | ----- | ---- | -------- |
| Get    | /        |            |       |      | customer |
| Post   | /        | foodId,qty |       |      | customer |
| Put    | /        | foodId,qty |       |      | customer |
| Delete | /        | foodId     |       |      | customer |

### orderList

| method | endpoint | params         | query | mail | access          |
| :----- | :------- | :------------- | ----- | ---- | --------------- |
| Get    | /        |                |       |      | customer, admin |
| Get    | /        | orderId        |       |      | customer, admin |
| Post   | /        |                |       | yes  | customer        |
| Put    | /        | orderId,status |       | yes  | admin           |
