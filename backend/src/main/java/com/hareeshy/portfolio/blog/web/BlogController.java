package com.hareeshy.portfolio.blog.web;

import com.hareeshy.portfolio.blog.dto.BlogPostRequest;
import com.hareeshy.portfolio.blog.dto.BlogPostResponse;
import com.hareeshy.portfolio.blog.service.BlogPostService;
import com.hareeshy.portfolio.common.ApiResponse;
import com.hareeshy.portfolio.common.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/public/blog")
public class BlogController {

    private final BlogPostService service;

    public BlogController(BlogPostService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<com.hareeshy.portfolio.blog.dto.BlogPostListResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String search) {
        PagedResponse<com.hareeshy.portfolio.blog.dto.BlogPostListResponse> result;
        if (search != null && !search.isBlank()) {
            result = service.search(search, page, size);
        } else if (category != null && !category.isBlank()) {
            result = service.getByCategory(category, page, size);
        } else if (tag != null && !tag.isBlank()) {
            result = service.getByTag(tag, page, size);
        } else {
            result = service.getAllPublished(page, size);
        }
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPostResponse>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(service.getBySlug(slug)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BlogPostResponse>> create(@Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogPostResponse>> update(@PathVariable UUID id, @Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}