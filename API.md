# API Reference

Base URL: `http://localhost:8080` (dev) or `https://your-backend.railway.app` (prod)

All responses wrapped in a standard envelope:

```json
{
  "success": true,
  "message": "OK",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "must be a well-formed email address"
  }
}
```

---

## Health

### `GET /api/health`

Health check endpoint.

**Auth**: Public

**Response `200`**:
```json
{
  "status": "ok",
  "service": "hareesh-portfolio"
}
```

---

## Blog

### `GET /api/public/blog`

Get paginated list of published blog posts.

**Auth**: Public

**Query Parameters**:

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `page` | int | No | `0` | Zero-based page number |
| `size` | int | No | `10` | Page size |
| `category` | string | No | — | Filter by category |
| `tag` | string | No | — | Filter by tag |
| `search` | string | No | — | Full-text search across title and content |

**Response `200`**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "uuid",
        "title": "Building Event-Driven Microservices",
        "slug": "event-driven-microservices-spring-boot-kafka",
        "excerpt": "A deep dive into designing...",
        "category": "Microservices",
        "tags": ["Spring Boot", "Kafka"],
        "coverImage": "https://...",
        "publishedAt": "2024-12-15T00:00:00",
        "readingTime": 12
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 25,
    "totalPages": 3,
    "last": false
  }
}
```

---

### `GET /api/public/blog/{slug}`

Get a single blog post by slug.

**Auth**: Public

**Path Parameters**:

| Name | Type | Description |
|------|------|-------------|
| `slug` | string | URL-friendly post identifier |

**Response `200`**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Building Event-Driven Microservices",
    "slug": "event-driven-microservices-spring-boot-kafka",
    "excerpt": "A deep dive into designing...",
    "content": "# Markdown content...",
    "category": "Microservices",
    "tags": ["Spring Boot", "Kafka", "Microservices", "Java"],
    "coverImage": "https://...",
    "publishedAt": "2024-12-15T00:00:00",
    "createdAt": "2024-12-10T00:00:00",
    "updatedAt": "2024-12-15T00:00:00"
  }
}
```

**Response `404`**: Blog post not found.

---

### `POST /api/public/blog`

Create a new blog post.

**Auth**: JWT required (admin)

**Request Body**:
```json
{
  "title": "My New Post",
  "slug": "my-new-post",
  "excerpt": "Brief description",
  "content": "# Full MDX content",
  "category": "Java",
  "tags": ["Java", "Spring Boot"],
  "coverImage": "https://images.com/cover.jpg"
}
```

**Validation Rules**:
- `title`: required, not blank
- `slug`: required, not blank, unique
- `content`: required, not blank
- `excerpt`: optional
- `category`: optional
- `tags`: optional, array of strings
- `coverImage`: optional

**Response `201`**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My New Post",
    "slug": "my-new-post",
    ...
  }
}
```

**Response `400`**: Validation errors.

---

### `PUT /api/public/blog/{id}`

Update an existing blog post.

**Auth**: JWT required (admin)

**Path Parameters**:

| Name | Type | Description |
|------|------|-------------|
| `id` | UUID | Post ID |

**Request Body**: Same as POST (all fields optional for partial update — current behavior sends full body)

**Response `200`**: Updated blog post object.

**Response `404`**: Blog post not found.

---

### `DELETE /api/public/blog/{id}`

Delete a blog post.

**Auth**: JWT required (admin)

**Path Parameters**:

| Name | Type | Description |
|------|------|-------------|
| `id` | UUID | Post ID |

**Response `204`**: No content (deleted successfully).

**Response `404`**: Blog post not found.

---

## Contact

### `POST /api/public/contact`

Submit a contact form message.

**Auth**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about services",
  "message": "I'd like to discuss a project..."
}
```

**Validation Rules**:
- `name`: required, not blank
- `email`: required, valid email format
- `subject`: required, not blank
- `message`: required, not blank, max 2000 characters

**Response `201`**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
"email": "hareeshyeluri595@outlook.com",
    "subject": "Inquiry about services",
    "message": "I'd like to discuss a project...",
    "isRead": false,
    "createdAt": "2026-06-20T12:00:00"
  }
}
```

**Response `400`**: Validation errors.

---

### `GET /api/public/contact`

Get paginated list of contact messages.

**Auth**: JWT required (admin)

**Query Parameters**:

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `page` | int | No | `0` | Zero-based page number |
| `size` | int | No | `10` | Page size |

**Response `200`**: Paginated list of contact messages.

---

### `PUT /api/public/contact/{id}/read`

Mark a contact message as read.

**Auth**: JWT required (admin)

**Path Parameters**:

| Name | Type | Description |
|------|------|-------------|
| `id` | UUID | Message ID |

**Response `200`**: Updated contact message with `isRead: true`.

**Response `404`**: Message not found.

---

## Analytics

### `POST /api/public/analytics/pageview`

Record a page view.

**Auth**: Public

**Request Body**:
```json
{
  "path": "/blog/my-post"
}
```

Additional metadata (IP, user agent, referrer) are extracted server-side from the HTTP request.

**Response `200`**:
```json
{
  "success": true,
  "data": null
}
```

---

### `GET /api/analytics/stats`

Get aggregated analytics statistics.

**Auth**: JWT required (admin)

**Response `200`**:
```json
{
  "success": true,
  "data": {
    "totalPageViews": 15420,
    "uniqueVisitors": 3200,
    "topPages": [
      {"path": "/", "views": 5000},
      {"path": "/blog", "views": 2300},
      {"path": "/projects", "views": 1800}
    ],
    "viewsByDay": [
      {"date": "2026-06-19", "views": 245},
      {"date": "2026-06-18", "views": 312}
    ]
  }
}
```

---

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| `200` | Success |
| `201` | Created |
| `204` | No content (deletion) |
| `400` | Validation error / bad request |
| `401` | Unauthorized (missing/invalid JWT) |
| `403` | Forbidden (insufficient permissions) |
| `404` | Resource not found |
| `500` | Internal server error |

## Standard Response Envelope

```json
{
  "success": boolean,
  "message": string,
  "data": object | null,
  "errors": object | null
}
```