package com.oasis.library.repository;
import com.oasis.library.entity.Loan; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List; import java.util.Optional;
public interface LoanRepository extends JpaRepository<Loan,Long>{ List<Loan> findByReturnDateIsNull(); List<Loan> findByUserIdAndReturnDateIsNull(Long userId); Optional<Loan> findByIdAndReturnDateIsNull(Long id); }
