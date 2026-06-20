package com.hareeshy.portfolio.contact.web;

import com.hareeshy.portfolio.common.ApiResponse;
import com.hareeshy.portfolio.common.PagedResponse;
import com.hareeshy.portfolio.contact.dto.ContactRequest;
import com.hareeshy.portfolio.contact.dto.ContactResponse;
import com.hareeshy.portfolio.contact.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/public/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactResponse>> submit(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(service.create(request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ContactResponse>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.ok(service.getAll(page, size)));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<ContactResponse>> markAsRead(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(service.markAsRead(id)));
    }
}