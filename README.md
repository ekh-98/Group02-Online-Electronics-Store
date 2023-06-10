# Group02-Online Electronics Store

## Introduction
We choosed to build a Online Electronics Store for our Distributed Systems project. Our project was build on the Microservices Architecture, with Node.js as the primary technology. The architecture aims to provide a scalable and modular system by breaking down the application into smaller, independent services. The main microservices implemented are customer, product, and order, with an added user authentication system to ensure secure access to the platform. The implementd end points are add products, delete products, view all products, view specific product using identifier, add customer, delete customer, view all customers, view specific customer using identifier, add order, delete order, view all orders, view specific order using identifier. The load balancer which we udes is Nginx. The system was deployed in docker.

## Architecture
The architecture follows a microservices approach, where the application is divided into smaller, self-contained services that can be developed, deployed, and scaled independently [1]. This promotes flexibility, scalability, and easier maintenance of the system. Each microservice handles a specific domain (customer, product, order) and has its own data storage, business logic, and API endpoints.

Below is the architectural design of the Online Electronics Store

![Architectural Design](https://i.ibb.co/tqj2DD5/diagram-final.png)


## Micro-services
Order Microservice:

It is implemented using Express.js and Mongoose for MongoDB integration.
Endpoints are defined for creating a new order, retrieving orders, retrieving an order by ID, and deleting an order.
It communicates with the Customer Microservice and Product Microservice to fetch additional information related to the order (customer name and product title) by making HTTP requests to their respective endpoints.

Customer Microservice:

It is implemented using Express.js and Mongoose for MongoDB integration.
Endpoints are defined for creating a new customer, authenticating a customer, retrieving customers, retrieving a customer by ID, and deleting a customer.
It uses bcrypt for password hashing and validation during the authentication process.

Product Microservice:

It is implemented using Express.js and Mongoose for MongoDB integration.
Endpoints are defined for creating a new product, retrieving products, retrieving a product by ID, and deleting a product.

API Gateway:

It is implemented using Express.js and acts as a central entry point for client requests.
Endpoints are defined for each microservice operation.
When a client makes a request to the API gateway, it extracts the necessary data and forwards the request to the appropriate microservice by making HTTP requests to their endpoints.
It receives responses from the microservices and relays them back to the client.
The API Gateway provides a unified interface to the client, abstracting the complexities of the underlying microservices architecture.
Overall, the implementation methods utilize popular Node.js frameworks (Express.js), database integration (Mongoose), and HTTP client (Axios) to handle various operations in each microservice and provide a centralized API gateway for communication between the client and microservices.

## Core services

### Customer Microservice
This service is responsible for managing customer-related functionalities, such as user registration, profile management, and address information.

The end points exposed by customer microservice:

POST /add_customer: Creates a new customer by providing the customer data in the request body.

POST /authenticate_customer: Authenticates a customer by verifying the provided credentials.

GET /view_customers: Retrieves all customers.

GET /view_customer/{id}: Retrieves a specific customer by their ID.

DELETE /delete_customer/{id}: Deletes a specific customer by their ID.

Inter service interaction:

Interaction with product Microservice: The customer micro service can interact with the product micro service. Through product micro service it will show all the products available in the shop to the customer.By sending HTTP requests the customer can view the products. 

Interaction with order Microservice: The customer can place orders by sending HTTP requests to the order micro service and place orders, view orders and delete orders.

### Product Microservice
The product microservice handles all operations related to managing the product catalog. It includes functionalities like product listing, searching, details, and inventory management.

The end points  exposed by customer microservice:

POST /add_product: Creates a new product by providing the product data in the request body.

GET /view_products: Retrieves all products.

GET /view_product/{id}: Retrieves a specific product by its ID.

DELETE /delete_product/{id}: Deletes a specific product by its ID.

Inter service interaction:

Interaction with customer Microservice: To display all the products, the product micro service has to interact with customer micro service by sending HTTP requests. 

Interaction with order Microservice: To display orders the product micro service and the order micro service have to send HTTP requests between each other.


### Order Microservice
The order microservice handles the order processing flow, including creating, updating, and deleting orders. It manages the interaction between customers, products, and inventory to ensure a smooth order fulfillment process.

The end points exposed by customer microservice:

POST /add_order: Creates a new order by providing the order data in the request body.

GET /view_orders: Retrieves all orders.

GET /view_order/{id}: Retrieves a specific order by its ID.

DELETE /delete_order/{id}: Deletes a specific order by its ID.

Inter service interaction:

Interaction with Product Microservice: When creating an order, the Order Microservice may need to retrieve product information from the Product Microservice. It can send an HTTP request to the Product Microservice's API to fetch product details based on the product ID.

Interaction with Customer Microservice: When creating an order, the Order Microservice may need to validate customer information. It can send an HTTP request to the Customer Microservice's API to authenticate the customer or retrieve customer details based on the customer ID.

## Discovery Server
We used the inbuilt discovery server of Node.js for out project. 

## API Gateway
We developed API Gateway using Express for our project.The API gateway is implemented as a central entry point for the client applications to interact with the microservices. It acts as a reverse proxy and handles common cross-cutting concerns such as authentication, rate limiting, request aggregation, and caching. The API gateway simplifies the client-side communication and provides a unified interface for accessing the underlying microservices.

## User Interface
We used Postman to access the services provided by our Online Electronic Store's API. Postman was also used Postman during the testing phase to test the functionality of the services provided by each micro service.

## Deployment
The system was deployed in docker

## Source code
Link: https://github.com/ekh-98/Group02-Online-Electronics-Store.git

Breaking down a monolithic application into microservices requires careful consideration of service boundaries. Identifying the right granularity for services was a  be challenge as it involved understanding the business domains, dependencies, and data flows within the application.

Building robust and resilient communication mechanisms between services was also a challenge.

Managing data consistency and ensure data integrity across multiple services was complex. Coordinating database updates and maintaining data consistency in distributed transactions required careful design and implementation.

Implementing effective communication patterns, such as synchronous and asynchronous messaging, event-driven architectures, or API gateways, was another challenge. Ensure reliable and efficient communication between services while maintaining loose coupling was copmlicated.

Managing deployments, service discovery, load balancing, and monitoring across multiple services required proper tooling and infrastructure. Ensuring seamless scaling and handling traffic spikes was a challenge.

Troubleshooting and debugging issues were complex. Identifying the root cause of failures or performance bottlenecks across multiple services and distributed logs was a challenge.

## References
[1] M. Larsson, “Microservices,” Amazon, https://aws.amazon.com/microservices/#:~:text=Microservices%20allow%20each%20service%20to,experiences%20a%20spike%20in%20demand. (accessed Jun. 10, 2023). 
