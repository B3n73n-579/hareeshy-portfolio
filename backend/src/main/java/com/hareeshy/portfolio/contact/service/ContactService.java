package com.hareeshy.portfolio.contact.service;

import com.hareeshy.portfolio.common.PagedResponse;
import com.hareeshy.portfolio.contact.domain.ContactMessage;
import com.hareeshy.portfolio.contact.dto.ContactRequest;
import com.hareeshy.portfolio.contact.dto.ContactResponse;
import com.hareeshy.portfolio.contact.repository.ContactRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public ContactResponse create(ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setSubject(request.subject());
        message.setMessage(request.message());
        message.setRead(false);
        return toResponse(repository.save(message));
    }

    @Transactional(readOnly = true)
    public PagedResponse<ContactResponse> getAll(int page, int size) {
        Page<ContactMessage> pageResult = repository.findAll(PageRequest.of(page, size));
        List<ContactResponse> content = pageResult.getContent().stream()
                .map(this::toResponse)
                .toList();
        return new PagedResponse<>(content, pageResult.getNumber(), pageResult.getSize(),
                pageResult.getTotalElements(), pageResult.getTotalPages());
    }

    public ContactResponse markAsRead(UUID id) {
        ContactMessage message = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact message not found: " + id));
        message.setRead(true);
        return toResponse(repository.save(message));
    }

    private ContactResponse toResponse(ContactMessage msg) {
        return new ContactResponse(
                msg.getId(), msg.getName(), msg.getEmail(),
                msg.getSubject(), msg.getMessage(),
                msg.isRead(), msg.getCreatedAt()
        );
    }
}