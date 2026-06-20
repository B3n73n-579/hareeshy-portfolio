# Testing Guide

## Testing Philosophy

- **Test behavior, not implementation** — Focus on what the code does, not how it does it
- **Arrange-Act-Assert** — Consistent test structure
- **Component isolation** — Mock external dependencies at service boundaries
- **Coverage target** — 90%+ for business logic, 80%+ integration
- **Meaningful tests** — Avoid snapshot churn; prefer assertion-based tests

## Frontend Testing

### Tools

| Tool | Purpose |
|------|---------|
| **Vitest** | Test runner (Vite-native, Jest-compatible API) |
| **React Testing Library** | Component rendering and interaction |
| **jsdom** | DOM environment for tests |

### Configuration

Tests are configured via `frontend/vite.config.ts` with the `test` block:

```ts
/// <reference types="vitest/config" />
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: { provider: 'v8', reporter: ['text', 'html'] },
  },
})
```

### Writing Component Tests

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Writing Hook Tests

```tsx
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useThemeStore } from './stores/theme'

describe('useThemeStore', () => {
  it('toggles dark mode', () => {
    const { result } = renderHook(() => useThemeStore())
    expect(result.current.isDark).toBe(false)
    act(() => result.current.toggleDark())
    expect(result.current.isDark).toBe(true)
  })
})
```

### Best Practices

- Use `data-testid` sparingly — prefer `getByRole`, `getByText`, `getByLabelText`
- Test user interactions via `userEvent` (not `fireEvent`)
- Avoid testing internal state — test rendered output and callbacks
- Mock API calls at the service level (TanStack Query handles HTTP)

## Backend Testing

### Tools

| Tool | Purpose |
|------|---------|
| **JUnit 5** (Jupiter) | Test framework |
| **Mockito** | Mocking framework |
| **SpringBootTest** | Integration test context |
| **Spring Security Test** | Auth context for secured endpoints |
| **Testcontainers** | PostgreSQL for integration tests |
| **H2** | In-memory DB for unit tests |

### Writing Service Tests

```java
@ExtendWith(MockitoExtension.class)
class BlogPostServiceTest {

    @Mock
    private BlogPostRepository repository;

    @InjectMocks
    private BlogPostService service;

    @Test
    void shouldCreateBlogPost() {
        var request = new BlogPostRequest("Title", "slug", "excerpt", "content", null, null, null);
        var entity = new BlogPost();
        // ... set fields
        when(repository.save(any())).thenReturn(entity);

        var result = service.create(request);

        assertThat(result.title()).isEqualTo("Title");
        verify(repository).save(any());
    }
}
```

### Writing Controller Tests

```java
@WebMvcTest(BlogController.class)
class BlogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BlogPostService service;

    @Test
    void shouldReturnPublishedPosts() throws Exception {
        when(service.getAllPublished(0, 10))
            .thenReturn(new PagedResponse<>(List.of(), 0, 10, 0, 0, true));

        mockMvc.perform(get("/api/public/blog"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true));
    }
}
```

### Writing Repository Tests

```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BlogPostRepositoryTest {

    @Autowired
    private BlogPostRepository repository;

    @Test
    void shouldFindBySlug() {
        var post = new BlogPost();
        post.setTitle("Test");
        post.setSlug("test-post");
        post.setContent("Content");
        post.setPublished(true);
        repository.save(post);

        var found = repository.findBySlug("test-post");

        assertThat(found).isPresent();
        assertThat(found.get().getTitle()).isEqualTo("Test");
    }
}
```

### Integration Tests with Testcontainers

```java
@SpringBootTest
@Testcontainers
class PortfolioApplicationIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private BlogPostRepository repository;

    @Test
    void contextLoads() {
        assertThat(repository).isNotNull();
    }
}
```

## Running Tests

### Frontend

```bash
# Run all tests
cd frontend && npm test

# Watch mode
cd frontend && npm test -- --watch

# Coverage report
cd frontend && npm test -- --coverage

# E2E tests
cd frontend && npm run test:e2e
```

### Backend

```bash
# Run all tests
cd backend && ./mvnw test

# Run specific test class
cd backend && ./mvnw test -Dtest=BlogPostServiceTest

# Run integration tests
cd backend && ./mvnw verify -P integration

# Full build with tests
cd backend && ./mvnw verify
```

## Coverage Targets

| Module | Target | Measurement |
|--------|--------|-------------|
| Frontend components | 90% | Line coverage |
| Frontend hooks | 90% | Line coverage |
| Frontend stores | 90% | Line coverage |
| Backend services | 95% | Branch coverage |
| Backend controllers | 90% | Line coverage |
| Backend repositories | 80% | Line coverage |
| Overall | 90% | Average |

## CI Integration

Tests run automatically on every push/PR via GitHub Actions (see `.github/workflows/ci.yml`):

- **Frontend**: `npm test -- --run`
- **Backend**: `./mvnw verify -B` (with PostgreSQL service container)