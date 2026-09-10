package com.oasis.library.repository;
import com.oasis.library.entity.Booking; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;
public interface BookingRepository extends JpaRepository<Booking,Long>{ List<Booking> findByBookId(Long bookId); }
