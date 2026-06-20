package com.hareeshy.portfolio.blog.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record BlogPostResponse(
        UUID id,
        String title,
        String slug,
        String excerpt,
        String content,
        String category,
        List<String> tags,
        String coverImage,
        LocalDateTime publishedAt,
        boolean isPublished,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        int readingTime
) {}