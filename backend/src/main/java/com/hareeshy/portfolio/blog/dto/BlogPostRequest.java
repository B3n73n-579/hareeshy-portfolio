package com.hareeshy.portfolio.blog.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record BlogPostRequest(
        @NotBlank String title,
        @NotBlank String slug,
        String excerpt,
        @NotBlank String content,
        String category,
        List<String> tags,
        String coverImage
) {}