package com.hareeshy.portfolio.blog.service;

import com.hareeshy.portfolio.blog.domain.BlogPost;
import com.hareeshy.portfolio.blog.dto.BlogPostListResponse;
import com.hareeshy.portfolio.blog.dto.BlogPostRequest;
import com.hareeshy.portfolio.blog.dto.BlogPostResponse;
import com.hareeshy.portfolio.blog.repository.BlogPostRepository;
import com.hareeshy.portfolio.common.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class BlogPostService {

    private final BlogPostRepository repository;

    public BlogPostService(BlogPostRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public PagedResponse<BlogPostListResponse> getAllPublished(int page, int size) {
        return toPagedListResponse(repository.findByIsPublishedTrueOrderByPublishedAtDesc(PageRequest.of(page, size)));
    }

    @Transactional(readOnly = true)
    public BlogPostResponse getBySlug(String slug) {
        BlogPost post = repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Blog post not found: " + slug));
        return toResponse(post);
    }

    @Transactional(readOnly = true)
    public PagedResponse<BlogPostListResponse> getByCategory(String category, int page, int size) {
        return toPagedListResponse(repository.findByIsPublishedTrueAndCategory(PageRequest.of(page, size), category));
    }

    @Transactional(readOnly = true)
    public PagedResponse<BlogPostListResponse> getByTag(String tag, int page, int size) {
        return toPagedListResponse(repository.findByIsPublishedTrueAndTagsContaining(PageRequest.of(page, size), tag));
    }

    @Transactional(readOnly = true)
    public PagedResponse<BlogPostListResponse> search(String keyword, int page, int size) {
        return toPagedListResponse(repository.searchByKeyword(keyword, PageRequest.of(page, size)));
    }

    public BlogPostResponse create(BlogPostRequest request) {
        BlogPost post = new BlogPost();
        post.setTitle(request.title());
        post.setSlug(request.slug());
        post.setExcerpt(request.excerpt());
        post.setContent(request.content());
        post.setCategory(request.category());
        post.setTags(request.tags() != null ? String.join(",", request.tags()) : null);
        post.setCoverImage(request.coverImage());
        post.setPublished(true);
        post.setPublishedAt(LocalDateTime.now());
        return toResponse(repository.save(post));
    }

    public BlogPostResponse update(UUID id, BlogPostRequest request) {
        BlogPost post = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found: " + id));
        post.setTitle(request.title());
        post.setSlug(request.slug());
        post.setExcerpt(request.excerpt());
        post.setContent(request.content());
        post.setCategory(request.category());
        post.setTags(request.tags() != null ? String.join(",", request.tags()) : null);
        post.setCoverImage(request.coverImage());
        return toResponse(repository.save(post));
    }

    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Blog post not found: " + id);
        }
        repository.deleteById(id);
    }

    private PagedResponse<BlogPostListResponse> toPagedListResponse(Page<BlogPost> page) {
        List<BlogPostListResponse> content = page.getContent().stream()
                .map(this::toListResponse)
                .toList();
        return new PagedResponse<>(content, page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    private BlogPostListResponse toListResponse(BlogPost post) {
        return new BlogPostListResponse(
                post.getId(),
                post.getTitle(),
                post.getSlug(),
                post.getExcerpt(),
                post.getCategory(),
                parseTags(post.getTags()),
                post.getCoverImage(),
                post.getPublishedAt(),
                computeReadingTime(post.getContent())
        );
    }

    private BlogPostResponse toResponse(BlogPost post) {
        return new BlogPostResponse(
                post.getId(),
                post.getTitle(),
                post.getSlug(),
                post.getExcerpt(),
                post.getContent(),
                post.getCategory(),
                parseTags(post.getTags()),
                post.getCoverImage(),
                post.getPublishedAt(),
                post.isPublished(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                computeReadingTime(post.getContent())
        );
    }

    private List<String> parseTags(String tags) {
        if (tags == null || tags.isBlank()) return Collections.emptyList();
        return Arrays.asList(tags.split(","));
    }

    private int computeReadingTime(String content) {
        if (content == null || content.isBlank()) return 0;
        int wordCount = content.split("\\s+").length;
        return Math.max(1, (int) Math.ceil((double) wordCount / 200));
    }
}