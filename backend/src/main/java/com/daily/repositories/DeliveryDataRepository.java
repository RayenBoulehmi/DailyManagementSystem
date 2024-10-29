package com.daily.repositories;

import com.daily.models.DeliveryData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryDataRepository extends MongoRepository<DeliveryData, String> {
}
