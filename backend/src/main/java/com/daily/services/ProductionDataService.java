package com.daily.services;

import com.daily.models.PeopleData;
import com.daily.models.QualityData;
import com.daily.models.SaftyData;
import com.daily.repositories.PeopleDataRepository;
import com.daily.repositories.QualityDataRepository;
import com.daily.repositories.SaftyDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author Rayen Boulehmi
 */
@Service
public class ProductionDataService {

    @Autowired
    private QualityDataRepository productDataRepository;

    @Autowired
    private PeopleDataRepository peopleDataRepository;

    @Autowired
    private SaftyDataRepository saftyDataRepository;

    private Map<String, Object> extractCommonFields(QualityData data) {
        Map<String, Object> commonData = new LinkedHashMap<>();
        commonData.put("date", data.getDate());
        commonData.put("zone", data.getNzone());
        commonData.put("designationProduit", data.getDesignationProduit());
        commonData.put("semaine", data.getSemaine());
        return commonData;
    }

    public List<?> getAllProductData() {
        return productDataRepository.findAll();
    }

    public List<?> getAllPeopleData() {
        return peopleDataRepository.findAll();
    }

    public List<Map<String, Object>> calculateVolumeOfProductionByDate() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> volumeList = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> volumeData = extractCommonFields(data);
            double volumePercentage = (data.getQteLanceePDP() != 0) ?
                    ((double) data.getQteProduite() / data.getQteLanceePDP()) * 100 : 0;
            volumeData.put("volumePercentage", (int) volumePercentage);
            volumeList.add(volumeData);
        }

        return volumeList;
    }

    public List<Map<String, Object>> calculateQteLivreeByDate() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> livraisonList = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> livraisonData = extractCommonFields(data);
            double livraisonPercentage = (data.getQteLanceePDP() != 0) ?
                    (double) data.getQteLivree() / data.getQteLanceePDP() * 100 : 0;
            livraisonData.put("livraisonPercentage", (int) livraisonPercentage);
            livraisonList.add(livraisonData);
        }

        return livraisonList;
    }

    public List<Map<String, Object>> calculateChiffreDAffaireByDate() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> chiffreDAffaireMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> chiffreAffairData = extractCommonFields(data);
            double chiffreDAffaire = (data.getTpsSTDUnitaire() != 0) ?
                    (double) data.getQteLivree() * data.getTpsSTDUnitaire() : 0;
            chiffreAffairData.put("chiffreDAffaire", chiffreDAffaire);
            chiffreDAffaireMap.add(chiffreAffairData);
        }

        return chiffreDAffaireMap;
    }

    public List<Map<String, Object>> calculateQuantiteRetardeeProduction() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> quantiteRetardeeProductionMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> retardeeProductionData = extractCommonFields(data);
            double quantiteRetardeeProduction = data.getQteProduite() - data.getQteLivree() - data.getQteLanceePDP();
            retardeeProductionData.put("productionPercentage", Math.max(0, quantiteRetardeeProduction));
            quantiteRetardeeProductionMap.add(retardeeProductionData);
        }

        return quantiteRetardeeProductionMap;
    }

    public List<Map<String, Object>> calculateQuantiteRetardeeLivraison() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> quantiteRetardeeLivraisonMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> retardeeLivraisonData = extractCommonFields(data);
            double quantiteRetardeeLivraison = data.getQteLanceePDP() - data.getQteLivree();
            retardeeLivraisonData.put("livraisonPercentage", Math.max(0, quantiteRetardeeLivraison));
            quantiteRetardeeLivraisonMap.add(retardeeLivraisonData);
        }

        return quantiteRetardeeLivraisonMap;
    }

    public List<Map<String, Object>> calculateTauxDefaut() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> tauxDefautMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            double nbrDefautInt = data.getNbrDefautInt();
            double qteProduite = data.getQteProduite();

            Map<String, Object> tauxDefaultData = extractCommonFields(data);
            if (data.getQteProduite() > 0) {
                double tauxDefaut = nbrDefautInt / qteProduite * 100;;
                tauxDefaultData.put("tauxDefaut", (int) Math.round(tauxDefaut));
                tauxDefautMap.add(tauxDefaultData);
            }
        }

        return tauxDefautMap;
    }

    public List<Map<String, Object>> calculateJourDestockageoneday() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> stockageonedayMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> stockageonedayData = extractCommonFields(data);
            double stockageoneday = (data.getQteProduite() > 0 && data.getQteLanceePDP() > 0) ?
                    (data.getQteProduite() / data.getQteLanceePDP()) * 100 : 0;
            stockageonedayData.put("jourDeStockage", (int) Math.round(stockageoneday));
            stockageonedayMap.add(stockageonedayData);
        }

        return stockageonedayMap;
    }

    public List<Map<String, Object>> travaillEnCoursWIP() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> wipMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> wipData = extractCommonFields(data);

            wipData.put("TravailEnCoursWIP", data.getTravailEnCoursWIP());
            wipMap.add(wipData);
        }

        return wipMap;
    }

    public List<Map<String, Object>> livraisonATemp() {
        List<QualityData> productDataList = productDataRepository.findAll();
        List<Map<String, Object>> livraisonATempMap = new ArrayList<>();

        for (QualityData data : productDataList) {
            Map<String, Object> livraisonaTempData = extractCommonFields(data);
            livraisonaTempData.put("livraisonATemp", data.getTravailEnCoursWIP().equals("Late ") ?
                    data.getQteLivree() : 0);
            livraisonATempMap.add(livraisonaTempData);
        }

        return livraisonATempMap;
    }

    public List<Map<String, Object>> Absenteisme() {
        List<PeopleData> peopleDataList = peopleDataRepository.findAll();
        List<Map<String, Object>> AbsenteismeMap = new ArrayList<>();

        for (PeopleData data : peopleDataList) {
            Map<String, Object> abseceData = new LinkedHashMap<>();
            abseceData.put("date", data.getDate());
            abseceData.put("tauxAbsenteisme", data.getTxAbs());
            abseceData.put("NameAtelier ", data.getNameAtelier());
            abseceData.put("ObjectiveAbs", data.getObjAbs());
            abseceData.put("NameZone", data.getNameZONE());
            AbsenteismeMap.add(abseceData);
        }

        return AbsenteismeMap;
    }

    public List<Map<String, Object>> Safty() {
        List<SaftyData> saftyDataList = saftyDataRepository.findAll();
        List<Map<String, Object>> SaftyMap = new ArrayList<>();

        for (SaftyData data : saftyDataList) {
            Map<String, Object> saftyData = new LinkedHashMap<>();
            saftyData.put("date", data.getDate());
            saftyData.put("AccidentNumber", data.getNaccidentAvecArret());
            saftyData.put("ObjectiveAccident", data.getNaccidentAvecArret());
            saftyData.put("NameZone", data.getNameZONE());
            SaftyMap.add(saftyData);
        }

        return SaftyMap;
    }
}
