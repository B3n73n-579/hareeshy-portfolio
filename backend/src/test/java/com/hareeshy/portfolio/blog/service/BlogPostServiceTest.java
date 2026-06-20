package com.hareeshy.portfolio.blog.service;

import com.hareeshy.portfolio.blog.domain.BlogPost;
import com.hareeshy.portfolio.blog.dto.BlogPostRequest;
import com.hareeshy.portfolio.blog.dto.BlogPostResponse;
import com.hareeshy.portfolio.blog.repository.BlogPostRepository;
import com.hareeshy.portfolio.common.PagedResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BlogPostServiceTest {

    @Mock
    private BlogPostRepository repository;

    @InjectMocks
    private BlogPostService service;

    private BlogPost createTestPost() {
        BlogPost post = new BlogPost();
        post.setId(UUID.randomUUID());
        post.setTitle("Test Post");
        post.setSlug("test-post");
        post.setExcerpt("An excerpt");
        post.setContent("Content ".repeat(400));
        post.setCategory("Java");
        post.setTags("java,spring");
        post.setPublished(true);
        post.setPublishedAt(LocalDateTime.now());
        return post;
    }

    @Test
    void getAllPublishedReturnsPagedResults() {
        BlogPost post = createTestPost();
        Page<BlogPost> page = new PageImpl<>(List.of(post));
        when(repository.findByIsPublishedTrueOrderByPublishedAtDesc(any(PageRequest.class)))
                .thenReturn(page);

        PagedResponse<com.hareeshy.portfolio.blog.dto.BlogPostListResponse> result =
                service.getAllPublished(0, 10);

        assertEquals(1, result.content().size());
        assertEquals("Test Post", result.content().getFirst().title());
        verify(repository).findByIsPublishedTrueOrderByPublishedAtDesc(any(PageRequest.class));
    }

    @Test
    void getBySlugReturnsPostWhenFound() {
        BlogPost post = createTestPost();
        when(repository.findBySlug("test-post")).thenReturn(Optional.of(post));

        BlogPostResponse result = service.getBySlug("test-post");

        assertEquals("Test Post", result.title());
        assertEquals("test-post", result.slug());
    }

    @Test
    void getBySlugThrowsExceptionWhenNotFound() {
        when(repository.findBySlug("not-found")).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> service.getBySlug("not-found"));
        assertTrue(ex.getMessage().contains("not-found"));
    }

    @Test
    void createPersistsAndReturnsPost() {
        BlogPostRequest request = new BlogPostRequest(
                "New Post", "new-post", "Excerpt",
                "Content content content", "Java",
                List.of("java", "spring"), null);

        BlogPost saved = new BlogPost();
        saved.setId(UUID.randomUUID());
        saved.setTitle(request.title());
        saved.setSlug(request.slug());
        saved.setExcerpt(request.excerpt());
        saved.setContent(request.content());
        saved.setCategory(request.category());
        saved.setTags("java,spring");
        saved.setPublished(true);
        saved.setPublishedAt(LocalDateTime.now());

        when(repository.save(any(BlogPost.class))).thenReturn(saved);

        BlogPostResponse result = service.create(request);

        assertEquals("New Post", result.title());
        assertEquals("new-post", result.slug());
        assertTrue(result.isPublished());
        verify(repository).save(any(BlogPost.class));
    }
}
