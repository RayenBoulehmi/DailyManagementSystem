package com.daily.repositories;

import com.daily.models.PeopleData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Rayen Boulehmi
 */

@Repository
public interface PeopleDataRepository extends MongoRepository<PeopleData, String> {
}
