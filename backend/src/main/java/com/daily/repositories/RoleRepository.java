package com.daily.repositories;

import com.daily.enums.ERole;
import com.daily.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Rayen Boulehmi
 */
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
  Role findByName(ERole name);
  boolean existsByName(ERole name);
}
