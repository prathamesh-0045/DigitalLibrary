package com.oasis.library.repository;
import com.oasis.library.entity.Book; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;
public interface BookRepository extends JpaRepository<Book,Long>{ List<Book> findByCategoryIgnoreCase(String category); List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title,String author); }
