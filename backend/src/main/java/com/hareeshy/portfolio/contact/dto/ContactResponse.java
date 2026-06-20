package com.hareeshy.portfolio.contact.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ContactResponse(
        UUID id,
        String name,
        String email,
        String subject,
        String message,
        boolean isRead,
        LocalDateTime createdAt
) {}