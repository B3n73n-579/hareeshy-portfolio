package com.hareeshy.portfolio.contact.repository;

import com.hareeshy.portfolio.contact.domain.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContactRepository extends JpaRepository<ContactMessage, UUID> {
    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();
}