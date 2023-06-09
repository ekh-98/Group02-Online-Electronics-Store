# Group02-Online Electronics Store

## Introduction
We choosed to build a Online Electronics Store for our Distributed Systems project. Our project was build on the Microservices Architecture, with Node.js as the primary technology. The architecture aims to provide a scalable and modular system by breaking down the application into smaller, independent services. The main microservices implemented are customer, product, and order, with an added user authentication system to ensure secure access to the platform.

## Architecture
The architecture follows a microservices approach, where the application is divided into smaller, self-contained services that can be developed, deployed, and scaled independently. This promotes flexibility, scalability, and easier maintenance of the system. Each microservice handles a specific domain (customer, product, order) and has its own data storage, business logic, and API endpoints.

Below is the architectural design of the Online Electronics Store

![Architectural Design](https://ibb.co/wSGQ441)


## Micro-services

### Customer Microservice
This service is responsible for managing customer-related functionalities, such as user registration, profile management, and address information.

### Product Microservice
The product microservice handles all operations related to managing the product catalog. It includes functionalities like product listing, searching, details, and inventory management.

### Order Microservice
The order microservice handles the order processing flow, including creating, updating, and deleting orders. It manages the interaction between customers, products, and inventory to ensure a smooth order fulfillment process.

## Core services


● Describe about each microservice and its functionality for the system.
● The REST API exposed by the microservice
● Inter-service interactions happened via the micro-service

## Discovery Server
We used the inbuilt discovery server of Node.js for out project. 

## API Gateway
We used the inbuit API Gateway of Express for our project.The API gateway is implemented as a central entry point for the client applications to interact with the microservices. It acts as a reverse proxy and handles common cross-cutting concerns such as authentication, rate limiting, request aggregation, and caching. The API gateway simplifies the client-side communication and provides a unified interface for accessing the underlying microservices.

## User Interface
We used Postman to access the services provided by our Online Electronic Store's API. Postman was also used Postman during the testing phase to test the functionality of the services provided by each micro service.

## Deployment
● Suggest a method to deploy the system to use in production.

## References

