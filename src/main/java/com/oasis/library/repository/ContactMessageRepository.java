package com.oasis.library.repository;
import com.oasis.library.entity.ContactMessage; import org.springframework.data.jpa.repository.JpaRepository;
public interface ContactMessageRepository extends JpaRepository<ContactMessage,Long>{}
