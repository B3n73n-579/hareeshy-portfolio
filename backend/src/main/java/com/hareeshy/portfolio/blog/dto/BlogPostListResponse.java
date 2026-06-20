package com.hareeshy.portfolio.blog.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record BlogPostListResponse(
        UUID id,
        String title,
        String slug,
        String excerpt,
        String category,
        List<String> tags,
        String coverImage,
        LocalDateTime publishedAt,
        int readingTime
) {}