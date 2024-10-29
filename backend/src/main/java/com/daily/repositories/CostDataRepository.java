package com.daily.repositories;

import com.daily.models.CostData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostDataRepository extends MongoRepository<CostData, String>{
}
