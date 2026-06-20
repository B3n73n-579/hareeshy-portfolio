package com.hareeshy.portfolio.analytics.repository;

import com.hareeshy.portfolio.analytics.domain.PageView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;

public interface PageViewRepository extends JpaRepository<PageView, UUID> {

    long countByPath(String path);

    long countByTimestampBetween(LocalDateTime from, LocalDateTime to);
}