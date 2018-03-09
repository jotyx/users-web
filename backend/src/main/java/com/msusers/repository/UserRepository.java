package com.msusers.repository;

import com.msusers.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  public User getUserById(Long userId);
}
