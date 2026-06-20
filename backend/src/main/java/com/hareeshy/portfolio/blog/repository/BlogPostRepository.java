package com.hareeshy.portfolio.blog.repository;

import com.hareeshy.portfolio.blog.domain.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {

    Optional<BlogPost> findBySlug(String slug);

    Page<BlogPost> findByIsPublishedTrueOrderByPublishedAtDesc(Pageable pageable);

    Page<BlogPost> findByIsPublishedTrueAndCategory(Pageable pageable, String category);

    Page<BlogPost> findByIsPublishedTrueAndTagsContaining(Pageable pageable, String tag);

    @Query("SELECT b FROM BlogPost b WHERE b.isPublished = true AND (LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<BlogPost> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}