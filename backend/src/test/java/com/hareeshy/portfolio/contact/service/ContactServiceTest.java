package com.hareeshy.portfolio.contact.service;

import com.hareeshy.portfolio.common.PagedResponse;
import com.hareeshy.portfolio.contact.domain.ContactMessage;
import com.hareeshy.portfolio.contact.dto.ContactRequest;
import com.hareeshy.portfolio.contact.dto.ContactResponse;
import com.hareeshy.portfolio.contact.repository.ContactRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactRepository repository;

    @InjectMocks
    private ContactService service;

    @Test
    void createPersistsAndReturnsMessage() {
        ContactRequest request = new ContactRequest("John", "john@test.com", "Hello", "Test message");

        ContactMessage saved = new ContactMessage();
        saved.setId(UUID.randomUUID());
        saved.setName("John");
        saved.setEmail("john@test.com");
        saved.setSubject("Hello");
        saved.setMessage("Test message");
        saved.setRead(false);
        saved.setCreatedAt(LocalDateTime.now());

        when(repository.save(any(ContactMessage.class))).thenReturn(saved);

        ContactResponse result = service.create(request);

        assertEquals("John", result.name());
        assertEquals("john@test.com", result.email());
        assertEquals("Hello", result.subject());
        assertEquals("Test message", result.message());
        assertFalse(result.isRead());
        verify(repository).save(any(ContactMessage.class));
    }

    @Test
    void getAllReturnsPagedResults() {
        ContactMessage msg = new ContactMessage();
        msg.setId(UUID.randomUUID());
        msg.setName("Jane");
        msg.setEmail("jane@test.com");
        msg.setSubject("Inquiry");
        msg.setMessage("Test body");
        msg.setRead(false);
        msg.setCreatedAt(LocalDateTime.now());

        Page<ContactMessage> page = new PageImpl<>(List.of(msg));
        when(repository.findAll(any(PageRequest.class))).thenReturn(page);

        PagedResponse<ContactResponse> result = service.getAll(0, 10);

        assertEquals(1, result.content().size());
        assertEquals("Jane", result.content().getFirst().name());
        verify(repository).findAll(any(PageRequest.class));
    }
}
