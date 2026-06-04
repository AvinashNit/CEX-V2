# CEX-V2

> A modular centralized cryptocurrency exchange built with TypeScript and Bun, featuring a dedicated matching engine service and API layer communicating over HTTP.

---

## Overview

CEX-V2 is the second major iteration of the exchange project.

The primary goal of this version is to move away from a monolithic design and establish a service-oriented architecture where the API layer and matching engine operate as independent components.

This separation enables easier maintenance, independent scaling, cleaner code organization, and provides a foundation for implementing production-grade exchange features.

---

## Key Improvements Over V1

### V1

* Monolithic architecture
* API and matching logic tightly coupled
* Difficult to scale individual components
* Limited separation of concerns

### V2

* Dedicated matching engine service
* Dedicated API service
* HTTP communication between services
* Improved code organization
* Easier testing and maintenance
* Foundation for future low-latency optimizations
* Clear service boundaries

---

## Architecture

```text
                        +-------------+
                        |   Clients   |
                        +------+------+ 
                               |
                               |
                               v
                    +----------------------+
                    |      API Service     |
                    |----------------------|
                    | Validation           |
                    | Authentication       |
                    | Balance Checks       |
                    | Persistence Layer    |
                    | Order Routing        |
                    +----------+-----------+
                               |
                          HTTP Requests
                               |
                               v
                    +----------------------+
                    |   Matching Engine    |
                    |----------------------|
                    | Order Books          |
                    | Matching Logic       |
                    | Trade Generation     |
                    | Fill Calculation     |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      Responses       |
                    +----------------------+
```

---





## Current Features

### Matching Engine

* Limit order placement
* Buy order matching
* Sell order matching
* Order book maintenance
* Partial order fills
* Complete order fills
* Trade generation
* Multi-market support

### API Layer

* Order submission endpoint
* Request validation
* Communication with matching engine


### Development

* TypeScript
* Bun runtime
* Modular architecture
* Service separation
* Strong typing

---

## Matching Engine Design

The matching engine is responsible for maintaining the order books and executing trades.

### Core Responsibilities

* Accept incoming orders
* Match taker orders against resting maker orders
* Generate fills
* Update order book state
* Return execution results

### Matching Rules

#### Buy Orders

Buy orders match against the lowest available ask prices.

```text
Best Ask → Worse Ask
```

#### Sell Orders

Sell orders match against the highest available bid prices.

```text
Best Bid → Worse Bid
```



## Order Lifecycle

```text
Client places order
          |
          v
API validates request
          |
          v
API forwards order to engine
          |
          v
Matching Engine receives order
          |
          v
Match against order book
          |
          +---- Fully Matched
          |
          +---- Partially Matched
          |
          +---- No Match
          |
          v
Generate fills
          |
          v
Update order book
          |
          v
Return execution result
          |
          v
API returns response
```

---


## Running The Project

### Clone Repository

```bash
git clone <repository-url>
cd CEX-V2
```

### Install Dependencies

API Service

```bash
cd apis
bun install
```

Engine Service

```bash
cd ../engine
bun install
```

---

## Start Matching Engine

```bash
cd engine
bun run dev
```

Expected output:

```text
Matching Engine Running...
```

---

## Start API Service

```bash
cd apis
bun run dev
```

Expected output:

```text
API Service Running...
```

---

## API Communication

The API service communicates with the matching engine through HTTP requests.

Example flow:

```text
POST /order

      API
       |
       |
       v
POST /match

    ENGINE
       |
       |
       v
Execution Result
```



## Technical Goals

This project is being built to gain practical experience with:

* Exchange architecture
* Matching engines
* Financial systems
* Low-latency design
* Distributed services
* TypeScript backend development
* Order book management
* Market microstructure

---

## Technology Stack

| Component     | Technology             |
| ------------- | ---------------------- |
| Language      | TypeScript             |
| Runtime       | Bun                    |
| API Layer     | HTTP                   |
| Engine        | Custom Matching Engine |
| Storage       | In-Memory (Current)    |
| Communication | HTTP Requests          |

---

## Planned Architecture Evolution

### Current

```text
API <----HTTP----> ENGINE
```

### Future

```text
                +-----------+
                | WebSocket |
                +-----+-----+
                      |
                      v

+--------+      +-----------+      +----------+
| Client | <--> | API Layer | <--> | Database |
+--------+      +-----------+      +----------+
                      |
                      |
                      v
              +---------------+
              | Matching      |
              | Engine        |
              +---------------+
                      |
                      v
              +---------------+
              | Market Data   |
              +---------------+
```




## Author

Built as a learning project to explore how modern centralized exchanges and matching engines operate internally.
