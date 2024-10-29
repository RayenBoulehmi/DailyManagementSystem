package com.daily.repositories;

import com.daily.models.SaftyData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SaftyDataRepository extends MongoRepository<SaftyData, String> {
}
