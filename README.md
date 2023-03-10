# receipt-processor


# How to run in your laptop:

1. Ensure you have Docker up and running
2. Clone this repository 
3. docker-compose up
4. Wait for kafka and zookeeper services to be up and running
5. Hit API's with below POSTMAN collection attached below. To be on same page, service is running on 7070 port.
6. Have a good day :)


# Run API's in POSTMAN: 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/4946631-8173f965-2932-4c93-b8da-23c7e0a1ff36?action=collection%2Ffork&collection-url=entityId%3D4946631-8173f965-2932-4c93-b8da-23c7e0a1ff36%26entityType%3Dcollection%26workspaceId%3D16493175-fc37-4461-92d8-bf42c0f857ad)


# Features: 

1. Restarts always if error occurs setup in docker compose
2. ESLINT with airbnb configuration
3. Used winston for logging which is more safer than console.log()
4. Kafka for asynchronous computing of processing of reciepts
5. Builder pattern for test data creation 
6. Arange Act Assert  pattern for testing data
7. Custom error handling
8. Alpine node:16 image which is very light-weight base image of nodejs
9. Schema Validator


# TODO 

1. Funtional tests by mocking kafka




