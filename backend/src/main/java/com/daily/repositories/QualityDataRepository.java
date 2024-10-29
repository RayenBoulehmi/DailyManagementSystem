package com.daily.repositories;
import com.daily.models.QualityData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * @author Rayen Boulehmi
 */
@Repository
public interface QualityDataRepository extends MongoRepository<QualityData, String> {

}