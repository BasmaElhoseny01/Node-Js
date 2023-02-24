# Express
### It is a node.js Frame work ie higher level of abstraction of Node

### Express is written 100% using Node.js

## API
Application Programming Interface: It is a piece of SW that can be used by another SW to be able to take to each other 📞

Ex: Web APIs - Public Methods of a class are considered APIs 😮😮

## REST Architecture
Arch to Build Web APIs

REST ==> Representational States Transfer
### Principles:
1. Logical Resources ex users-tours
2. Expose Structured resource-based URLs
3. Use HTTP Methods for the Basic CRUD (Create - Read - Update - Delete) Operations 💻💻
   - get
    ```
    /tours/7
    ```
 
   - POST :Create New Resource (tour)
    ```
    /tours
    ```

    
   - DELETE :Delete a Resource (tour of id=7)
    ```
    /tours/7
    ```

    
   - PUT :Update New Resource (tour of id=7)
   * The Client sends the Updated object
    ```
    /tours/7
    ```

    
   - PATCH :Update New Resource (tour of id=7)
   * The Client sends the only part of the object that have been changed
    ```
    /tours/7
    ```

#### Ex or more Advanced End Points
```
/getToursByUser
```
Following Principle 3
```
GET users/3/tours
```

#### Login & Search
are example of endpoints that aren't related to a particular resource so the aren't CRUD operations ==> Will be discussed Later ⌛⌛.

4. Send Data as JSON

Following Jsend Standard for response Sending
```
{
    "status":"success",
    "data":{
        "id":5
    }
}
```
5. Stateless
All state is handled on the client.
The Server shouldn't have to remember previous Requests 🙅‍♂️
